import React from 'react';
import { useCareContext } from '../../context/CareContext';
import { LivingCircleConstellation } from './LivingCircleConstellation';
import { getAssetUrl } from '../../utils/assets';
import {
  ChevronRight,
  AlertCircle,
  ShoppingBag,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  Heart,
  HandHeart,
  ShieldCheck,
  Check,
  Lock,
  ArrowRight
} from 'lucide-react';
import styles from './ScenarioPreviews.module.css';

interface ScenarioPreviewsProps {
  scenarioId: 'circle' | 'help_now' | 'offer_help' | 'child_safe';
  reducedMotion?: boolean;
}

export const ScenarioPreviews: React.FC<ScenarioPreviewsProps> = ({
  scenarioId,
  reducedMotion = false
}) => {
  const { navigateTo } = useCareContext();

  // SCENARIO 01: Someone I know (Living Circle Default)
  if (scenarioId === 'circle') {
    return (
      <div className={styles.previewContainer}>
        {/* Ivory Application Card Header */}
        <div className={styles.previewHeader}>
          <div className={styles.subjectMeta}>
            <div className={styles.subjectAvatarFrame}>
              <img
                src={getAssetUrl('/images/savitri_portrait_clean.webp')}
                alt="Savitri Amma"
                className={styles.subjectAvatarImg}
              />
            </div>
            <div>
              <div className={styles.subjectTitleRow}>
                <h3 className={styles.subjectName}>Savitri Amma</h3>
                <span className={styles.subjectStatusBadge}>In Aarav's Circle</span>
              </div>
              <p className={styles.subjectLocation}>Indiranagar, Bengaluru • 78 years</p>
            </div>
          </div>

          <button
            type="button"
            className={styles.viewProfileBtn}
            onClick={() => navigateTo('my_circle')}
            aria-label="View full profile of Savitri Amma"
          >
            <span>View Full Profile</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Center Grid: Constellation (60%) + Recent Activity (40%) */}
        <div className={styles.previewBodyGrid}>
          <div className={styles.constellationCol}>
            <LivingCircleConstellation reducedMotion={reducedMotion} />
          </div>

          {/* Recent Activity Panel */}
          <div className={styles.activityCol}>
            <div className={styles.activityPanel}>
              <h4 className={styles.activityHeading}>Recent Activity</h4>
              <div className={styles.activityList}>
                {/* Item 1: Amber Alert */}
                <div className={`${styles.activityItem} ${styles.itemAmber}`}>
                  <div className={`${styles.itemIconBox} ${styles.iconBoxAmber}`}>
                    <AlertCircle size={16} />
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemTitleRow}>
                      <span className={styles.itemTitle}>Morning check-in missing</span>
                      <span className={styles.itemBadgeAmber}>Needs Review</span>
                    </div>
                    <p className={styles.itemDetail}>Indiranagar • Due at 8:30 AM</p>
                  </div>
                </div>

                {/* Item 2: Blue Pending */}
                <div className={`${styles.activityItem} ${styles.itemBlue}`}>
                  <div className={`${styles.itemIconBox} ${styles.iconBoxBlue}`}>
                    <ShoppingBag size={16} />
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemTitleRow}>
                      <span className={styles.itemTitle}>Grocery assistance</span>
                      <span className={styles.itemBadgeBlue}>Assigned</span>
                    </div>
                    <p className={styles.itemDetail}>Aarav assigned to ration pickup</p>
                  </div>
                </div>

                {/* Item 3: Green Completed */}
                <div className={`${styles.activityItem} ${styles.itemGreen}`}>
                  <div className={`${styles.itemIconBox} ${styles.iconBoxGreen}`}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemTitleRow}>
                      <span className={styles.itemTitle}>Medicine delivery</span>
                      <span className={styles.itemBadgeGreen}>Confirmed</span>
                    </div>
                    <p className={styles.itemDetail}>Vikram reported handoff complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Contextual Care Concern Strip */}
        <div className={styles.concernStrip}>
          <div className={styles.concernLeft}>
            <div className={styles.concernIconBox}>
              <AlertCircle size={18} color="#F45124" />
            </div>
            <div>
              <h4 className={styles.concernTitle}>
                Savitri Amma's usual morning check-in is missing.
              </h4>
              <p className={styles.concernText}>
                Aarav can find out what she needs and help keep her care going.
              </p>
            </div>
          </div>

          <button
            type="button"
            className={styles.concernCtaBtn}
            onClick={() => navigateTo('my_circle')}
          >
            <span>Explore My Circle</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // SCENARIO 02: I need assistance (Help Now Preview)
  if (scenarioId === 'help_now') {
    return (
      <div className={styles.previewContainer}>
        <div className={styles.previewHeader}>
          <div className={styles.subjectMeta}>
            <div className={`${styles.subjectAvatarFrame} ${styles.avatarFrameNavy}`}>
              <Heart size={24} color="#F45124" />
            </div>
            <div>
              <div className={styles.subjectTitleRow}>
                <h3 className={styles.subjectName}>Help Now • Active Request</h3>
                <span className={styles.subjectStatusBadgeGreen}>Matching Helpers</span>
              </div>
              <p className={styles.subjectLocation}>Indiranagar Sector 2 • 2 Helpers Nearby</p>
            </div>
          </div>

          <button
            type="button"
            className={styles.viewProfileBtn}
            onClick={() => navigateTo('help_now_landing')}
          >
            <span>View All Needs</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className={styles.scenarioCardBody}>
          <div className={styles.helpNowOverview}>
            <div className={styles.requesterCard}>
              <div className={styles.requesterHeader}>
                <div className={styles.requesterBadge}>Urgent Need</div>
                <span className={styles.requesterTime}>Requested 18 mins ago</span>
              </div>
              <h4 className={styles.requesterName}>Nisha Rao</h4>
              <p className={styles.requesterCategory}>
                <strong>Essentials:</strong> Food rations & drinking water containers (Family of 3)
              </p>

              {/* Progress Steps */}
              <div className={styles.progressSteps}>
                <div className={`${styles.step} ${styles.stepDone}`}>
                  <div className={styles.stepDot}><Check size={12} /></div>
                  <span>Submitted</span>
                </div>
                <div className={styles.stepLine} />
                <div className={`${styles.step} ${styles.stepDone}`}>
                  <div className={styles.stepDot}><Check size={12} /></div>
                  <span>Verified</span>
                </div>
                <div className={styles.stepLine} />
                <div className={`${styles.step} ${styles.stepActive}`}>
                  <div className={styles.stepDot}>3</div>
                  <span>Matching</span>
                </div>
              </div>
            </div>

            <div className={styles.helperDiscoverySnippet}>
              <div className={styles.snippetMap}>
                <div className={styles.snippetMapPin1}><MapPin size={18} color="#F45124" /></div>
                <div className={styles.snippetMapPin2}><MapPin size={16} color="#10B981" /></div>
                <div className={styles.snippetMapRadius} />
                <span className={styles.snippetMapLabel}>Radius: 2.5 km</span>
              </div>
              <div className={styles.snippetInfo}>
                <p className={styles.snippetHeading}>Nearby Volunteer Network</p>
                <p className={styles.snippetSub}>
                  2 verified community helpers within 15 minutes walk have been notified.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.concernStrip}>
          <div className={styles.concernLeft}>
            <div className={styles.concernIconBox}>
              <Heart size={18} color="#F45124" />
            </div>
            <div>
              <h4 className={styles.concernTitle}>Need assistance for your household?</h4>
              <p className={styles.concernText}>
                Submit an urgent request for food, medical support, or emergency transport.
              </p>
            </div>
          </div>

          <button
            type="button"
            className={styles.concernCtaBtn}
            onClick={() => navigateTo('help_now_landing')}
          >
            <span>Explore Help Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // SCENARIO 03: I want to help (Offer Help Preview)
  if (scenarioId === 'offer_help') {
    return (
      <div className={styles.previewContainer}>
        <div className={styles.previewHeader}>
          <div className={styles.subjectMeta}>
            <div className={`${styles.subjectAvatarFrame} ${styles.avatarFrameNavy}`}>
              <HandHeart size={24} color="#10B981" />
            </div>
            <div>
              <div className={styles.subjectTitleRow}>
                <h3 className={styles.subjectName}>Offer Help • Local Action</h3>
                <span className={styles.subjectStatusBadgeGreen}>Status: Available</span>
              </div>
              <p className={styles.subjectLocation}>Indiranagar & Domlur Radius • 3 Opportunities</p>
            </div>
          </div>

          <button
            type="button"
            className={styles.viewProfileBtn}
            onClick={() => navigateTo('offer_help')}
          >
            <span>Manage Tasks</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className={styles.scenarioCardBody}>
          <div className={styles.offerHelpList}>
            <div className={styles.opportunityItem}>
              <div className={styles.oppIcon}><ShoppingBag size={18} /></div>
              <div className={styles.oppInfo}>
                <span className={styles.oppTag}>Senior Grocery Delivery</span>
                <h5 className={styles.oppTitle}>Vegetables & essentials for elder</h5>
                <p className={styles.oppDist}>0.8 km • Indiranagar • Estimated ~25 mins</p>
              </div>
              <span className={styles.oppAffordance}>Review Need</span>
            </div>

            <div className={styles.opportunityItem}>
              <div className={styles.oppIcon}><Clock size={18} /></div>
              <div className={styles.oppInfo}>
                <span className={styles.oppTag}>Pharmacy Pickup</span>
                <h5 className={styles.oppTitle}>Insulin & blood pressure medicine</h5>
                <p className={styles.oppDist}>1.4 km • Domlur • Estimated ~30 mins</p>
              </div>
              <span className={styles.oppAffordance}>Review Need</span>
            </div>

            <div className={styles.opportunityItem}>
              <div className={styles.oppIcon}><MapPin size={18} /></div>
              <div className={styles.oppInfo}>
                <span className={styles.oppTag}>Water Container Assistance</span>
                <h5 className={styles.oppTitle}>Drinking water container transport</h5>
                <p className={styles.oppDist}>2.1 km • Ulsoor • Estimated ~40 mins</p>
              </div>
              <span className={styles.oppAffordance}>Review Need</span>
            </div>
          </div>
        </div>

        <div className={styles.concernStrip}>
          <div className={styles.concernLeft}>
            <div className={styles.concernIconBox}>
              <HandHeart size={18} color="#F45124" />
            </div>
            <div>
              <h4 className={styles.concernTitle}>Every small act strengthens someone's circle.</h4>
              <p className={styles.concernText}>
                Step in when a family caregiver disappears or a neighbor needs support.
              </p>
            </div>
          </div>

          <button
            type="button"
            className={styles.concernCtaBtn}
            onClick={() => navigateTo('offer_help')}
          >
            <span>Explore Offer Help</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // SCENARIO 04: Someone needs protection (Child Safe Preview)
  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <div className={styles.subjectMeta}>
          <div className={`${styles.subjectAvatarFrame} ${styles.avatarFrameNavy}`}>
            <ShieldCheck size={24} color="#F59E0B" />
          </div>
          <div>
            <div className={styles.subjectTitleRow}>
              <h3 className={styles.subjectName}>Child Safe • Restricted Safety</h3>
              <span className={styles.subjectStatusBadgeAmber}>Confidential Intake</span>
            </div>
            <p className={styles.subjectLocation}>Bengaluru Metropolitan Safeguarding Protocol</p>
          </div>
        </div>

        <button
          type="button"
          className={styles.viewProfileBtn}
          onClick={() => navigateTo('child_safe_entry')}
        >
          <span>Safety Guidelines</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className={styles.scenarioCardBody}>
        <div className={styles.childSafeOverview}>
          <div className={styles.childSafeProtocolBox}>
            <div className={styles.protocolHeader}>
              <div className={styles.lockBadge}>
                <Lock size={14} />
                <span>Encrypted Safeguarding Channel</span>
              </div>
              <span className={styles.protocolId}>Case #CS-2018-042</span>
            </div>

            <h4 className={styles.protocolTitle}>Unaccompanied Child Observation</h4>
            <p className={styles.protocolDesc}>
              Factual, sensitive observation intake for children found separated from their primary caregiver following community disruptions.
            </p>

            <div className={styles.safeguardGuarantees}>
              <div className={styles.guaranteeRow}>
                <Check size={16} color="#10B981" />
                <span>No public identifiable markers or map pins</span>
              </div>
              <div className={styles.guaranteeRow}>
                <Check size={16} color="#10B981" />
                <span>Restricted specialist review and professional intake</span>
              </div>
              <div className={styles.guaranteeRow}>
                <Check size={16} color="#10B981" />
                <span>Separated from ordinary volunteer tasks to prevent child endangerment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.concernStrip}>
        <div className={styles.concernLeft}>
          <div className={styles.concernIconBox}>
            <Shield size={18} color="#F45124" />
          </div>
          <div>
            <h4 className={styles.concernTitle}>Observed a child who may be without a caregiver?</h4>
            <p className={styles.concernText}>
              Record factual observations immediately through our protected safeguarding route.
            </p>
          </div>
        </div>

        <button
          type="button"
          className={styles.concernCtaBtn}
          onClick={() => navigateTo('child_safe_entry')}
        >
          <span>Explore Child Safe</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
