import React, { useState } from 'react';
import { ShoppingBag, RotateCcw, ArrowRight, UserCheck, Eye, X, AlertCircle, Compass } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import styles from './HelpNowDemoControls.module.css';

export const HelpNowDemoControls: React.FC = () => {
  const {
    currentView,
    navigateTo,
    resetHelpNowScenario,
    inviteHelperToRequest,
    acceptHelperInvitation,
    advanceAssistanceProgress,
    confirmAssistanceDelivery
  } = useCareContext();
  const { switchAccount } = useAccountContext();

  const [isOpen, setIsOpen] = useState(false);

  // Show when anywhere in Help Now or related views
  const isHelpNowContext =
    currentView.startsWith('help_') ||
    currentView === 'my_circle';

  if (!isHelpNowContext) return null;

  const requestId = 'req-nisha-food-01';

  return (
    <div className={styles.toolbarWrap}>
      {!isOpen ? (
        <button
          type="button"
          className={styles.triggerBtn}
          onClick={() => setIsOpen(true)}
          aria-label="Open Help Now Demo Controls"
        >
          <ShoppingBag size={16} />
          <span>Help Now Scenario</span>
          <span className={styles.pillBadge}>DEMO</span>
        </button>
      ) : (
        <div className={styles.popover}>
          <div className={styles.popoverHeader}>
            <div className={styles.popoverTitle}>
              <ShoppingBag size={16} color="#F45124" />
              <span>Explore Help Now</span>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          <p className={styles.popoverDesc}>
            Jump between canonical Phase 04 assistance stages for review &amp; verification:
          </p>

          <div className={styles.actionsList}>
            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                navigateTo('help_now_landing');
                setIsOpen(false);
              }}
            >
              <span>1. Help Now Landing</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                navigateTo('help_category_select');
                setIsOpen(false);
              }}
            >
              <span>2. Category Selector</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                switchAccount('nisha');
                navigateTo('help_request_form');
                setIsOpen(false);
              }}
            >
              <span>3. Request Form (Nisha)</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                switchAccount('nisha');
                navigateTo('help_request_review');
                setIsOpen(false);
              }}
            >
              <span>4. Request Review</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                navigateTo('help_matched_discovery');
                setIsOpen(false);
              }}
            >
              <span>5. Nearby Helpers Map</span>
              <Compass size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                switchAccount('nisha');
                inviteHelperToRequest(requestId, 'aarav');
                navigateTo('help_request_tracker');
                setIsOpen(false);
              }}
            >
              <span>6. Pending Invitation (Nisha)</span>
              <Eye size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                switchAccount('aarav');
                inviteHelperToRequest(requestId, 'aarav');
                acceptHelperInvitation(requestId, 'aarav');
                advanceAssistanceProgress(requestId, 'picked_up');
                navigateTo('help_request_tracker');
                setIsOpen(false);
              }}
            >
              <span>7. Helper In-Progress (Aarav)</span>
              <UserCheck size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                inviteHelperToRequest(requestId, 'aarav');
                acceptHelperInvitation(requestId, 'aarav');
                advanceAssistanceProgress(requestId, 'picked_up');
                advanceAssistanceProgress(requestId, 'delivered');
                switchAccount('nisha');
                navigateTo('help_request_tracker');
                setIsOpen(false);
              }}
            >
              <span>8. Delivery Confirmation (Nisha)</span>
              <Eye size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                inviteHelperToRequest(requestId, 'aarav');
                acceptHelperInvitation(requestId, 'aarav');
                advanceAssistanceProgress(requestId, 'picked_up');
                advanceAssistanceProgress(requestId, 'delivered');
                confirmAssistanceDelivery(requestId, false, 'Recipient confirmed groceries were not received.');
                switchAccount('nisha');
                navigateTo('help_request_tracker');
                setIsOpen(false);
              }}
            >
              <span>9. Follow-Up Required (Disputed)</span>
              <AlertCircle size={13} />
            </button>

            <button
              type="button"
              className={`${styles.actionItem} ${styles.actionItemReset}`}
              onClick={() => {
                resetHelpNowScenario();
                switchAccount('nisha');
                setIsOpen(false);
              }}
            >
              <span>Reset Help Now Scenario</span>
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
