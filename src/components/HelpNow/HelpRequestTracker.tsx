import React, { useState } from 'react';
import {
  ShoppingBag,
  Clock,
  Phone,
  MessageSquare,
  Check,
  CheckCircle,
  MapPin,
  ArrowRight,
  AlertCircle,
  UserCheck,
  Shield,
  RotateCcw,
  Compass,
  PhoneCall,
  Users
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './HelpRequestTracker.module.css';

export const HelpRequestTracker: React.FC = () => {
  const {
    activeAssistanceRequest,
    acceptHelperInvitation,
    declineHelperInvitation,
    advanceAssistanceProgress,
    confirmAssistanceDelivery,
    reopenAssistanceRequest,
    navigateTo
  } = useCareContext();
  const { isAarav, isNisha, switchAccount } = useAccountContext();

  const [showIssueInput, setShowIssueInput] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [showCoordinatorInfo, setShowCoordinatorInfo] = useState(false);

  const req = activeAssistanceRequest;
  const requestId = req?.id || 'req-nisha-food-01';
  const status = req?.status || 'assigned';

  const isCompleted = status === 'confirmed_complete';
  const isDelivered = status === 'delivered_pending_confirmation' || isCompleted;
  const isPickedUp = status === 'in_progress' || isDelivered;
  const isAssigned = status === 'assigned' || isPickedUp;
  const isPending = status === 'invitation_pending';
  const isProblem = status === 'follow_up_required';
  const isSubmitted = status === 'submitted';

  // Dynamic Headline based on state
  const getHeadline = () => {
    if (isCompleted) {
      return (
        <>
          Help has <span className={styles.highlightGreen}>arrived.</span>
        </>
      );
    }
    if (isProblem) {
      return (
        <>
          Assistance <span className={styles.highlightRed}>requires follow-up.</span>
        </>
      );
    }
    if (isSubmitted) {
      return (
        <>
          Your request <span className={styles.highlight}>is open.</span>
        </>
      );
    }
    if (isPending) {
      return (
        <>
          Waiting for helper <span className={styles.highlight}>confirmation.</span>
        </>
      );
    }
    if (isAssigned) {
      return (
        <>
          Your help request <span className={styles.highlight}>is in motion.</span>
        </>
      );
    }
    return (
      <>
        We're looking for the <span className={styles.highlight}>right help.</span>
      </>
    );
  };

  const getSubtext = () => {
    if (isCompleted) {
      return 'Your grocery assistance has been safely delivered and confirmed. A Promise Kept.';
    }
    if (isProblem) {
      return 'Delivery was reported incomplete or contested by the recipient. A community coordinator has been notified for resolution.';
    }
    if (isSubmitted) {
      return 'Your request is recorded. You can browse nearby community volunteers on the map or invite a specific helper.';
    }
    if (isPending) {
      return 'An assistance invitation has been sent to Aarav Sharma. Waiting for explicit acceptance before sharing contact landmarks.';
    }
    if (isAssigned) {
      return 'A kind person from our community has accepted your request and is fulfilling your groceries. Live progress updates are shown below.';
    }
    return 'Your assistance request has been recorded in Indiranagar. Waiting for confirmation.';
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Editorial Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.dash}>—</span> TRACK REQUEST
          </div>
          <h1 className={styles.title}>{getHeadline()}</h1>
          <p className={styles.subtitle}>{getSubtext()}</p>
        </div>

        {/* Top Request Summary Card */}
        <div className={styles.topSummaryCard}>
          <div className={styles.summaryLeft}>
            <div className={styles.bagIconWrap}>
              <ShoppingBag size={24} />
            </div>
            <div>
              <span className={styles.summaryEyebrow}>ASSISTANCE CASE · {requestId}</span>
              <h2 className={styles.summaryTitle}>Food &amp; essentials</h2>
              <div className={styles.summaryMeta}>
                <span>Desired window: Today</span>
                <span>•</span>
                <span>Indiranagar, Bengaluru</span>
                <span>•</span>
                <span>
                  Requested by {req?.requesterName || 'Nisha Rao'} for {req?.recipientName || 'her household'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.itemsPillsWrap}>
            {req?.selectedItems?.map((item, idx) => (
              <span key={idx} className={styles.itemPill}>
                {item}
              </span>
            )) || (
              <>
                <span className={styles.itemPill}>Rice</span>
                <span className={styles.itemPill}>Dal</span>
                <span className={styles.itemPill}>Vegetables</span>
                <span className={styles.itemPill}>Drinking water</span>
              </>
            )}
          </div>
        </div>

        {/* FOLLOW-UP REQUIRED COMPREHENSIVE CARD (When delivery was reported not received) */}
        {isProblem && (
          <div className={styles.problemBannerDetailed}>
            <div className={styles.problemBannerTop}>
              <div className={styles.problemIconWrap}>
                <AlertCircle size={24} />
              </div>
              <div>
                <span className={styles.summaryEyebrow}>DELIVERY FOLLOW-UP REQUIRED</span>
                <h3 className={styles.problemHeading}>
                  Disputed delivery reported for case {requestId}
                </h3>
                <p className={styles.problemText}>
                  {req?.recipientName || 'Nisha Rao'} reported that requested grocery items were not received.
                  In accordance with UJAAS safeguarding standards, <strong>"A Promise Kept" has not been awarded</strong> and
                  this request has been flagged for local volunteer desk coordination.
                </p>
                {req?.recipientConfirmation?.notes && (
                  <p className={styles.problemText} style={{ marginTop: '0.4rem', fontStyle: 'italic' }}>
                    Recipient note: "{req.recipientConfirmation.notes}"
                  </p>
                )}
              </div>
            </div>

            <div className={styles.followUpActionsRow}>
              <button
                type="button"
                className={styles.reopenRequestBtn}
                onClick={() => reopenAssistanceRequest(requestId)}
              >
                <RotateCcw size={15} />
                <span>Re-open request for nearby volunteers</span>
              </button>

              <button
                type="button"
                className={styles.contactCoordinatorBtn}
                onClick={() => setShowCoordinatorInfo(!showCoordinatorInfo)}
              >
                <PhoneCall size={15} />
                <span>{showCoordinatorInfo ? 'Hide coordinator desk' : 'Contact community coordinator'}</span>
              </button>
            </div>

            {showCoordinatorInfo && (
              <div className={styles.coordinatorDetailsCard}>
                <strong>Ward 82 Community Care Desk (Indiranagar)</strong>
                <span>Lead Coordinator: Priya Venkat (BBMP Ward Volunteer Desk)</span>
                <span>Contact: +91 80 2520 1908 · Direct Radio/SMS: Ward-82-Relief</span>
                <span>April 2018 protocol: Case assigned for in-person status verification within 2 hours.</span>
              </div>
            )}
          </div>
        )}

        {/* 3-Column Layout: Timeline | Helper & Live Action | Route & Map */}
        <div className={styles.mainGrid}>
          {/* Column 1: Vertical Timeline */}
          <div className={styles.timelineCol}>
            <h3 className={styles.colTitle}>Activity timeline</h3>

            <div className={styles.timeline}>
              {/* Step 1: Request received */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineIconDone}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.stepHeader}>
                    <strong>Request received</strong>
                    <span className={styles.timestamp}>10:14 AM</span>
                  </div>
                  <p>Your request has been recorded locally.</p>
                </div>
              </div>

              <div className={isAssigned || isPending ? styles.timelineLineActive : styles.timelineLine} />

              {/* Step 2: Helper assigned */}
              <div className={styles.timelineItem}>
                <div
                  className={
                    isAssigned ? styles.timelineIconDone : isPending ? styles.timelineIconPending : styles.timelineIconUpcoming
                  }
                >
                  {isAssigned ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span className={styles.numDot}>2</span>
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.stepHeader}>
                    <strong>Helper assignment</strong>
                    <span className={styles.timestamp}>
                      {isAssigned ? '10:22 AM' : isPending ? 'Invitation sent' : 'Open'}
                    </span>
                  </div>
                  <p>
                    {isAssigned
                      ? 'Aarav Sharma has accepted responsibility.'
                      : isPending
                      ? 'Invitation sent to Aarav Sharma. Awaiting acceptance.'
                      : 'Open request. Awaiting volunteer invitation.'}
                  </p>
                </div>
              </div>

              <div className={isPickedUp ? styles.timelineLineActive : styles.timelineLine} />

              {/* Step 3: Essentials picked up */}
              <div className={styles.timelineItem}>
                <div
                  className={
                    isPickedUp ? styles.timelineIconDone : styles.timelineIconUpcoming
                  }
                >
                  {isPickedUp ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span className={styles.numDot}>3</span>
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.stepHeader}>
                    <strong>Essentials collected</strong>
                    <span className={styles.timestamp}>
                      {isPickedUp ? '10:36 AM' : 'Upcoming'}
                    </span>
                  </div>
                  <p>
                    {isPickedUp
                      ? 'Aarav collected requested items from Indiranagar relief store.'
                      : 'Items will be collected from local store or distribution point.'}
                  </p>
                </div>
              </div>

              <div className={isDelivered ? styles.timelineLineActive : styles.timelineLine} />

              {/* Step 4: Delivery reported / On the way */}
              <div className={styles.timelineItem}>
                <div
                  className={
                    isDelivered ? styles.timelineIconDone : isPickedUp ? styles.timelineIconCurrent : styles.timelineIconUpcoming
                  }
                >
                  {isDelivered ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span className={styles.numDot}>4</span>
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.stepHeader}>
                    <strong>
                      {isDelivered ? 'Delivery reported' : 'On the way to deliver'}
                    </strong>
                    <span className={styles.timestamp}>
                      {isDelivered ? '10:54 AM' : isPickedUp ? 'Est. ~10:54 AM' : 'Upcoming'}
                    </span>
                  </div>
                  <p>
                    {isDelivered
                      ? 'Aarav has reported arrival. Awaiting recipient confirmation.'
                      : 'Aarav is heading to the designated neighbourhood.'}
                  </p>
                </div>
              </div>

              <div className={isCompleted ? styles.timelineLineActive : isProblem ? styles.timelineLineActive : styles.timelineLine} />

              {/* Step 5: Recipient confirmed */}
              <div className={styles.timelineItem}>
                <div
                  className={
                    isCompleted
                      ? styles.timelineIconDoneGreen
                      : isProblem
                      ? styles.timelineIconCurrent
                      : styles.timelineIconUpcoming
                  }
                  style={isProblem ? { backgroundColor: '#DC2626', color: '#fff' } : undefined}
                >
                  {isCompleted ? (
                    <Check size={14} strokeWidth={3} />
                  ) : isProblem ? (
                    <AlertCircle size={14} />
                  ) : (
                    <span className={styles.numDot}>5</span>
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.stepHeader}>
                    <strong>
                      {isProblem ? 'Delivery disputed' : 'Recipient confirmation'}
                    </strong>
                    <span className={styles.timestamp}>
                      {isCompleted ? '10:56 AM' : isProblem ? '10:58 AM' : 'Pending'}
                    </span>
                  </div>
                  <p>
                    {isCompleted
                      ? 'Safe receipt confirmed by recipient. A Promise Kept.'
                      : isProblem
                      ? 'Recipient reported items were not received. Coordination follow-up active.'
                      : 'Confirmation required from recipient to conclude task.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Helper Card & Context-Aware Actions */}
          <div className={styles.helperCol}>
            {/* If request is submitted and unassigned */}
            {isSubmitted && (
              <div className={styles.unassignedCard}>
                <div className={styles.unassignedHeader}>
                  <div className={styles.unassignedIconWrap}>
                    <Users size={22} />
                  </div>
                  <div>
                    <h4 className={styles.unassignedTitle}>Awaiting Helper Invitation</h4>
                    <p className={styles.unassignedDesc}>
                      This grocery assistance request has been submitted but no volunteer has been invited yet.
                      Explore nearby community volunteers on the live relief map to invite an available helper.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.browseHelpersBtn}
                  onClick={() => navigateTo('help_matched_discovery')}
                >
                  <Compass size={16} />
                  <span>Browse Available Volunteers on Map</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* Helper Profile Card (When helper is invited or assigned) */}
            {!isSubmitted && (
              <div className={styles.helperCard}>
                <div className={styles.helperTop}>
                  <div className={styles.helperAvatarWrap}>
                    <img
                      src={getAssetUrl('/images/contacts/aarav.png')}
                      alt="Aarav Sharma"
                      className={styles.helperAvatar}
                    />
                    <span className={styles.onlineDot} />
                  </div>

                  <div className={styles.helperMeta}>
                    <div className={styles.helperNameRow}>
                      <h4 className={styles.helperName}>Aarav Sharma</h4>
                      <span className={styles.verifiedTag}>
                        <Check size={11} strokeWidth={3} />
                        <span>Known Contact · My Circle</span>
                      </span>
                    </div>
                    <span className={styles.helperSub}>
                      Available Volunteer • Indiranagar, Bengaluru
                    </span>
                    <div className={styles.statusPillWrap}>
                      <span
                        className={
                          isCompleted
                            ? styles.statusComplete
                            : isProblem
                            ? styles.statusDelivered
                            : isDelivered
                            ? styles.statusDelivered
                            : isPickedUp
                            ? styles.statusOnWay
                            : isAssigned
                            ? styles.statusAssigned
                            : styles.statusAssigned
                        }
                      >
                        {isCompleted
                          ? '🟢 Completed & Confirmed'
                          : isProblem
                          ? '🔴 Disputed · Follow-up active'
                          : isDelivered
                          ? '🟠 Awaiting confirmation'
                          : isPickedUp
                          ? '🟢 On the way'
                          : isAssigned
                          ? '🟢 Responsibility accepted'
                          : '🟠 Invitation pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Helper Message Bubble */}
                {isAssigned && (
                  <div className={styles.quoteBubble}>
                    <p>
                      "I'll reach in about 18 minutes. I've collected your items from the relief point and am on my way! 😊"
                    </p>
                    <span className={styles.quoteTime}>10:36 AM</span>
                  </div>
                )}

                {/* Privacy Safeguard Notice when pending */}
                {isPending && (
                  <div className={styles.privacyNoticeBox}>
                    <Shield size={16} style={{ flexShrink: 0, color: '#F45124' }} />
                    <span>
                      Private building landmarks and recipient phone numbers remain withheld until Aarav accepts this assignment.
                    </span>
                  </div>
                )}

                {/* ETA Banner */}
                {!isCompleted && !isProblem && isPickedUp && (
                  <div className={styles.etaRow}>
                    <Clock size={16} />
                    <span>
                      Indicative window: <strong>~18 minutes</strong> (est. 10:54 AM)
                    </span>
                  </div>
                )}

                {/* Action Buttons for communication (Only active once assigned) */}
                {isAssigned && (
                  <div className={styles.commActionsRow}>
                    <a href="tel:+919876543210" className={styles.callBtn}>
                      <Phone size={16} />
                      <span>Call Aarav</span>
                    </a>
                    <button type="button" className={styles.chatBtn}>
                      <MessageSquare size={16} />
                      <span>Message on WhatsApp</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CONTEXT-AWARE ROLE ACTIONS */}
            {/* Mode 1: When Active User is Aarav (Helper view) */}
            {isAarav && !isSubmitted && (
              <div className={styles.helperControlCard}>
                <div className={styles.controlHeader}>
                  <UserCheck size={18} className={styles.controlIcon} />
                  <div>
                    <strong>Aarav's Volunteer Actions</strong>
                    <span>You are signed in as the assigned helper</span>
                  </div>
                </div>

                {isPending && (
                  <div className={styles.pendingInviteBox}>
                    <p>
                      <strong>Nisha needs grocery assistance in Indiranagar.</strong>
                      <br />
                      Items: Rice, toor dal, fresh vegetables, drinking water.
                    </p>
                    <div className={styles.inviteBtnRow}>
                      <button
                        type="button"
                        className={styles.acceptBtn}
                        onClick={() => acceptHelperInvitation(requestId, 'aarav')}
                      >
                        Accept responsibility
                      </button>
                      <button
                        type="button"
                        className={styles.declineBtn}
                        onClick={() => declineHelperInvitation(requestId, 'aarav')}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                )}

                {status === 'assigned' && (
                  <button
                    type="button"
                    className={styles.primaryProgressBtn}
                    onClick={() => advanceAssistanceProgress(requestId, 'picked_up')}
                  >
                    <span>Picked up the groceries →</span>
                  </button>
                )}

                {status === 'in_progress' && (
                  <button
                    type="button"
                    className={styles.primaryProgressBtn}
                    onClick={() => advanceAssistanceProgress(requestId, 'delivered')}
                  >
                    <span>I've delivered the groceries →</span>
                  </button>
                )}

                {status === 'delivered_pending_confirmation' && (
                  <div className={styles.waitingNotice}>
                    <Clock size={18} />
                    <div>
                      <strong>Delivery reported!</strong>
                      <p>
                        Awaiting Nisha's confirmation on her device. To test recipient confirmation,
                        switch to Nisha using the button below.
                      </p>
                      <button
                        type="button"
                        className={styles.switchAccountActionBtn}
                        onClick={() => switchAccount('nisha')}
                      >
                        <span>Switch to Nisha (Demo) to confirm</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mode 2: When Active User is Nisha or Requester */}
            {!isAarav && (
              <div className={styles.requesterControlCard}>
                <div className={styles.controlHeader}>
                  <Shield size={18} className={styles.controlIcon} />
                  <div>
                    <strong>Recipient Verification</strong>
                    <span>
                      {isNisha
                        ? "You are signed in as Nisha (Recipient)"
                        : 'Recipient view'}
                    </span>
                  </div>
                </div>

                {isPending && (
                  <div className={styles.waitingHelperNotice}>
                    <Clock size={16} />
                    <span>
                      Waiting for Aarav to accept. You can switch to Aarav or use evaluator shortcuts below.
                    </span>
                    <div className={styles.simBtnRow}>
                      <button
                        type="button"
                        className={styles.simActionBtn}
                        onClick={() => acceptHelperInvitation(requestId, 'aarav')}
                      >
                        ⚡ Simulate Aarav accepting (Demo)
                      </button>
                      <button
                        type="button"
                        className={styles.simActionBtn}
                        onClick={() => declineHelperInvitation(requestId, 'aarav')}
                      >
                        ⚡ Simulate Aarav declining (Demo)
                      </button>
                    </div>
                    <button
                      type="button"
                      className={styles.switchInlineBtn}
                      onClick={() => switchAccount('aarav')}
                    >
                      Switch to Aarav profile →
                    </button>
                  </div>
                )}

                {status === 'delivered_pending_confirmation' && (
                  <div className={styles.confirmReceiptBox}>
                    <h4 className={styles.confirmPromptTitle}>
                      Did your groceries arrive safely?
                    </h4>
                    <p className={styles.confirmPromptSub}>
                      Please confirm that Aarav delivered the requested food items and drinking water.
                    </p>

                    <div className={styles.confirmActionsRow}>
                      <button
                        type="button"
                        className={styles.confirmYesBtn}
                        onClick={() => confirmAssistanceDelivery(requestId, true)}
                      >
                        <Check size={16} strokeWidth={3} />
                        <span>Yes, I received my groceries</span>
                      </button>

                      <button
                        type="button"
                        className={styles.confirmNoBtn}
                        onClick={() => {
                          if (!showIssueInput) {
                            setShowIssueInput(true);
                          } else {
                            confirmAssistanceDelivery(requestId, false, issueText || 'Groceries were not received at the requested residence.');
                          }
                        }}
                      >
                        <AlertCircle size={15} />
                        <span>No, I have not received my groceries</span>
                      </button>
                    </div>

                    {showIssueInput && (
                      <div className={styles.issueInputBox}>
                        <textarea
                          value={issueText}
                          onChange={e => setIssueText(e.target.value)}
                          placeholder="Describe the issue (e.g., items not delivered, wrong location, missing essentials)..."
                          rows={2}
                          className={styles.issueTextarea}
                        />
                        <button
                          type="button"
                          className={styles.submitIssueBtn}
                          onClick={() =>
                            confirmAssistanceDelivery(
                              requestId,
                              false,
                              issueText || 'Recipient confirmed groceries were not received.'
                            )
                          }
                        >
                          Confirm &amp; report delivery problem
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Helper simulated shortcut if testing without manual switch */}
                {status === 'assigned' && (
                  <div className={styles.simulationHelperCard}>
                    <span>Evaluator shortcuts:</span>
                    <button
                      type="button"
                      className={styles.simBtn}
                      onClick={() => advanceAssistanceProgress(requestId, 'picked_up')}
                    >
                      ⚡ Advance to Picked Up
                    </button>
                    <button
                      type="button"
                      className={styles.simBtn}
                      onClick={() => {
                        advanceAssistanceProgress(requestId, 'picked_up');
                        setTimeout(() => advanceAssistanceProgress(requestId, 'delivered'), 300);
                      }}
                    >
                      ⚡ Advance to Delivered
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Column 3: Route Preview & Location Card */}
          <div className={styles.routeCol}>
            <div className={styles.routeCard}>
              <div className={styles.routeHeader}>
                <MapPin size={18} className={styles.routeIcon} />
                <div>
                  <strong>Status tracking &amp; location reference</strong>
                  <span>Indiranagar distribution sector</span>
                </div>
              </div>

              {/* Graphic Route Representation */}
              <div className={styles.routeVisual}>
                <div className={styles.routePoint}>
                  <div className={styles.storeIconWrap}>
                    <ShoppingBag size={16} />
                  </div>
                  <div>
                    <strong>More Supermarket / Relief Store</strong>
                    <span>Items picked up • 10:36 AM</span>
                  </div>
                </div>

                <div className={styles.routeDottedLine}>
                  <div className={styles.movingDot} />
                </div>

                <div className={styles.routePoint}>
                  <div className={styles.homeIconWrap}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <strong>Nisha's Residence</strong>
                    <span>
                      {isCompleted
                        ? 'Confirmed complete • 10:56 AM'
                        : isProblem
                        ? 'Disputed • Follow-up active'
                        : isDelivered
                        ? 'Delivered • 10:54 AM'
                        : 'Estimated window ~10:54 AM (Indicative)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.safetyBox}>
                <Shield size={16} />
                <span>
                  Exact apartment details and contact numbers are withheld until a helper accepts assignment. Stored locally in your browser demonstration.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPLETION EXPERIENCE: A Promise Kept Banner (ONLY when confirmed complete, NEVER in problem state) */}
        {isCompleted && (
          <div className={styles.promiseKeptBanner}>
            <div className={styles.bannerLeft}>
              <div className={styles.checkGreenLarge}>
                <Check size={28} strokeWidth={3} />
              </div>
              <div>
                <h3 className={styles.promiseTitle}>A promise kept.</h3>
                <p className={styles.promiseSub}>
                  {req?.recipientName || 'Nisha Rao'} has confirmed receipt of the items with thanks.
                </p>
                <blockquote className={styles.quotePraise}>
                  “Thank you so much! This really helps our family after all the disruption.”
                </blockquote>
              </div>
            </div>

            <div className={styles.bannerRight}>
              <div className={styles.recognitionPill}>
                <CheckCircle size={16} />
                <span>Received with thanks • 10:56 AM</span>
              </div>
              <img
                src={getAssetUrl('/images/contacts/nisha.png')}
                alt="Nisha Rao"
                className={styles.recipientAvatar}
              />
            </div>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className={styles.bottomActions}>
          <div className={styles.bottomLeft}>
            <h4 className={styles.bottomPrompt}>Need anything else?</h4>
            <p>UJAAS is here for you. You can request more help or explore your circle network.</p>
          </div>

          <div className={styles.bottomButtons}>
            <button
              type="button"
              className={styles.requestAnotherBtn}
              onClick={() => navigateTo('help_category_select')}
            >
              <ShoppingBag size={16} />
              <span>Request another item</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              className={styles.secondaryNavBtn}
              onClick={() => navigateTo('help_matched_discovery')}
            >
              <span>View local resources</span>
            </button>

            <button
              type="button"
              className={styles.secondaryNavBtn}
              onClick={() => navigateTo('my_circle')}
            >
              <span>Return to My Circle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};