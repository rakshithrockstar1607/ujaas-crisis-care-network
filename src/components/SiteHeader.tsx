import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ChevronDown,
  RotateCcw,
  Users,
  CheckSquare,
  Menu,
  X,
  ArrowUpRight,
  User,
  RefreshCw,
  LogOut,
  Phone,
  Settings,
  Info
} from 'lucide-react';
import { NAV_ITEMS, HERO_CONTENT, ABOUT_INFO } from '../data/content';
import { NavItem, IntentType } from '../types';
import { useCareContext } from '../context/CareContext';
import { useAccountContext } from '../context/AccountContext';
import { AccountSwitcherModal } from './Account/AccountSwitcherModal';
import { getAssetUrl } from '../utils/assets';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  onSelectIntent: (intent: IntentType) => void;
  onOpenPrototypeModal: (item: NavItem | { label: string; description: string }) => void;
  onGoHome?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  onSelectIntent,
  onOpenPrototypeModal,
  onGoHome
}) => {
  const { currentView, navigateTo, resetDemo } = useCareContext();
  const { activeUser, isAuthenticated, isAarav, signOut } = useAccountContext();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    if (item.id === 'find-help') {
      navigateTo('help_now_landing');
    } else if (item.id === 'offer-help') {
      navigateTo('offer_help');
    } else if (item.id === 'my-circle') {
      navigateTo('my_circle');
    } else if (item.id === 'resources') {
      navigateTo('resources');
    } else {
      onOpenPrototypeModal(item);
    }
    setMobileMenuOpen(false);
  };

  const isNavActive = (itemId: string) => {
    if (itemId === 'find-help') {
      return (
        currentView.startsWith('help_') ||
        currentView.startsWith('child_safe_') ||
        currentView === 'emergency_info'
      );
    }
    if (itemId === 'offer-help') {
      return currentView === 'offer_help';
    }
    if (itemId === 'my-circle') {
      return (
        currentView === 'my_circle' ||
        currentView === 'care_concern' ||
        currentView === 'check_in' ||
        currentView === 'check_in_result' ||
        currentView === 'care_chain' ||
        currentView === 'task_details' ||
        currentView === 'task_progress' ||
        currentView === 'recognition' ||
        currentView === 'find_helper'
      );
    }
    if (itemId === 'resources') {
      return currentView === 'resources';
    }
    return false;
  };

  const handleGetInvolved = () => {
    onSelectIntent('get-involved');
    setMobileMenuOpen(false);
  };

  const handleDropdownNavigate = (view: 'my_circle' | 'care_chain' | 'user_profile') => {
    navigateTo(view);
    setAccountOpen(false);
  };

  const handleOpenSwitcher = () => {
    setAccountOpen(false);
    setShowAccountSwitcher(true);
  };

  const handleSignOut = () => {
    setAccountOpen(false);
    signOut();
    navigateTo('account_access');
  };

  const handleExecuteReset = () => {
    resetDemo();
    setShowResetConfirm(false);
    setAccountOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
        {/* Subtle National Tricolour Accent Line */}
        <div className={styles.tricolorBar} aria-hidden="true" />

        <div className={styles.inner}>
          {/* Brand Logo & Wordmark */}
          <a
            href="/"
            className={styles.brand}
            aria-label="UJAAS - Return to homepage"
            onClick={(e) => {
              if (onGoHome) {
                e.preventDefault();
                onGoHome();
              }
            }}
          >
            <picture className={styles.logoPicture}>
              <source srcSet={getAssetUrl('/images/logo-emblem.webp')} type="image/webp" />
              <img
                src={getAssetUrl('/images/logo-emblem.png')}
                alt="UJAAS flame emblem symbolizing human care and renewal"
                className={styles.logoEmblem}
                width={38}
                height={48}
              />
            </picture>
            <div className={styles.brandText}>
              <span className={styles.wordmark}>UJAAS</span>
              <span className={styles.brandSub}>CRISIS CARE NETWORK</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className={styles.nav} aria-label="Primary site navigation">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => {
                const isActive = isNavActive(item.id);
                return (
                  <li key={item.id} className={styles.navItem}>
                    <a
                      href={item.href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                      onClick={(e) => handleNavClick(e, item)}
                    >
                      <span>{item.label}</span>
                      <span className={styles.navIndicator} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Right Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Search crisis resources and local aid"
              onClick={() =>
                onOpenPrototypeModal({
                  label: 'Search Aid Directory',
                  description: 'Search for active community kitchens, medical points, and caregiver posts.'
                })
              }
            >
              <Search size={18} strokeWidth={2.2} />
            </button>

            {/* India-First Civic Concept Badge */}
            <div className={styles.civicBadge} title="Simulated humanitarian scenario in post-Snap India">
              <span className={styles.flagIcon} aria-hidden="true">🇮🇳</span>
              <span>An India-first civic care concept</span>
            </div>

            {/* Conditional: Signed-in User Pill vs Signed-out Visitors */}
            {isAuthenticated && activeUser ? (
              <div className={styles.accountWrap} ref={accountRef}>
                <button
                  type="button"
                  className={styles.accountPill}
                  onClick={() => setAccountOpen(!accountOpen)}
                  aria-expanded={accountOpen}
                  aria-label="User account and demonstration settings"
                >
                  <img
                    src={getAssetUrl(activeUser.avatar || '/images/contacts/aarav.png')}
                    alt={activeUser.firstName}
                    className={styles.accountAvatar}
                  />
                  <span className={styles.accountName}>{activeUser.firstName}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevronIcon} ${accountOpen ? styles.chevronIconRotated : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {accountOpen && (
                  <div className={styles.accountDropdown} role="menu">
                    <div className={styles.accountHeader}>
                      <img
                        src={getAssetUrl(activeUser.avatar || '/images/contacts/aarav.png')}
                        alt={activeUser.firstName}
                        className={styles.accountAvatarLarge}
                      />
                      <div className={styles.accountDetails}>
                        <span className={styles.accountTitle}>
                          {activeUser.firstName} {activeUser.lastName}
                        </span>
                        <span className={styles.accountRole}>
                          {isAarav ? 'Grandson · Volunteer' : activeUser.primaryIntent === 'want_to_help' ? 'Volunteer · Helper' : activeUser.primaryIntent === 'need_help' ? 'Seeking support' : 'Concern reporter'}
                        </span>
                        <span className={styles.demoTag}>
                          {isAarav ? 'Main demo account' : 'Custom demo profile'}
                        </span>
                      </div>
                    </div>

                    <div className={styles.statusRow}>
                      <span className={styles.statusDot} />
                      <span>Active in {activeUser.neighbourhood || 'Indiranagar'}, {activeUser.city || 'Bengaluru'}</span>
                    </div>

                    <ul className={styles.dropdownNav}>
                      <li>
                        <button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => handleDropdownNavigate('user_profile')}
                        >
                          <User size={16} />
                          <span>My Profile</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => {
                            setAccountOpen(false);
                            navigateTo('my_activity');
                          }}
                        >
                          <CheckSquare size={16} />
                          <span>My Activity</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => handleDropdownNavigate('my_circle')}
                        >
                          <Users size={16} />
                          <span>My Circle</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => {
                            setAccountOpen(false);
                            navigateTo('offer_help');
                          }}
                        >
                          <Settings size={16} />
                          <span>Availability & Preferences</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={handleOpenSwitcher}
                        >
                          <RefreshCw size={16} />
                          <span>Switch Account</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => {
                            setAccountOpen(false);
                            onOpenPrototypeModal({
                              label: ABOUT_INFO.title,
                              description: ABOUT_INFO.description
                            });
                          }}
                        >
                          <Info size={16} />
                          <span>About This Prototype</span>
                        </button>
                      </li>
                    </ul>

                    <div className={styles.civicNote}>
                      <div className={styles.civicNoteTitle}>UJAAS · Crisis Care Network</div>
                      <div className={styles.civicNoteText}>
                        Interactive demonstration · Day 1 after the Snap, 2018. Community-led support network.
                      </div>
                    </div>

                    <div className={styles.dropdownActions}>
                      <button
                        type="button"
                        className={styles.resetDemoBtn}
                        onClick={() => setShowResetConfirm(true)}
                      >
                        <RotateCcw size={14} />
                        <span>Reset scenario state</span>
                      </button>

                      <button
                        type="button"
                        className={styles.signOutBtn}
                        onClick={handleSignOut}
                      >
                        <LogOut size={14} />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.signedOutGroup}>
                <button
                  type="button"
                  className={styles.emergencyPillBtn}
                  onClick={() => navigateTo('emergency_info')}
                >
                  <Phone size={14} />
                  <span>Emergency Info</span>
                </button>

                <button
                  type="button"
                  className={styles.signInBtn}
                  onClick={() => navigateTo('account_access')}
                >
                  <User size={15} />
                  <span>Sign In</span>
                </button>
              </div>
            )}

            {/* Primary CTA */}
            <button
              type="button"
              className={styles.getInvolvedBtn}
              onClick={handleGetInvolved}
            >
              <span>{HERO_CONTENT.ctas.nav}</span>
              <ArrowUpRight size={16} strokeWidth={2.5} className={styles.btnArrow} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.mobileToggle}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
            <div className={styles.confirmModal}>
              <h3 className={styles.confirmTitle}>Restart UJAAS Demonstration?</h3>
              <p className={styles.confirmText}>
                This will restore all relationship contacts, check-ins, tasks, and volunteer commitments back to the initial post-Snap Day 1 scenario. Saved user profiles are preserved.
              </p>
              <div className={styles.confirmActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.confirmResetBtn}
                  onClick={handleExecuteReset}
                >
                  Reset Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className={styles.mobileDrawer} role="dialog" aria-modal="true">
            <div className={styles.mobileDrawerInner}>
              <div className={styles.mobileMetaNotice}>
                {HERO_CONTENT.statusNotice}
              </div>
              <ul className={styles.mobileNavList}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.id} className={styles.mobileNavItem}>
                    <a
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={(e) => handleNavClick(e, item)}
                    >
                      <div>
                        <div className={styles.mobileNavTitle}>{item.label}</div>
                        <div className={styles.mobileNavDesc}>{item.description}</div>
                      </div>
                      <ArrowUpRight size={18} />
                    </a>
                  </li>
                ))}
              </ul>

              <div className={styles.mobileActions}>
                <button
                  type="button"
                  className={styles.mobilePrimaryBtn}
                  onClick={handleGetInvolved}
                >
                  <span>{HERO_CONTENT.ctas.nav}</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Account Switcher Modal */}
      <AccountSwitcherModal
        isOpen={showAccountSwitcher}
        onClose={() => setShowAccountSwitcher(false)}
        onCreateNewProfile={() => {
          setShowAccountSwitcher(false);
          navigateTo('onboarding');
        }}
      />
    </>
  );
};
