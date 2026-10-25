import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, OnboardingDraft } from '../types/account';
import { SEEDED_AARAV_PROFILE, SEEDED_NISHA_PROFILE, DEFAULT_ONBOARDING_DRAFT } from '../data/seedAccounts';

const ACCOUNTS_STORAGE_KEY = 'ujaas_accounts_v1';
const ACTIVE_ACCOUNT_STORAGE_KEY = 'ujaas_active_account_id_v1';
const DRAFT_STORAGE_KEY = 'ujaas_onboarding_draft_v1';

interface AccountContextValue {
  accounts: UserProfile[];
  activeAccountId: string | null;
  activeUser: UserProfile | null;
  isAuthenticated: boolean;
  isAarav: boolean;
  isNisha: boolean;
  onboardingDraft: OnboardingDraft;
  
  // Actions
  switchAccount: (id: string) => void;
  createAccount: (profile: UserProfile) => void;
  updateAccount: (updates: Partial<UserProfile>) => void;
  deleteCustomAccount: (id: string) => void;
  signOut: () => void;
  updateDraft: (updates: Partial<OnboardingDraft>) => void;
  resetDraft: () => void;
  populateDraftWithAarav: () => void;
}

const AccountContext = createContext<AccountContextValue | null>(null);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Load accounts from localStorage (always ensuring Aarav is present)
  const [accounts, setAccounts] = useState<UserProfile[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        if (saved) {
          const parsed: UserProfile[] = JSON.parse(saved);
          let base = [...parsed];
          if (!base.some(a => a.id === 'aarav')) {
            base.unshift(SEEDED_AARAV_PROFILE);
          }
          if (!base.some(a => a.id === 'nisha')) {
            base.push(SEEDED_NISHA_PROFILE);
          }
          return base;
        }
      } catch (err) {
        console.warn('Failed to load accounts from storage:', err);
      }
    }
    return [SEEDED_AARAV_PROFILE, SEEDED_NISHA_PROFILE];
  });

  // 2. Active Account ID (defaults to 'aarav' for demo continuity, or null if user logged out)
  const [activeAccountId, setActiveAccountId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY);
        if (saved !== null) {
          if (saved === 'null' || saved === '') return null;
          return saved;
        }
      } catch (err) {
        console.warn('Failed to load active account ID:', err);
      }
    }
    return 'aarav';
  });

  // 3. Onboarding draft
  const [onboardingDraft, setOnboardingDraft] = useState<OnboardingDraft>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_ONBOARDING_DRAFT, ...JSON.parse(saved) };
        }
      } catch (err) {
        console.warn('Failed to load onboarding draft:', err);
      }
    }
    return DEFAULT_ONBOARDING_DRAFT;
  });

  // Persist accounts
  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch (err) {
      console.warn('Failed to save accounts to storage:', err);
    }
  }, [accounts]);

  // Persist active account ID
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_ACCOUNT_STORAGE_KEY, activeAccountId ?? 'null');
    } catch (err) {
      console.warn('Failed to save active account ID:', err);
    }
  }, [activeAccountId]);

  // Persist draft
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(onboardingDraft));
    } catch (err) {
      console.warn('Failed to save draft to storage:', err);
    }
  }, [onboardingDraft]);

  const activeUser = accounts.find(a => a.id === activeAccountId) || null;
  const isAuthenticated = activeAccountId !== null && activeUser !== null;
  const isAarav = activeAccountId === 'aarav';
  const isNisha = activeAccountId === 'nisha';

  const switchAccount = (id: string) => {
    const target = accounts.find(a => a.id === id);
    if (target) {
      setActiveAccountId(target.id);
    }
  };

  const createAccount = (profile: UserProfile) => {
    setAccounts(prev => {
      const filtered = prev.filter(a => a.id !== profile.id);
      return [...filtered, profile];
    });
    setActiveAccountId(profile.id);
  };

  const updateAccount = (updates: Partial<UserProfile>) => {
    if (!activeAccountId) return;
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === activeAccountId) {
          return {
            ...acc,
            ...updates,
            updatedAt: new Date().toISOString()
          };
        }
        return acc;
      })
    );
  };

  const deleteCustomAccount = (id: string) => {
    if (id === 'aarav') return; // Cannot delete seeded Aarav
    setAccounts(prev => prev.filter(a => a.id !== id));
    if (activeAccountId === id) {
      setActiveAccountId('aarav');
    }
  };

  const signOut = () => {
    setActiveAccountId(null);
  };

  const updateDraft = (updates: Partial<OnboardingDraft>) => {
    setOnboardingDraft(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetDraft = () => {
    setOnboardingDraft(DEFAULT_ONBOARDING_DRAFT);
  };

  const populateDraftWithAarav = () => {
    setOnboardingDraft({
      intent: 'want_to_help',
      language: 'en',
      communicationPreference: 'whatsapp',
      firstName: 'Aarav',
      lastName: 'Sharma',
      phone: '+91 98765 43210',
      email: 'aarav.sharma@example.com',
      otpCode: '246810',
      isOtpVerified: true,
      city: 'Bengaluru',
      neighbourhood: 'Indiranagar',
      coordinates: { lat: 12.9716, lng: 77.6412 },
      helperCapabilities: ['groceries_essentials', 'welfare_check_ins', 'calls_coordination'],
      helperAvailability: 'available_now',
      preferredRadiusKm: 3,
      travelModes: ['two_wheeler', 'walking'],
      supportNeeds: ['food_water'],
      supportUrgency: 'as_soon_as_possible',
      supportBeneficiary: 'for_myself',
      concernSubjectName: 'Savitri Amma',
      concernSubjectRelationship: 'My grandmother',
      concernObservations: ['caregiver_check_in_missed'],
      trustedContactIds: ['savitri', 'priya', 'vikram', 'meera', 'rohan', 'neha'],
      currentStep: 1,
      helperSubStep: 'capabilities'
    });
  };

  return (
    <AccountContext.Provider
      value={{
        accounts,
        activeAccountId,
        activeUser,
        isAuthenticated,
        isAarav,
        isNisha,
        onboardingDraft,
        switchAccount,
        createAccount,
        updateAccount,
        deleteCustomAccount,
        signOut,
        updateDraft,
        resetDraft,
        populateDraftWithAarav
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
};
