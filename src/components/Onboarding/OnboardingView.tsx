import React, { useState } from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { Step01WelcomeIntent } from './Step01WelcomeIntent';
import { Step02LanguageComms } from './Step02LanguageComms';
import { Step03BasicIdentity } from './Step03BasicIdentity';
import { Step04DemoOtp } from './Step04DemoOtp';
import { Step05Neighbourhood } from './Step05Neighbourhood';
import { Step06HelperCapabilities } from './Step06HelperCapabilities';
import { Step07HelperAvailability } from './Step07HelperAvailability';
import { Step08NeedsHelp } from './Step08NeedsHelp';
import { Step09ConcernPath } from './Step09ConcernPath';
import { Step10TrustedCircle } from './Step10TrustedCircle';
import { Step11ReviewWelcome } from './Step11ReviewWelcome';
import { useAccountContext } from '../../context/AccountContext';
import { useCareContext } from '../../context/CareContext';
import { UserProfile } from '../../types/account';
import { getAssetUrl } from '../../utils/assets';

interface OnboardingViewProps {
  onFinish?: () => void;
  onEmergencyClick: () => void;
  onGoHome: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onFinish,
  onEmergencyClick,
  onGoHome
}) => {
  const {
    onboardingDraft,
    updateDraft,
    createAccount,
    switchAccount,
    populateDraftWithAarav
  } = useAccountContext();
  const { navigateTo } = useCareContext();

  // Internal step states
  // 1: Intent
  // 2: Language
  // 3: Identity
  // 4: Verification (OTP)
  // 5: Location
  // 6: Preferences (branch A: capabilities, branch B: needs, branch C: concern)
  // 6.5: Availability (branch A availability)
  // 7: Trusted Circle
  // 8: Finish (Review & Welcome)
  const [step, setStep] = useState<number>(1);
  const [helperSubStep, setHelperSubStep] = useState<'capabilities' | 'availability'>('capabilities');

  // Dynamic quotes based on current step
  const getStepQuote = () => {
    switch (step) {
      case 1:
        return {
          heading: 'We still have each other.',
          sub: 'When everyday care disappears, we can help one another find it again.'
        };
      case 2:
        return {
          heading: 'Care speaks every language.',
          sub: 'Your preferences decide how we communicate, not what care you can receive.'
        };
      case 3:
        return {
          heading: 'A name. A connection.',
          sub: 'Trust begins with knowing how to reach one another, not collecting everything about you.'
        };
      case 4:
        return {
          heading: 'Trust is built in layers.',
          sub: 'Identity contact checks are only the beginning of responsible community coordination.'
        };
      case 5:
        return {
          heading: 'Help starts close to home.',
          sub: 'Your people and familiar neighbourhoods can be the first source of support.'
        };
      case 6:
        if (onboardingDraft.intent === 'want_to_help') {
          if (helperSubStep === 'capabilities') {
            return {
              heading: 'Everyone has something to offer.',
              sub: 'From a short phone call to a bag of groceries, small contributions carry real meaning.'
            };
          } else {
            return {
              heading: 'Availability is your choice.',
              sub: 'UJAAS should never pressure people to accept a task they cannot safely complete.'
            };
          }
        } else if (onboardingDraft.intent === 'need_help') {
          return {
            heading: 'Asking for care takes strength.',
            sub: 'Support is not a reward for being capable. Every person deserves a safe way to ask.'
          };
        } else {
          return {
            heading: 'Knowing someone changes everything.',
            sub: 'A missed check-in is a reason to ask, never proof of disappearance.'
          };
        }
      case 7:
        return {
          heading: 'A little closer together.',
          sub: 'The people around you can help you notice needs that might otherwise go unseen.'
        };
      case 8:
      default:
        return {
          heading: 'One promise at a time.',
          sub: 'When people are connected with care, small responsibilities become manageable together.'
        };
    }
  };

  const quote = getStepQuote();

  // Navigation handlers
  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    } else if (step === 5) {
      setStep(6);
      setHelperSubStep('capabilities');
    } else if (step === 6) {
      if (onboardingDraft.intent === 'want_to_help' && helperSubStep === 'capabilities') {
        setHelperSubStep('availability');
      } else {
        setStep(7);
      }
    } else if (step === 7) {
      setStep(8);
    } else if (step === 8) {
      handleFinalize();
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onGoHome();
    } else if (step === 6 && helperSubStep === 'availability') {
      setHelperSubStep('capabilities');
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleContinueAsAarav = () => {
    switchAccount('aarav');
    navigateTo('my_circle');
  };

  const handlePopulateAarav = () => {
    populateDraftWithAarav();
    setStep(1);
  };

  const handleFinalize = () => {
    const isAaravName = (onboardingDraft.firstName || '').toLowerCase() === 'aarav';
    const profileId = isAaravName ? 'aarav' : `user_${Date.now()}`;

    const newProfile: UserProfile = {
      id: profileId,
      firstName: onboardingDraft.firstName || 'Aarav',
      lastName: onboardingDraft.lastName || 'Sharma',
      avatar: getAssetUrl('/images/contacts/aarav.png'),
      city: onboardingDraft.city || 'Bengaluru',
      neighbourhood: onboardingDraft.neighbourhood || 'Indiranagar',
      phone: onboardingDraft.phone || '+91 98765 43210',
      email: onboardingDraft.email || '',
      preferredLanguage: onboardingDraft.language || 'en',
      communicationPreference: onboardingDraft.communicationPreference || 'whatsapp',
      contactVerificationStatus: 'verified',
      primaryIntent: onboardingDraft.intent || 'want_to_help',
      participationIntents: [onboardingDraft.intent || 'want_to_help'],
      onboardingCompleted: true,
      isSeededDemoAccount: isAaravName,
      helperCapabilities: onboardingDraft.helperCapabilities || ['groceries_essentials', 'welfare_check_ins'],
      helperAvailability: onboardingDraft.helperAvailability || 'available_now',
      preferredRadiusKm: onboardingDraft.preferredRadiusKm || 3,
      travelModes: onboardingDraft.travelModes || ['two_wheeler', 'walking'],
      supportNeeds: onboardingDraft.supportNeeds,
      supportUrgency: onboardingDraft.supportUrgency,
      supportBeneficiary: onboardingDraft.supportBeneficiary,
      concernSubjectName: onboardingDraft.concernSubjectName,
      concernSubjectRelationship: onboardingDraft.concernSubjectRelationship,
      concernObservations: onboardingDraft.concernObservations,
      trustedContactIds: onboardingDraft.trustedContactIds || ['savitri', 'priya', 'vikram'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    createAccount(newProfile);

    if (onFinish) {
      onFinish();
    } else {
      navigateTo('my_circle');
    }
  };

  // Determine current active display step number (1 to 7)
  const displayStepNum = step <= 5 ? step : step === 6 ? 5 : step === 7 ? 6 : 7;

  // Continue CTA label
  const getContinueText = () => {
    if (step === 1) return 'Continue';
    if (step === 2) return 'Continue';
    if (step === 3) return 'Send demo code';
    if (step === 4) return 'Verify & continue';
    if (step === 5) return 'Continue';
    if (step === 6) {
      if (onboardingDraft.intent === 'want_to_help') {
        return helperSubStep === 'capabilities' ? 'Continue to availability' : 'Continue to trusted circle';
      } else if (onboardingDraft.intent === 'need_help') {
        return 'Continue to support request';
      } else {
        return 'Review care concern';
      }
    }
    if (step === 7) return 'Review my profile';
    return 'Enter UJAAS';
  };

  return (
    <OnboardingLayout
      currentStep={displayStepNum}
      totalSteps={7}
      stepName={`Step ${displayStepNum}`}
      leftQuoteHeading={quote.heading}
      leftQuoteSub={quote.sub}
      onBack={step > 1 ? handleBack : undefined}
      onContinue={step < 8 ? handleContinue : undefined}
      continueText={getContinueText()}
      onSkip={step === 7 ? () => setStep(8) : undefined}
      skipText="Skip for now"
      centerNote="You can change these choices later."
    >
      {step === 1 && (
        <Step01WelcomeIntent
          selectedIntent={onboardingDraft.intent}
          onSelectIntent={intent => updateDraft({ intent })}
          onContinue={handleContinue}
          onPopulateAarav={handlePopulateAarav}
          onContinueAsAarav={handleContinueAsAarav}
          onEmergencyClick={onEmergencyClick}
        />
      )}

      {step === 2 && (
        <Step02LanguageComms
          language={onboardingDraft.language}
          onSelectLanguage={language => updateDraft({ language })}
          communicationPreference={onboardingDraft.communicationPreference}
          onSelectCommPref={communicationPreference => updateDraft({ communicationPreference })}
        />
      )}

      {step === 3 && (
        <Step03BasicIdentity
          firstName={onboardingDraft.firstName}
          onFirstNameChange={firstName => updateDraft({ firstName })}
          lastName={onboardingDraft.lastName}
          onLastNameChange={lastName => updateDraft({ lastName })}
          phone={onboardingDraft.phone}
          onPhoneChange={phone => updateDraft({ phone })}
          commPref={onboardingDraft.communicationPreference}
          onCommPrefChange={communicationPreference => updateDraft({ communicationPreference })}
        />
      )}

      {step === 4 && (
        <Step04DemoOtp
          phone={onboardingDraft.phone}
          otpCode={onboardingDraft.otpCode}
          onOtpChange={otpCode => updateDraft({ otpCode })}
          isVerified={onboardingDraft.isOtpVerified}
          onVerifySuccess={() => updateDraft({ isOtpVerified: true })}
          onChangeNumber={() => setStep(3)}
        />
      )}

      {step === 5 && (
        <Step05Neighbourhood
          city={onboardingDraft.city}
          onCityChange={city => updateDraft({ city })}
          neighbourhood={onboardingDraft.neighbourhood}
          onNeighbourhoodChange={neighbourhood => updateDraft({ neighbourhood })}
        />
      )}

      {step === 6 && onboardingDraft.intent === 'want_to_help' && helperSubStep === 'capabilities' && (
        <Step06HelperCapabilities
          capabilities={onboardingDraft.helperCapabilities}
          onToggleCapability={cap => {
            const current = onboardingDraft.helperCapabilities || [];
            const next = current.includes(cap)
              ? current.filter(c => c !== cap)
              : [...current, cap];
            updateDraft({ helperCapabilities: next });
          }}
        />
      )}

      {step === 6 && onboardingDraft.intent === 'want_to_help' && helperSubStep === 'availability' && (
        <Step07HelperAvailability
          firstName={onboardingDraft.firstName}
          neighbourhood={onboardingDraft.neighbourhood}
          city={onboardingDraft.city}
          availability={onboardingDraft.helperAvailability}
          onAvailabilityChange={helperAvailability => updateDraft({ helperAvailability })}
          radiusKm={onboardingDraft.preferredRadiusKm}
          onRadiusChange={preferredRadiusKm => updateDraft({ preferredRadiusKm })}
          travelModes={onboardingDraft.travelModes}
          onToggleTravelMode={mode => {
            const current = onboardingDraft.travelModes || [];
            const next = current.includes(mode)
              ? current.filter(m => m !== mode)
              : [...current, mode];
            updateDraft({ travelModes: next });
          }}
          capabilities={onboardingDraft.helperCapabilities}
        />
      )}

      {step === 6 && onboardingDraft.intent === 'need_help' && (
        <Step08NeedsHelp
          needs={onboardingDraft.supportNeeds}
          onToggleNeed={need => {
            const current = onboardingDraft.supportNeeds || [];
            const next = current.includes(need)
              ? current.filter(n => n !== need)
              : [...current, need];
            updateDraft({ supportNeeds: next });
          }}
          urgency={onboardingDraft.supportUrgency}
          onUrgencyChange={supportUrgency => updateDraft({ supportUrgency })}
          beneficiary={onboardingDraft.supportBeneficiary}
          onBeneficiaryChange={supportBeneficiary => updateDraft({ supportBeneficiary })}
        />
      )}

      {step === 6 && onboardingDraft.intent === 'concerned_about_someone' && (
        <Step09ConcernPath
          subjectName={onboardingDraft.concernSubjectName}
          onSubjectNameChange={concernSubjectName => updateDraft({ concernSubjectName })}
          relationship={onboardingDraft.concernSubjectRelationship}
          onRelationshipChange={concernSubjectRelationship => updateDraft({ concernSubjectRelationship })}
          observations={onboardingDraft.concernObservations}
          onToggleObservation={obs => {
            const current = onboardingDraft.concernObservations || [];
            const next = current.includes(obs)
              ? current.filter(o => o !== obs)
              : [...current, obs];
            updateDraft({ concernObservations: next });
          }}
        />
      )}

      {step === 7 && (
        <Step10TrustedCircle
          trustedIds={onboardingDraft.trustedContactIds}
          onToggleContact={id => {
            const current = onboardingDraft.trustedContactIds || [];
            const next = current.includes(id)
              ? current.filter(i => i !== id)
              : [...current, id];
            updateDraft({ trustedContactIds: next });
          }}
          onAddManualContact={_contact => {
            // Add custom contact
            updateDraft({
              trustedContactIds: [...onboardingDraft.trustedContactIds, `contact_${Date.now()}`]
            });
          }}
        />
      )}

      {step === 8 && (
        <Step11ReviewWelcome
          draft={onboardingDraft}
          onEnterUjaas={handleFinalize}
          onOpenSettings={() => {
            handleFinalize();
            navigateTo('user_profile');
          }}
          onEditStep={s => setStep(s)}
        />
      )}
    </OnboardingLayout>
  );
};
