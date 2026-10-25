import React from 'react';
import { ArrowLeft, ArrowRight, Check, PackageCheck, Truck, ShieldCheck, Heart } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './TaskProgressView.module.css';

export const TaskProgressView: React.FC = () => {
  const {
    tasks,
    contacts,
    advanceTaskProgress,
    openRecipientConfirmModal,
    navigateTo
  } = useCareContext();

  const task = tasks['task-groceries'];
  const savitri = contacts.savitri;

  // Determine which stage we are at
  // Stage 1: Accepted (always true once assigned)
  // Stage 2: In progress (picked up)
  // Stage 3: Delivered (delivered_pending_confirmation)
  // Stage 4: Confirmed complete (confirmed_complete)
  const isStage1Done = task?.status !== 'confirmed_unassigned' && task?.status !== 'potential_need';
  const isStage2Done =
    task?.status === 'in_progress' ||
    task?.status === 'delivered_pending_confirmation' ||
    task?.status === 'confirmed_complete';
  const isStage3Done =
    task?.status === 'delivered_pending_confirmation' ||
    task?.status === 'confirmed_complete';
  const isStage4Done = task?.status === 'confirmed_complete';

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Navigation Breadcrumb */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigateTo('care_chain')}
          aria-label="Back to Care Chain"
        >
          <ArrowLeft size={16} />
          <span>Back to Care Chain</span>
        </button>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrow}>RESPONSIBILITY TRACKER</span>
          </div>
          <h1 className={styles.headline}>Grocery Delivery</h1>
          <p className={styles.subheadline}>
            Track this care responsibility from pickup through confirmed delivery.
          </p>
        </div>

        {/* Status Overview Card */}
        <div className={styles.overviewCard}>
          <div className={styles.overviewLeft}>
            {savitri && (
              <img
                src={savitri.avatar}
                alt=""
                width={52}
                height={52}
                className={styles.avatar}
              />
            )}
            <div>
              <div className={styles.overviewTitle}>Recipient: Savitri Amma (Age 78)</div>
              <div className={styles.overviewSub}>Indiranagar 12th Main, Bengaluru • Within 1–2 days</div>
            </div>
          </div>

          <div className={styles.helperBadge}>
            <ShieldCheck size={16} />
            <span>Assigned to {task?.assignedHelperName || 'Aarav (You)'}</span>
          </div>
        </div>

        {/* 4-Stage Interactive Timeline */}
        <div className={styles.timelineCard}>
          <h2 className={styles.timelineHeading}>Delivery Milestones</h2>

          <div className={styles.timelineList}>
            <div className={styles.timelineTrack} aria-hidden="true" />

            {/* Stage 1: Task Accepted */}
            <div className={styles.timelineItem}>
              <div className={`${styles.stepIconWrap} ${isStage1Done ? styles.stepDone : ''}`}>
                {isStage1Done ? <Check size={18} strokeWidth={3} /> : '1'}
              </div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitleRow}>
                  <span className={styles.stepTitle}>Task Accepted</span>
                  <span className={styles.stepTimestamp}>{task?.timeline.acceptedAt || 'Today, 10:30 AM'}</span>
                </div>
                <p className={styles.stepDescription}>
                  {task?.assignedHelperName || 'Aarav'} accepted responsibility for Savitri Amma's essential grocery delivery.
                </p>
              </div>
            </div>

            {/* Stage 2: Groceries Picked Up */}
            <div className={styles.timelineItem}>
              <div
                className={`${styles.stepIconWrap} ${
                  isStage2Done
                    ? styles.stepDone
                    : isStage1Done
                    ? styles.stepActive
                    : ''
                }`}
              >
                {isStage2Done ? <Check size={18} strokeWidth={3} /> : '2'}
              </div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitleRow}>
                  <span className={styles.stepTitle}>Groceries Picked Up</span>
                  {isStage2Done && (
                    <span className={styles.stepTimestamp}>{task?.timeline.pickedUpAt || 'Today, 11:45 AM'}</span>
                  )}
                </div>
                <p className={styles.stepDescription}>
                  Helper collects rice (5kg), toor dal (2kg), and fresh vegetables from local vendor or supply hub.
                </p>

                {isStage1Done && !isStage2Done && (
                  <div className={styles.stepActionArea}>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => advanceTaskProgress('picked_up')}
                    >
                      <PackageCheck size={18} />
                      <span>Picked up the groceries</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stage 3: Delivered to Savitri Amma */}
            <div className={styles.timelineItem}>
              <div
                className={`${styles.stepIconWrap} ${
                  isStage3Done
                    ? styles.stepDone
                    : isStage2Done
                    ? styles.stepActive
                    : ''
                }`}
              >
                {isStage3Done ? <Check size={18} strokeWidth={3} /> : '3'}
              </div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitleRow}>
                  <span className={styles.stepTitle}>Delivered to Savitri Amma</span>
                  {isStage3Done && (
                    <span className={styles.stepTimestamp}>{task?.timeline.deliveredAt || 'Today, 1:15 PM'}</span>
                  )}
                </div>
                <p className={styles.stepDescription}>
                  Supplies hand-delivered to Savitri Amma's home in Indiranagar.
                </p>

                {isStage2Done && !isStage3Done && (
                  <div className={styles.stepActionArea}>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => advanceTaskProgress('delivered')}
                    >
                      <Truck size={18} />
                      <span>I've delivered the groceries</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stage 4: Recipient Confirmation */}
            <div className={styles.timelineItem}>
              <div
                className={`${styles.stepIconWrap} ${
                  isStage4Done
                    ? styles.stepDone
                    : isStage3Done
                    ? styles.stepActive
                    : ''
                }`}
              >
                {isStage4Done ? <Check size={18} strokeWidth={3} /> : '4'}
              </div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitleRow}>
                  <span className={styles.stepTitle}>Recipient Confirmation</span>
                  {isStage4Done && (
                    <span className={styles.stepTimestamp}>{task?.timeline.confirmedAt || 'Today, 1:20 PM'}</span>
                  )}
                </div>
                <p className={styles.stepDescription}>
                  {isStage4Done
                    ? 'Savitri Amma confirmed receipt of groceries. Responsibility verified and complete.'
                    : 'Awaiting recipient confirmation. Savitri Amma verifies delivery to close the Care Chain.'}
                </p>

                {isStage3Done && !isStage4Done && (
                  <div className={styles.stepActionArea}>
                    <button
                      type="button"
                      className={styles.simulateConfirmBtn}
                      onClick={openRecipientConfirmModal}
                    >
                      <ShieldCheck size={18} />
                      <span>Simulate Savitri Amma's confirmation</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {isStage4Done && (
                  <div className={styles.stepActionArea}>
                    <button
                      type="button"
                      className={styles.viewRecognitionBtn}
                      onClick={() => navigateTo('recognition')}
                    >
                      <Heart size={18} fill="currentColor" />
                      <span>View Recognition & Completed Record</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
