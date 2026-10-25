import React, { useState, useEffect } from 'react';
import { CareProvider, useCareContext } from './context/CareContext';
import { AccountProvider, useAccountContext } from './context/AccountContext';
import { BrandedLoader } from './components/BrandedLoader';
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { InvisibleImpactSection } from './components/InvisibleImpact/InvisibleImpactSection';
import { LivingCircleSection } from './components/LivingCircle/LivingCircleSection';
import { MyCircleView } from './components/MyCircle/MyCircleView';
import { CareConcernView } from './components/CareConcern/CareConcernView';
import { CheckInView } from './components/CheckIn/CheckInView';
import { CheckInResultView } from './components/CheckIn/CheckInResultView';
import { CareChainView } from './components/CareChain/CareChainView';
import { GroceryTaskDetailsView } from './components/CareChain/GroceryTaskDetailsView';
import { FindHelperMapView } from './components/CareChain/FindHelperMapView';
import { TaskProgressView } from './components/CareChain/TaskProgressView';
import { RecognitionView } from './components/Recognition/RecognitionView';

// Phase 03 Account & Onboarding Views
import { AccountAccessView } from './components/Account/AccountAccessView';
import { OnboardingView } from './components/Onboarding/OnboardingView';
import { UserProfileView } from './components/Account/UserProfileView';
import { MyActivityView } from './components/Account/MyActivityView';
import { EmergencyView } from './components/Emergency/EmergencyView';

// Consolidated Offer Help & Resources Views
import { OfferHelpView } from './components/OfferHelp/OfferHelpView';
import { ResourcesView } from './components/Resources/ResourcesView';

// Phase 04 Help Now Views
import { HelpNowLanding } from './components/HelpNow/HelpNowLanding';
import { HelpCategorySelector } from './components/HelpNow/HelpCategorySelector';
import { HelpRequestForm } from './components/HelpNow/HelpRequestForm';
import { HelpRequestReview } from './components/HelpNow/HelpRequestReview';
import { NearbyHelpMap } from './components/HelpNow/NearbyHelpMap';
import { HelpRequestTracker } from './components/HelpNow/HelpRequestTracker';
import { SafeguardingView } from './components/HelpNow/SafeguardingView';
import { AssistedReportView } from './components/HelpNow/AssistedReportView';
import { HelpNowDemoControls } from './components/HelpNow/HelpNowDemoControls';

// Phase 05 Child Safe Views & Controls
import { ChildSafeEntryView } from './components/ChildSafe/ChildSafeEntryView';
import { ChildSafeObservationForm } from './components/ChildSafe/ChildSafeObservationForm';
import { ChildSafeReviewView } from './components/ChildSafe/ChildSafeReviewView';
import { ChildSafeRecordedView } from './components/ChildSafe/ChildSafeRecordedView';
import { ChildSafeCoordinatorView } from './components/ChildSafe/ChildSafeCoordinatorView';
import { ChildSafeStatusFollowUpView } from './components/ChildSafe/ChildSafeStatusFollowUpView';
import { ChildSafeDemoControls } from './components/ChildSafe/ChildSafeDemoControls';

// Modals
import { CommitmentModal } from './components/CareChain/CommitmentModal';
import { RecipientConfirmationModal } from './components/CareChain/RecipientConfirmationModal';
import { FindAnotherHelperModal } from './components/Modals/FindAnotherHelperModal';
import { AlternativeContactModal } from './components/Modals/AlternativeContactModal';
import { MemoryModal } from './components/MemoryModal';
import { IntentSelectionPanel } from './components/IntentSelectionPanel';
import { PrototypeModal } from './components/PrototypeModal';
import { IntentType, MemoryCardData } from './types';

const AppContent: React.FC = () => {
  const { currentView, navigateTo, goBack } = useCareContext();
  const { isAuthenticated, updateDraft, switchAccount } = useAccountContext();

  const [selectedIntent, setSelectedIntent] = useState<IntentType>(null);
  const [activeMemoryCard, setActiveMemoryCard] = useState<MemoryCardData | null>(null);
  const [activeProtoModal, setActiveProtoModal] = useState<{ label: string; description: string } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  // Monitor prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const listener = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    if (mq.addEventListener) {
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    } else {
      mq.addListener(listener);
      return () => mq.removeListener(listener);
    }
  }, []);

  const handleSelectIntent = (intent: IntentType) => {
    if (intent === 'can-help') {
      if (isAuthenticated) {
        navigateTo('offer_help');
      } else {
        updateDraft({ intent: 'want_to_help' });
        navigateTo('onboarding');
      }
    } else if (intent === 'need-help') {
      updateDraft({ intent: 'need_help' });
      navigateTo('help_now_landing');
    } else if (intent === 'get-involved') {
      navigateTo('onboarding');
    } else {
      setSelectedIntent(intent);
    }
  };

  return (
    <div className="app-root">
      {/* Branded Loading Experience on full-page reloads */}
      <BrandedLoader
        onComplete={() => setLoaderDone(true)}
        reducedMotion={reducedMotion}
      />

      {/* Integrated Navigation Header with Account Dropdown */}
      <SiteHeader
        onSelectIntent={handleSelectIntent}
        onOpenPrototypeModal={(item) => setActiveProtoModal(item)}
        onGoHome={() => navigateTo('hero')}
      />

      {/* Main Dynamic View Router */}
      <main id="main-content">
        {currentView === 'hero' && (
          <>
            <HeroSection
              onSelectIntent={handleSelectIntent}
              onCardClick={(card) => setActiveMemoryCard(card)}
              reducedMotion={reducedMotion}
              isReady={loaderDone || true}
            />
            <InvisibleImpactSection reducedMotion={reducedMotion} />
            <LivingCircleSection reducedMotion={reducedMotion} />
          </>
        )}

        {/* Phase 03 Account & Onboarding Views */}
        {currentView === 'account_access' && (
          <AccountAccessView
            onStartOnboarding={() => navigateTo('onboarding')}
            onContinueAsAarav={() => {
              switchAccount('aarav');
              navigateTo('my_circle');
            }}
            onEmergencyClick={() => navigateTo('emergency_info')}
            onGoHome={() => navigateTo('hero')}
          />
        )}

        {currentView === 'onboarding' && (
          <OnboardingView
            onFinish={() => navigateTo('my_circle')}
            onEmergencyClick={() => navigateTo('emergency_info')}
            onGoHome={() => navigateTo('hero')}
          />
        )}

        {currentView === 'user_profile' && <UserProfileView />}
        {currentView === 'my_activity' && <MyActivityView />}

        {currentView === 'emergency_info' && (
          <EmergencyView onBack={() => goBack()} />
        )}

        {/* Phase 5.5 Consolidated Pillars */}
        {currentView === 'offer_help' && <OfferHelpView />}
        {currentView === 'resources' && <ResourcesView />}

        {/* Phase 02 Care Workflow Views */}
        {currentView === 'my_circle' && <MyCircleView />}
        {currentView === 'care_concern' && <CareConcernView />}
        {currentView === 'check_in' && <CheckInView />}
        {currentView === 'check_in_result' && <CheckInResultView />}
        {currentView === 'care_chain' && <CareChainView />}
        {currentView === 'task_details' && <GroceryTaskDetailsView />}
        {currentView === 'find_helper' && <FindHelperMapView />}
        {currentView === 'task_progress' && <TaskProgressView />}
        {currentView === 'recognition' && <RecognitionView />}

        {/* Phase 04 Help Now Views */}
        {currentView === 'help_now_landing' && <HelpNowLanding />}
        {currentView === 'help_category_select' && <HelpCategorySelector />}
        {currentView === 'help_request_form' && <HelpRequestForm />}
        {currentView === 'help_request_review' && <HelpRequestReview />}
        {currentView === 'help_matched_discovery' && <NearbyHelpMap />}
        {currentView === 'help_request_tracker' && <HelpRequestTracker />}
        {currentView === 'help_safeguard_concern' && <SafeguardingView />}
        {currentView === 'help_assisted_report' && <AssistedReportView />}

        {/* Phase 05 Child Safe Views */}
        {currentView === 'child_safe_entry' && <ChildSafeEntryView />}
        {currentView === 'child_safe_observation' && <ChildSafeObservationForm />}
        {currentView === 'child_safe_review' && <ChildSafeReviewView />}
        {currentView === 'child_safe_recorded' && <ChildSafeRecordedView />}
        {currentView === 'child_safe_coordinator' && <ChildSafeCoordinatorView />}
        {currentView === 'child_safe_status' && <ChildSafeStatusFollowUpView />}
      </main>

      {/* Floating Demo Evaluator Utilities */}
      <ChildSafeDemoControls />
      <HelpNowDemoControls />

      {/* Phase 02 Global Modals */}
      <CommitmentModal />
      <RecipientConfirmationModal />
      <FindAnotherHelperModal />
      <AlternativeContactModal />

      {/* Phase 01 Memory & Prototype Modals */}
      <MemoryModal
        card={activeMemoryCard}
        onClose={() => setActiveMemoryCard(null)}
        onActOnIntent={() => handleSelectIntent('can-help')}
      />

      <IntentSelectionPanel
        intent={selectedIntent}
        onClose={() => setSelectedIntent(null)}
        onSwitchIntent={(intent) => handleSelectIntent(intent)}
      />

      <PrototypeModal
        item={activeProtoModal}
        onClose={() => setActiveProtoModal(null)}
        onSelectAction={(action) => handleSelectIntent(action)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AccountProvider>
      <CareProvider>
        <AppContent />
      </CareProvider>
    </AccountProvider>
  );
};

export default App;
