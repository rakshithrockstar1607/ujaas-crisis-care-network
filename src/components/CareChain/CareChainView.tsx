import React from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, Pill, Bus, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './CareChainView.module.css';

export const CareChainView: React.FC = () => {
  const {
    contacts,
    tasks,
    navigateTo,
    openTaskDetails
  } = useCareContext();

  const savitri = contacts.savitri;
  const groceryTask = tasks['task-groceries'];
  const medsTask = tasks['task-meds'];
  const transportTask = tasks['task-transport'];

  const isGroceriesComplete = groceryTask?.status === 'confirmed_complete';
  const isGroceriesAssigned =
    groceryTask?.status === 'assigned' ||
    groceryTask?.status === 'in_progress' ||
    groceryTask?.status === 'delivered_pending_confirmation';

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Navigation Breadcrumb */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigateTo('my_circle')}
          aria-label="Back to My Circle"
        >
          <ArrowLeft size={16} />
          <span>Back to My Circle</span>
        </button>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrow}>CARE CHAIN COORDINATION</span>
          </div>
          <h1 className={styles.headline}>Savitri Amma's Care Chain</h1>
          <p className={styles.subheadline}>
            These are the everyday responsibilities that help her stay safe, healthy, and independent.
          </p>
        </div>

        {/* Recipient Profile Bar */}
        {savitri && (
          <div className={styles.recipientBar}>
            <div className={styles.recipientLeft}>
              <img
                src={savitri.avatar}
                alt=""
                width={64}
                height={64}
                className={styles.avatar}
              />
              <div>
                <h2 className={styles.recipientName}>{savitri.name}</h2>
                <div className={styles.recipientMeta}>
                  <span>{savitri.relationship}</span>
                  <span>•</span>
                  <span>Age {savitri.age}</span>
                  <span>•</span>
                  <span>{savitri.location}</span>
                </div>
              </div>
            </div>

            <div className={styles.chainPill}>
              <span>Care Chain: 3 Active Responsibilities</span>
            </div>
          </div>
        )}

        {/* Responsibilities Stack */}
        <div className={styles.tasksGrid} role="region" aria-label="Care chain responsibilities">
          {/* Card 1: Essential Groceries (Highlighted) */}
          <article className={`${styles.taskCard} ${isGroceriesComplete ? styles.completedCard : styles.highlightCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardCategoryGroup}>
                <div className={`${styles.categoryIconWrap} ${styles.iconGroceries}`}>
                  <ShoppingBag size={22} />
                </div>
                <div className={styles.taskTitleBlock}>
                  <span className={styles.taskCategoryLabel}>Essential Supplies</span>
                  <h3 className={styles.taskTitle}>{groceryTask?.title || 'Grocery Delivery'}</h3>
                </div>
              </div>

              {isGroceriesComplete ? (
                <span className={`${styles.statusPill} ${styles.pillComplete}`}>
                  <CheckCircle2 size={14} />
                  Confirmed Complete
                </span>
              ) : isGroceriesAssigned ? (
                <span className={`${styles.statusPill} ${styles.pillAssigned}`}>
                  Assigned to Aarav (You)
                </span>
              ) : (
                <span className={`${styles.statusPill} ${styles.pillNeedsHelp}`}>
                  <AlertCircle size={14} />
                  Needs Help
                </span>
              )}
            </div>

            <p className={styles.taskDescription}>
              {groceryTask?.description || 'Essential groceries and household supplies.'}
            </p>

            <div className={styles.cardMetadataGrid}>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span className={styles.metaLabel}>Delivery Window:</span>
                <span className={styles.metaValue}>{groceryTask?.dueWindow || 'Within 1–2 days'}</span>
              </div>

              <div className={styles.metaItem}>
                <User size={16} />
                <span className={styles.metaLabel}>Assigned Helper:</span>
                <span className={styles.metaValue}>
                  {groceryTask?.assignedHelperName || 'None (Unassigned)'}
                </span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              {isGroceriesComplete ? (
                <button
                  type="button"
                  className={styles.trackProgressBtn}
                  onClick={() => navigateTo('recognition')}
                >
                  <span>View Completion & Recognition</span>
                  <ArrowRight size={16} />
                </button>
              ) : isGroceriesAssigned ? (
                <button
                  type="button"
                  className={styles.trackProgressBtn}
                  onClick={() => navigateTo('task_progress')}
                >
                  <span>Track Task Progress</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.takeTaskBtn}
                  onClick={() => openTaskDetails('task-groceries')}
                >
                  <span>View Details & Accept</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </article>

          {/* Card 2: Medication Refill Coordination */}
          <article className={styles.taskCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardCategoryGroup}>
                <div className={`${styles.categoryIconWrap} ${styles.iconMeds}`}>
                  <Pill size={22} />
                </div>
                <div className={styles.taskTitleBlock}>
                  <span className={styles.taskCategoryLabel}>Prescription Care</span>
                  <h3 className={styles.taskTitle}>{medsTask?.title || 'Medication Refill Coordination'}</h3>
                </div>
              </div>

              <span className={`${styles.statusPill} ${styles.pillPending}`}>
                Needs Confirmation
              </span>
            </div>

            <p className={styles.taskDescription}>
              {medsTask?.description || 'Review whether regular blood pressure medicines require collection.'}
            </p>

            <div className={styles.cardMetadataGrid}>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span className={styles.metaLabel}>Review Due:</span>
                <span className={styles.metaValue}>{medsTask?.dueWindow || 'In 3 days'}</span>
              </div>

              <div className={styles.metaItem}>
                <User size={16} />
                <span className={styles.metaLabel}>Assigned Helper:</span>
                <span className={styles.metaValue}>Unassigned (Awaiting pharmacy triage)</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                className={styles.viewDetailsBtn}
                onClick={() => alert("Medication refill coordination will be scheduled once pharmacy inventory stabilizes.")}
              >
                <span>View Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </article>

          {/* Card 3: Routine Hospital Transport */}
          <article className={styles.taskCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardCategoryGroup}>
                <div className={`${styles.categoryIconWrap} ${styles.iconTransport}`}>
                  <Bus size={22} />
                </div>
                <div className={styles.taskTitleBlock}>
                  <span className={styles.taskCategoryLabel}>Medical Mobility</span>
                  <h3 className={styles.taskTitle}>{transportTask?.title || 'Routine Hospital Transport'}</h3>
                </div>
              </div>

              <span className={`${styles.statusPill} ${styles.pillPending}`}>
                Upcoming / in 5 days
              </span>
            </div>

            <p className={styles.taskDescription}>
              {transportTask?.description || 'Check whether transport is required for her next scheduled ophthalmology visit.'}
            </p>

            <div className={styles.cardMetadataGrid}>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span className={styles.metaLabel}>Appointment Date:</span>
                <span className={styles.metaValue}>{transportTask?.dueWindow || 'In 5 days'}</span>
              </div>

              <div className={styles.metaItem}>
                <User size={16} />
                <span className={styles.metaLabel}>Assigned Helper:</span>
                <span className={styles.metaValue}>Unassigned</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                className={styles.viewDetailsBtn}
                onClick={() => alert("Hospital transport coordination will open 48 hours prior to appointment.")}
              >
                <span>View Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
