import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  FileText,
  Edit3,
  ArrowRight,
  ArrowLeft,
  Check,
  Shield,
  Info
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import styles from './HelpRequestReview.module.css';

export const HelpRequestReview: React.FC = () => {
  const {
    activeAssistanceRequest,
    updateAssistanceRequest,
    navigateTo,
    goBack
  } = useCareContext();
  const { activeUser } = useAccountContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const req = activeAssistanceRequest;
  const requestId = req?.id || 'req-nisha-food-01';

  const recipientDisplay = req?.recipientName || (activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Nisha Rao');
  const itemsDisplay = req?.selectedItems?.join(', ') || 'Rice, Dal, Vegetables, Drinking water';
  const urgencyDisplay = req?.urgency === 'today' ? 'Today (Desired window, subject to volunteer availability)' : req?.urgency === 'within_24_hours' ? 'Within 24 hours' : 'Within 3 days';
  const locationDisplay = req?.generalLocation || 'Indiranagar, Bengaluru';
  const contactDisplay = req?.contactPreference === 'whatsapp' ? 'WhatsApp (+91 98450 12345)' : req?.contactPreference === 'phone_call' ? 'Phone call' : 'SMS';
  const notesDisplay = req?.notes || "We are a family of 3. Need basic groceries and drinking water. Our building doesn't have a lift, please call on WhatsApp before delivery.";

  const handleEdit = () => {
    navigateTo('help_request_form');
  };

  const handleCreateRequest = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Update status to submitted
    updateAssistanceRequest(requestId, {
      status: 'submitted',
      createdAt: 'Today, 10:14 AM',
      timeline: {
        submittedAt: 'Today, 10:14 AM'
      }
    });

    setSuccessNotice(true);

    setTimeout(() => {
      navigateTo('help_matched_discovery');
    }, 900);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Stepper Progress */}
        <div className={styles.stepperWrap}>
          <div className={styles.stepItemDone}>
            <span className={styles.stepBadgeDone}>
              <Check size={12} strokeWidth={3} />
            </span>
            <span>Need</span>
          </div>
          <div className={styles.stepDividerDone} />
          <div className={styles.stepItemDone}>
            <span className={styles.stepBadgeDone}>
              <Check size={12} strokeWidth={3} />
            </span>
            <span>Details</span>
          </div>
          <div className={styles.stepDividerDone} />
          <div className={styles.stepItemActive}>
            <span className={styles.stepBadgeActive}>3</span>
            <span>Review</span>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.stepItemPending}>
            <span className={styles.stepBadgePending}>4</span>
            <span>Track</span>
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>STEP 3 OF 4 · VERIFY DETAILS</div>
          <h1 className={styles.title}>
            Let's make sure we've got <span className={styles.highlight}>this right.</span>
          </h1>
          <p className={styles.subtitle}>
            Review your assistance request before it is recorded in the demonstration network.
          </p>
        </div>

        {/* Main Review Card */}
        <div className={styles.reviewCard}>
          {/* Section 1: Recipient */}
          <div className={styles.reviewRow}>
            <div className={styles.rowLeft}>
              <div className={styles.iconWrap}>
                <User size={18} />
              </div>
              <div>
                <span className={styles.rowLabel}>Recipient</span>
                <strong className={styles.rowValue}>{recipientDisplay}</strong>
                <span className={styles.rowSub}>
                  {req?.isSelfRecipient ? 'Personal request (Myself)' : `Relationship: ${req?.recipientRelationship || 'Someone else'}`}
                </span>
              </div>
            </div>
            <button type="button" className={styles.editBtn} onClick={handleEdit}>
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
          </div>

          <div className={styles.divider} />

          {/* Section 2: Items Needed */}
          <div className={styles.reviewRow}>
            <div className={styles.rowLeft}>
              <div className={styles.iconWrap}>
                <ShoppingBag size={18} />
              </div>
              <div>
                <span className={styles.rowLabel}>Requested items</span>
                <strong className={styles.rowValue}>{itemsDisplay}</strong>
                <span className={styles.rowSub}>
                  Essential food provisions and drinking water
                </span>
              </div>
            </div>
            <button type="button" className={styles.editBtn} onClick={handleEdit}>
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
          </div>

          <div className={styles.divider} />

          {/* Section 3: Urgency & Delivery */}
          <div className={styles.reviewRow}>
            <div className={styles.rowLeft}>
              <div className={styles.iconWrap}>
                <Clock size={18} />
              </div>
              <div>
                <span className={styles.rowLabel}>Urgency & Delivery</span>
                <strong className={styles.rowValue}>{urgencyDisplay}</strong>
                <span className={styles.rowSub}>
                  {req?.canReceiveDelivery
                    ? 'Someone will be available at the location to receive items'
                    : 'May require special delivery coordination'}
                </span>
              </div>
            </div>
            <button type="button" className={styles.editBtn} onClick={handleEdit}>
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
          </div>

          <div className={styles.divider} />

          {/* Section 4: Location */}
          <div className={styles.reviewRow}>
            <div className={styles.rowLeft}>
              <div className={styles.iconWrap}>
                <MapPin size={18} />
              </div>
              <div>
                <span className={styles.rowLabel}>Neighbourhood area</span>
                <strong className={styles.rowValue}>{locationDisplay}</strong>
                <span className={styles.rowSub}>
                  Pincode 560038 · Approximate radius matching
                </span>
              </div>
            </div>
            <button type="button" className={styles.editBtn} onClick={handleEdit}>
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
          </div>

          <div className={styles.divider} />

          {/* Section 5: Contact Preference */}
          <div className={styles.reviewRow}>
            <div className={styles.rowLeft}>
              <div className={styles.iconWrap}>
                <Phone size={18} />
              </div>
              <div>
                <span className={styles.rowLabel}>Contact method</span>
                <strong className={styles.rowValue}>{contactDisplay}</strong>
                <span className={styles.rowSub}>
                  Used strictly for delivery coordination and verification
                </span>
              </div>
            </div>
            <button type="button" className={styles.editBtn} onClick={handleEdit}>
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
          </div>

          {notesDisplay && (
            <>
              <div className={styles.divider} />
              {/* Section 6: Additional Instructions */}
              <div className={styles.reviewRow}>
                <div className={styles.rowLeft}>
                  <div className={styles.iconWrap}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <span className={styles.rowLabel}>Additional instructions</span>
                    <p className={styles.notesText}>{notesDisplay}</p>
                  </div>
                </div>
                <button type="button" className={styles.editBtn} onClick={handleEdit}>
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* What Happens Next Card */}
        <div className={styles.nextStepsCard}>
          <div className={styles.nextHeader}>
            <Shield size={18} className={styles.shieldIcon} />
            <span className={styles.nextTitle}>What happens after you create this request</span>
          </div>

          <div className={styles.nextGrid}>
            <div className={styles.nextItem}>
              <span className={styles.nextNum}>1</span>
              <div>
                <strong>Request recorded</strong>
                <span>Your need is saved in the local Indiranagar support directory.</span>
              </div>
            </div>

            <div className={styles.nextItem}>
              <span className={styles.nextNum}>2</span>
              <div>
                <strong>Explore nearby help</strong>
                <span>You can review available community volunteers and open relief points.</span>
              </div>
            </div>

            <div className={styles.nextItem}>
              <span className={styles.nextNum}>3</span>
              <div>
                <strong>Helper accepts invitation</strong>
                <span>A volunteer receives your invitation and explicitly accepts before assignment.</span>
              </div>
            </div>

            <div className={styles.nextItem}>
              <span className={styles.nextNum}>4</span>
              <div>
                <strong>Confirmed delivery</strong>
                <span>You confirm when items safely reach you. If not received, problem triage is alerted.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prototype Disclosure */}
        <div className={styles.disclaimerBox}>
          <Info size={16} className={styles.discIcon} />
          <span>
            Demonstration Disclosure: All helper matching, maps, and deliveries in this interface
            are simulated scenarios representing post-Snap mutual aid.
          </span>
        </div>

        {/* Success Notice if submitted */}
        {successNotice && (
          <div className={styles.successToast}>
            <Check size={18} />
            <span>Your request has been recorded in this demonstration. Opening nearby help...</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className={styles.footer}>
          <button type="button" className={styles.backBtn} onClick={() => goBack()}>
            <ArrowLeft size={16} />
            <span>Back to edit</span>
          </button>

          <button
            type="button"
            className={styles.createBtn}
            onClick={handleCreateRequest}
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Recording request...' : 'Create help request'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
