import React, { useState } from 'react';
import {
  Heart,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  ShieldCheck,
  Package,
  Settings,
  Sparkles,
  Check
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './OfferHelpView.module.css';

export const OfferHelpView: React.FC = () => {
  const {
    tasks,
    contacts,
    assistanceRequests,
    acceptHelperInvitation,
    declineHelperInvitation,
    openTaskDetails,
    navigateTo
  } = useCareContext();

  const { activeUser, updateAccount } = useAccountContext();

  const [committedCommTasks, setCommittedCommTasks] = useState<string[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Availability state
  const currentAvailability = activeUser?.helperAvailability || 'available_now';

  const handleSetAvailability = (val: 'available_now' | 'later_or_selected_days' | 'unavailable_for_now') => {
    updateAccount({ helperAvailability: val });
  };

  // Section A: Incoming Invitations explicitly addressed to active user
  const incomingInvitations = Object.values(assistanceRequests).filter(req => {
    // If Aarav is logged in, show Nisha's request (or requests assigned/invited to him)
    if (activeUser?.id === 'aarav') {
      return (
        req.id === 'req-nisha-food-01' ||
        req.assignedHelperId === 'aarav' ||
        req.status === 'invitation_pending'
      );
    }
    return req.assignedHelperId === activeUser?.id;
  });

  // Section B: Circle Care Needs
  // Open tasks from contacts in the user's circle (e.g. Savitri Amma)
  const circleTasks = [
    {
      contact: contacts.savitri,
      task: tasks['task-groceries'],
      categoryLabel: 'Essential Groceries & Rations',
      dueLabel: 'Within 1–2 days'
    },
    {
      contact: contacts.savitri,
      task: tasks['task-meds'],
      categoryLabel: 'Medication Refill Coordination',
      dueLabel: 'Within 3 days'
    },
    {
      contact: contacts.savitri,
      task: tasks['task-transport'],
      categoryLabel: 'Routine Hospital Transport',
      dueLabel: 'In 5 days'
    }
  ];

  // Section C: Seeded Community Opportunities in Bengaluru (Excluding Child Safe cases)
  const communityOpportunities = [
    {
      id: 'comm-hal-water-01',
      title: 'Drinking Water & Rice Delivery',
      area: 'HAL 2nd Stage (1.8 km)',
      description: 'Support two elder households unable to fetch water after local tanker supply diversion.',
      urgency: 'Today, by 4:00 PM',
      capability: 'Groceries & Transport',
      verifiedOrigin: 'Community verified via RWA'
    },
    {
      id: 'comm-ulsoor-meds-02',
      title: 'Blood Pressure Medication Pickup',
      area: 'Ulsoor / Murphy Town (2.4 km)',
      description: 'Collect prescription refill from authorized dispensary for resident with reduced mobility.',
      urgency: 'Within 24 hours',
      capability: 'Prescription pickup',
      verifiedOrigin: 'Verified with doctor note'
    },
    {
      id: 'comm-domlur-torch-03',
      title: 'Emergency Lantern & Batteries',
      area: 'Domlur Layout (1.5 km)',
      description: 'Supply battery-operated lamps to family home hosting recovering patient during power rolling checks.',
      urgency: 'Tomorrow morning',
      capability: 'Supplies',
      verifiedOrigin: 'Local coordinator verified'
    }
  ];

  const handleAcceptInvite = (reqId: string) => {
    acceptHelperInvitation(reqId, activeUser?.id || 'aarav');
    setFeedbackMsg('Commitment accepted! You are now the assigned caregiver.');
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleDeclineInvite = (reqId: string) => {
    declineHelperInvitation(reqId, activeUser?.id || 'aarav');
    setFeedbackMsg('Invitation politely declined. Request returned to matching pool.');
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleCommitCommunity = (id: string) => {
    setCommittedCommTasks(prev => [...prev, id]);
    setFeedbackMsg('You committed to this community responsibility. Recorded in My Activity.');
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span>—</span>
            <span>COMMUNITY CARE IN ACTION</span>
          </div>
          <h1 className={styles.title}>Good things happen when we show up.</h1>
          <p className={styles.subtitle}>
            Discover responsibilities you can take on, starting with people you know in Indiranagar and nearby neighbourhoods.
          </p>
        </div>

        {/* Global Feedback Banner */}
        {feedbackMsg && (
          <div style={{
            background: '#E8F5E9',
            border: '1.5px solid #2E7D32',
            color: '#1B5E20',
            padding: '12px 18px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <CheckCircle2 size={18} />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Section D: Availability & Capabilities Control */}
        <div className={styles.availabilityBar}>
          <div className={styles.availLeft}>
            <div className={`
              ${styles.statusIndicator}
              ${currentAvailability === 'available_now' ? styles.available : currentAvailability === 'later_or_selected_days' ? styles.later : styles.unavailable}
            `} />
            <div>
              <div className={styles.availTitle}>
                {currentAvailability === 'available_now'
                  ? 'You are active & available to help'
                  : currentAvailability === 'later_or_selected_days'
                  ? 'Available later / scheduled hours'
                  : 'Currently marked unavailable'}
              </div>
              <div className={styles.availMeta}>
                Coverage: {activeUser?.neighbourhood || 'Indiranagar'}, within {activeUser?.preferredRadiusKm || 3} km
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div className={styles.availToggleGroup}>
              <button
                type="button"
                className={`${styles.availBtn} ${currentAvailability === 'available_now' ? styles.availBtnActive : ''}`}
                onClick={() => handleSetAvailability('available_now')}
              >
                Available now
              </button>
              <button
                type="button"
                className={`${styles.availBtn} ${currentAvailability === 'later_or_selected_days' ? styles.availBtnActive : ''}`}
                onClick={() => handleSetAvailability('later_or_selected_days')}
              >
                Available later
              </button>
              <button
                type="button"
                className={`${styles.availBtn} ${currentAvailability === 'unavailable_for_now' ? styles.availBtnActive : ''}`}
                onClick={() => handleSetAvailability('unavailable_for_now')}
              >
                Unavailable
              </button>
            </div>

            <button
              type="button"
              className={styles.editPrefLink}
              onClick={() => navigateTo('user_profile')}
            >
              <Settings size={14} />
              <span>Edit preferences</span>
            </button>
          </div>
        </div>

        {/* Section A: Incoming Invitations */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <div className={styles.sectionIconBadge} style={{ background: '#FFE8E0', color: '#F45124' }}>
                <Sparkles size={18} />
              </div>
              <h2 className={styles.sectionTitle}>Incoming Invitations</h2>
              <span className={styles.sectionCount}>{incomingInvitations.length}</span>
            </div>
          </div>

          {incomingInvitations.length > 0 ? (
            incomingInvitations.map(req => {
              const isAccepted = req.status === 'assigned' || req.status === 'in_progress' || req.status === 'delivered_pending_confirmation' || req.status === 'confirmed_complete';
              const isDeclined = req.status === 'cancelled';

              return (
                <div key={req.id} className={styles.invitationCard}>
                  <div className={styles.invitationTop}>
                    <div className={styles.invitationSender}>
                      <img
                        src={getAssetUrl('/images/contacts/nisha.png')}
                        alt={req.recipientName}
                        className={styles.avatar}
                      />
                      <div>
                        <div className={styles.senderName}>{req.recipientName}</div>
                        <div className={styles.senderMeta}>
                          <MapPin size={14} />
                          <span>{req.generalLocation} • 1.2 km away</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.urgencyBadge}>
                      <Clock size={12} />
                      <span>{req.urgency.replace(/_/g, ' ')}</span>
                    </div>
                  </div>

                  <div className={styles.invitationBody}>
                    <div className={styles.needDescription}>
                      <strong>Request:</strong> {req.notes || 'Essential food and rations support needed following supply disruptions.'}
                    </div>
                    {req.selectedItems && req.selectedItems.length > 0 && (
                      <div className={styles.itemsList}>
                        {req.selectedItems.map((item, idx) => (
                          <span key={idx} className={styles.itemTag}>
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.invitationActions}>
                    {!isAccepted && !isDeclined ? (
                      <>
                        <button
                          type="button"
                          className={styles.acceptBtn}
                          onClick={() => handleAcceptInvite(req.id)}
                        >
                          <Check size={16} />
                          <span>Accept Responsibility</span>
                        </button>
                        <button
                          type="button"
                          className={styles.declineBtn}
                          onClick={() => handleDeclineInvite(req.id)}
                        >
                          Decline
                        </button>
                      </>
                    ) : isAccepted ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: '#2E7D32', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={16} /> Responsibility Accepted
                        </span>
                        <button
                          type="button"
                          className={styles.viewTaskBtn}
                          onClick={() => navigateTo('help_request_tracker')}
                        >
                          <span>Track Commitment</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: '#757575', fontSize: '0.875rem' }}>
                        Invitation declined.
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyTitle}>No pending direct invitations</div>
              <div className={styles.emptyText}>
                When trusted contacts or neighbors request your specific assistance, their invites appear here.
              </div>
            </div>
          )}
        </section>

        {/* Section B: My Circle Care Needs */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <div className={styles.sectionIconBadge} style={{ background: '#E3F2FD', color: '#1976D2' }}>
                <Users size={18} />
              </div>
              <h2 className={styles.sectionTitle}>My Circle Care Needs</h2>
              <span className={styles.sectionCount}>{circleTasks.length}</span>
            </div>
            <button
              type="button"
              className={styles.editPrefLink}
              onClick={() => navigateTo('my_circle')}
            >
              <span>Explore My Circle</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className={styles.circleGrid}>
            {circleTasks.map(({ contact, task }) => {
              if (!contact || !task) return null;
              const isComplete = task.status === 'confirmed_complete';
              const isAssigned = task.status === 'assigned' || task.status === 'in_progress' || task.status === 'delivered_pending_confirmation';

              return (
                <div key={task.id} className={styles.circleCard}>
                  <div>
                    <div className={styles.circleCardTop}>
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className={styles.circleAvatar}
                      />
                      <div>
                        <div className={styles.circlePersonName}>{contact.name}</div>
                        <div className={styles.circleRelationship}>{contact.relationship} • {contact.location}</div>
                      </div>
                    </div>

                    <h3 className={styles.circleTaskTitle}>{task.title}</h3>
                    <p className={styles.circleTaskDesc}>{task.description}</p>
                  </div>

                  <div className={styles.circleCardBottom}>
                    <div className={isComplete ? styles.statusPillSuccess : styles.statusPill}>
                      {isComplete ? 'Completed • Promise Kept' : isAssigned ? 'In Progress' : 'Needs Helper'}
                    </div>

                    <button
                      type="button"
                      className={styles.viewTaskBtn}
                      onClick={() => {
                        if (task.id === 'task-groceries') {
                          openTaskDetails(task.id);
                        } else {
                          navigateTo('care_chain');
                        }
                      }}
                    >
                      <span>{isComplete ? 'View Record' : 'View & Coordinate'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section C: Eligible Community Opportunities */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <div className={styles.sectionIconBadge} style={{ background: '#F3E5F5', color: '#7B1FA2' }}>
                <Package size={18} />
              </div>
              <h2 className={styles.sectionTitle}>Eligible Community Opportunities</h2>
              <span className={styles.sectionCount}>{communityOpportunities.length}</span>
            </div>
          </div>

          <div className={styles.commGrid}>
            {communityOpportunities.map((op) => {
              const isCommitted = committedCommTasks.includes(op.id);
              return (
                <div key={op.id} className={styles.commCard}>
                  <div>
                    <div className={styles.commHeader}>
                      <span className={styles.commAreaBadge}>
                        <MapPin size={13} />
                        <span>{op.area}</span>
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#C0390F' }}>
                        {op.urgency}
                      </span>
                    </div>

                    <h3 className={styles.commTitle}>{op.title}</h3>
                    <p className={styles.commDesc}>{op.description}</p>

                    <div className={styles.commMeta}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldCheck size={14} color="#2E7D32" />
                        <span>{op.verifiedOrigin}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.commCommitBtn}
                    onClick={() => handleCommitCommunity(op.id)}
                    disabled={isCommitted}
                    style={isCommitted ? { background: '#E8F5E9', color: '#2E7D32', borderColor: '#2E7D32' } : {}}
                  >
                    {isCommitted ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Committed to Assist</span>
                      </>
                    ) : (
                      <>
                        <Heart size={15} />
                        <span>Take on Responsibility</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
