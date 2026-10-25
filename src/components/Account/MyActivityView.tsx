import React, { useState } from 'react';
import {
  Users,
  ShieldAlert,
  ArrowRight,
  Clock,
  MapPin,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './MyActivityView.module.css';

type ActivityTab = 'requests' | 'commitments' | 'circle' | 'safeguarding';

export const MyActivityView: React.FC = () => {
  const {
    tasks,
    contacts,
    assistanceRequests,
    childSafeCase,
    navigateTo
  } = useCareContext();

  const { activeUser, isAarav } = useAccountContext();

  const [activeTab, setActiveTab] = useState<ActivityTab>('commitments');

  // Tab A: My Requests (initiated by active user)
  const myRequests = Object.values(assistanceRequests).filter(req => {
    if (activeUser?.id === 'nisha') {
      return req.requesterId === 'nisha' || req.id === 'req-nisha-food-01';
    }
    return req.requesterId === activeUser?.id;
  });

  // Tab B: My Commitments (tasks active user accepted)
  // Check tasks from Care Chain + assistanceRequests
  const myCommitments = [
    // 1. Care chain tasks where helper is activeUser
    ...Object.values(tasks).filter(t => {
      if (activeUser?.id === 'aarav') {
        return t.assignedHelperId === 'aarav' || t.status === 'assigned' || t.status === 'in_progress' || t.status === 'delivered_pending_confirmation' || t.status === 'confirmed_complete';
      }
      return t.assignedHelperId === activeUser?.id;
    }).map(t => ({
      type: 'care_task' as const,
      id: t.id,
      title: t.title,
      recipientName: contacts[t.recipientId]?.name || 'Care Recipient',
      recipientAvatar: getAssetUrl(contacts[t.recipientId]?.avatar || '/images/contacts/savitri.png'),
      location: contacts[t.recipientId]?.location || 'Indiranagar, Bengaluru',
      status: t.status,
      dueWindow: t.dueWindow,
      priority: t.priority,
      description: t.description
    })),
    // 2. Help Now requests accepted by active user
    ...Object.values(assistanceRequests).filter(req => {
      if (activeUser?.id === 'aarav') {
        return req.assignedHelperId === 'aarav' && req.status !== 'invitation_pending';
      }
      return req.assignedHelperId === activeUser?.id && req.status !== 'invitation_pending';
    }).map(req => ({
      type: 'assistance_request' as const,
      id: req.id,
      title: 'Food & Essentials Delivery',
      recipientName: req.recipientName,
      recipientAvatar: getAssetUrl('/images/contacts/nisha.png'),
      location: req.generalLocation,
      status: req.status,
      dueWindow: req.urgency.replace(/_/g, ' '),
      priority: 'high' as const,
      description: req.notes || 'Groceries and daily essentials support.'
    }))
  ];

  // Tab C: My Circle Care Responsibilities
  const circleCareTasks = [
    {
      contact: contacts.savitri,
      task: tasks['task-groceries'],
      label: 'Groceries & Household Supplies'
    },
    {
      contact: contacts.savitri,
      task: tasks['task-meds'],
      label: 'Prescription Medication Refill'
    },
    {
      contact: contacts.savitri,
      task: tasks['task-transport'],
      label: 'Routine Hospital Transport'
    }
  ];

  // Tab D: Sensitive Case Updates (Reporter Safe Only)
  const isReporter =
    childSafeCase &&
    (childSafeCase.reporterId === activeUser?.id ||
      isAarav ||
      childSafeCase.caseReference === 'UJAAS-CS-2018-001');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed_complete':
        return <span className={styles.statusPillSuccess}>Confirmed Complete</span>;
      case 'delivered_pending_confirmation':
        return <span className={styles.statusPill}>Delivered • Pending Confirmation</span>;
      case 'in_progress':
        return <span className={styles.statusPillAssigned}>In Progress • Picked Up</span>;
      case 'assigned':
        return <span className={styles.statusPillAssigned}>Assigned & Accepted</span>;
      case 'invitation_pending':
        return <span className={styles.statusPill}>Waiting for Helper</span>;
      case 'follow_up_required':
        return <span className={styles.statusPillProblem}>Requires Follow-up</span>;
      case 'submitted':
        return <span className={styles.statusPill}>Request Open</span>;
      default:
        return <span className={styles.statusPill}>{status.replace(/_/g, ' ')}</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span>—</span>
            <span>YOUR CARE RECORD</span>
          </div>
          <h1 className={styles.title}>My Activity</h1>
          <p className={styles.subtitle}>
            One authoritative record of your ongoing requests, accepted care commitments, and trusted-circle responsibilities.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabsBar} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'commitments'}
            className={`${styles.tabBtn} ${activeTab === 'commitments' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('commitments')}
          >
            <span>My Commitments</span>
            <span className={styles.tabCount}>{myCommitments.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'requests'}
            className={`${styles.tabBtn} ${activeTab === 'requests' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <span>My Requests</span>
            <span className={styles.tabCount}>{myRequests.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'circle'}
            className={`${styles.tabBtn} ${activeTab === 'circle' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('circle')}
          >
            <span>My Circle Care</span>
            <span className={styles.tabCount}>{circleCareTasks.length}</span>
          </button>

          {isReporter && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'safeguarding'}
              className={`${styles.tabBtn} ${activeTab === 'safeguarding' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('safeguarding')}
            >
              <span>Safeguarding Updates</span>
              <span className={styles.tabCount}>1</span>
            </button>
          )}
        </div>

        {/* Tab B: My Commitments */}
        {activeTab === 'commitments' && (
          <div className={styles.cardsList}>
            {myCommitments.length > 0 ? (
              myCommitments.map(item => (
                <div key={item.id} className={styles.activityCard}>
                  <div className={styles.cardMain}>
                    <div className={styles.cardTop}>
                      <span className={styles.categoryTag}>Accepted Commitment</span>
                      {getStatusBadge(item.status)}
                    </div>

                    <h2 className={styles.cardTitle}>{item.title}</h2>
                    <p className={styles.cardDesc}>{item.description}</p>

                    <div className={styles.cardMeta}>
                      <span className={styles.metaItem}>
                        <Users size={14} />
                        <span>Recipient: <strong>{item.recipientName}</strong></span>
                      </span>
                      <span className={styles.metaItem}>
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </span>
                      <span className={styles.metaItem}>
                        <Clock size={14} />
                        <span>Due: {item.dueWindow}</span>
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardActionWrap}>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => {
                        if (item.type === 'care_task') {
                          navigateTo('task_progress');
                        } else {
                          navigateTo('help_request_tracker');
                        }
                      }}
                    >
                      <span>Update Progress</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyCard}>
                <h3 className={styles.emptyTitle}>No active commitments yet</h3>
                <p className={styles.emptyText}>
                  You haven't accepted any responsibilities for neighbors or family yet. Browse incoming invitations and care needs in Offer Help.
                </p>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => navigateTo('offer_help')}
                >
                  Explore Offer Help
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab A: My Requests */}
        {activeTab === 'requests' && (
          <div className={styles.cardsList}>
            {myRequests.length > 0 ? (
              myRequests.map(req => (
                <div key={req.id} className={styles.activityCard}>
                  <div className={styles.cardMain}>
                    <div className={styles.cardTop}>
                      <span className={styles.categoryTag}>{req.category.replace(/_/g, ' ')}</span>
                      {getStatusBadge(req.status)}
                    </div>

                    <h2 className={styles.cardTitle}>Assistance Request: Food & Essentials</h2>
                    <p className={styles.cardDesc}>{req.notes || 'Emergency rations and supplies requested.'}</p>

                    <div className={styles.cardMeta}>
                      <span className={styles.metaItem}>
                        <MapPin size={14} />
                        <span>{req.generalLocation}</span>
                      </span>
                      <span className={styles.metaItem}>
                        <UserCheck size={14} />
                        <span>
                          Helper: {req.assignedHelperName ? <strong>{req.assignedHelperName}</strong> : 'Matching in progress'}
                        </span>
                      </span>
                      <span className={styles.metaItem}>
                        <Clock size={14} />
                        <span>Urgency: {req.urgency.replace(/_/g, ' ')}</span>
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardActionWrap}>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => navigateTo('help_request_tracker')}
                    >
                      <span>Track Status</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyCard}>
                <h3 className={styles.emptyTitle}>No active requests submitted</h3>
                <p className={styles.emptyText}>
                  You haven't submitted an assistance request for yourself. If you need groceries, medicine, shelter, or transport, you can request aid anytime.
                </p>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => navigateTo('help_now_landing')}
                >
                  Request Assistance
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab C: My Circle Care */}
        {activeTab === 'circle' && (
          <div className={styles.cardsList}>
            {circleCareTasks.map(({ contact, task }) => {
              if (!contact || !task) return null;
              return (
                <div key={task.id} className={styles.activityCard}>
                  <div className={styles.cardMain}>
                    <div className={styles.cardTop}>
                      <span className={styles.categoryTag}>Circle Care Responsibility</span>
                      {getStatusBadge(task.status)}
                    </div>

                    <h2 className={styles.cardTitle}>{task.title}</h2>
                    <p className={styles.cardDesc}>{task.description}</p>

                    <div className={styles.cardMeta}>
                      <span className={styles.metaItem}>
                        <Users size={14} />
                        <span>Care for: <strong>{contact.name}</strong> ({contact.relationship})</span>
                      </span>
                      <span className={styles.metaItem}>
                        <MapPin size={14} />
                        <span>{contact.location}</span>
                      </span>
                      <span className={styles.metaItem}>
                        <Clock size={14} />
                        <span>Window: {task.dueWindow}</span>
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardActionWrap}>
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      onClick={() => navigateTo('care_chain')}
                    >
                      <span>Open Care Plan</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab D: Sensitive Case Updates (Reporter Safe Only) */}
        {activeTab === 'safeguarding' && isReporter && (
          <div className={styles.cardsList}>
            <div className={styles.activityCard} style={{ borderColor: '#F45124', background: '#FFFDF9' }}>
              <div className={styles.cardMain}>
                <div className={styles.cardTop}>
                  <span className={styles.categoryTag} style={{ background: '#FFE8E0', color: '#F45124' }}>
                    Child Safe Protocol • Confidential
                  </span>
                  <span className={styles.statusPillAssigned}>
                    {childSafeCase.status === 'demo_handoff_documented'
                      ? 'Handoff Documented • Follow-up Active'
                      : childSafeCase.status === 'demo_review_in_progress'
                      ? 'Under Coordinator Review'
                      : 'Recorded Locally • Review Pending'}
                  </span>
                </div>

                <h2 className={styles.cardTitle}>Case Reference: {childSafeCase.caseReference}</h2>
                <p className={styles.cardDesc}>
                  Factual observation recorded regarding an unattended child in Indiranagar. Restricted coordinator pathway active with Childline 1098 protocol.
                </p>

                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}>
                    <ShieldAlert size={14} color="#F45124" />
                    <span>Reporter: <strong>{childSafeCase.reporterName || 'Aarav Sharma'}</strong></span>
                  </span>
                  <span className={styles.metaItem}>
                    <MapPin size={14} />
                    <span>Area: {childSafeCase.approximateArea || 'Indiranagar, Bengaluru'}</span>
                  </span>
                  <span className={styles.metaItem}>
                    <Clock size={14} />
                    <span>Logged: {childSafeCase.createdAt || 'April 2018'}</span>
                  </span>
                </div>
              </div>

              <div className={styles.cardActionWrap}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => navigateTo('child_safe_status')}
                >
                  <span>View Case Status</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
