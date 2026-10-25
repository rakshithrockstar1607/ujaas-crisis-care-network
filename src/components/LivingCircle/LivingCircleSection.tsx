import React, { useState } from 'react';
import { useCareContext } from '../../context/CareContext';
import { AmbientNeighbourhoodConstellation } from './AmbientNeighbourhoodConstellation';
import { ScenarioPreviews } from './ScenarioPreviews';
import {
  Users,
  Heart,
  HandHeart,
  ShieldCheck,
  ChevronRight,
  Compass,
  ArrowRight
} from 'lucide-react';
import styles from './LivingCircleSection.module.css';

interface LivingCircleSectionProps {
  reducedMotion?: boolean;
}

type ScenarioId = 'circle' | 'help_now' | 'offer_help' | 'child_safe';

interface ScenarioItem {
  id: ScenarioId;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SCENARIOS: ScenarioItem[] = [
  {
    id: 'circle',
    number: '01',
    title: 'Someone I know',
    description: 'Check on a loved one and continue their care.',
    icon: <Users size={20} strokeWidth={2.2} />
  },
  {
    id: 'help_now',
    number: '02',
    title: 'I need assistance',
    description: 'Get help with essential needs.',
    icon: <Heart size={20} strokeWidth={2.2} />
  },
  {
    id: 'offer_help',
    number: '03',
    title: 'I want to help',
    description: 'Find meaningful ways to support.',
    icon: <HandHeart size={20} strokeWidth={2.2} />
  },
  {
    id: 'child_safe',
    number: '04',
    title: 'Someone needs protection',
    description: 'Report a concern for a child.',
    icon: <ShieldCheck size={20} strokeWidth={2.2} />
  }
];

export const LivingCircleSection: React.FC<LivingCircleSectionProps> = ({
  reducedMotion = false
}) => {
  const { navigateTo } = useCareContext();
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('circle');

  return (
    <section
      id="living-circle"
      className={`${styles.section} ${reducedMotion ? styles.reducedMotion : ''}`}
      aria-labelledby="living-circle-heading"
    >
      <div className={styles.container}>
        {/* Main Two-Column Editorial & Application Stage */}
        <div className={styles.mainGrid}>
          {/* Left Column: Narrative & Interactive Scenario Selectors */}
          <div className={styles.leftCol}>
            {/* Small Editorial Eyebrow with Orange Accent Line */}
            <div className={styles.eyebrowContainer}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span className={styles.eyebrowText}>02 / THE POWER OF CONNECTION</span>
            </div>

            {/* Oversized Canela Headline */}
            <h2 id="living-circle-heading" className={styles.headline}>
              Different needs.<br />
              Different paths.<br />
              <span className={styles.headlineHighlight}>One circle of care.</span>
            </h2>

            {/* Thoughtful Supporting Paragraph (Strictly Zero Em Dashes) */}
            <p className={styles.supportingCopy}>
              Some people need someone to check on them. Others need food, transport or a safe place. Some situations require specialised protection. UJAAS helps people find the right next step, without losing sight of who needs care.
            </p>

            {/* Four Interactive Scenario Selectors */}
            <div
              className={styles.scenarioList}
              role="tablist"
              aria-label="Care pathways exploration"
            >
              {SCENARIOS.map((scenario) => {
                const isSelected = activeScenario === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    role="tab"
                    id={`tab-${scenario.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${scenario.id}`}
                    className={`${styles.scenarioCard} ${isSelected ? styles.scenarioSelected : ''}`}
                    onClick={() => setActiveScenario(scenario.id)}
                  >
                    <div className={styles.scenarioIconBox}>
                      {scenario.icon}
                    </div>

                    <div className={styles.scenarioTextContent}>
                      <h3 className={styles.scenarioTitle}>{scenario.title}</h3>
                      <p className={styles.scenarioDesc}>{scenario.description}</p>
                    </div>

                    <div className={styles.scenarioChevron} aria-hidden="true">
                      <ChevronRight size={18} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Rooftop Ambient Constellation + Large Ivory Application Card */}
          <div className={styles.rightCol}>
            {/* Signature Feature A: Ambient Rooftop Constellation Layer */}
            <div className={styles.ambientConstellationWrapper}>
              <AmbientNeighbourhoodConstellation reducedMotion={reducedMotion} />
            </div>

            {/* Signature Feature B & Interactive Preview Stage */}
            <div
              id={`panel-${activeScenario}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeScenario}`}
              className={styles.previewPanelWrapper}
            >
              <ScenarioPreviews
                scenarioId={activeScenario}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Resource Discovery Strip */}
        <div className={styles.resourceStrip}>
          <div className={styles.resourceLeft}>
            <div className={styles.resourceIconBox}>
              <Compass size={22} color="#F45124" />
            </div>
            <div>
              <h4 className={styles.resourceHeading}>
                Looking for food, medicines or shelter?
              </h4>
              <p className={styles.resourceSubtext}>
                Explore available community resources in your area.
              </p>
            </div>
          </div>

          <button
            type="button"
            className={styles.resourceCtaBtn}
            onClick={() => navigateTo('resources')}
            aria-label="Explore Community Resources"
          >
            <span>Explore Resources</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
