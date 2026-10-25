import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useCareContext } from '../../context/CareContext';
import { ChevronRight, X } from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';
import styles from './LivingCircleConstellation.module.css';

interface NodeConfig {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  role: string;
  status: 'available' | 'missing_checkin' | 'safe' | 'busy';
  statusText: string;
  statusColor: string;
  anchorX: number; // percentage (0 to 100)
  anchorY: number; // percentage (0 to 100)
  ampX: number;    // drift amplitude in pixels
  ampY: number;
  freqX: number;   // rad/sec
  freqY: number;
  phaseX: number;  // radians
  phaseY: number;
}

const INNER_NODES: NodeConfig[] = [
  {
    id: 'aarav',
    name: 'Aarav Sharma',
    relationship: 'Grandson (You)',
    avatar: getAssetUrl('/images/contacts/aarav.png'),
    role: 'Can help with groceries and daily check-ins',
    status: 'available',
    statusText: 'Available',
    statusColor: '#10B981',
    anchorX: 50,
    anchorY: 82,
    ampX: 5,
    ampY: 4,
    freqX: 0.8,
    freqY: 0.6,
    phaseX: 0,
    phaseY: 1.2
  },
  {
    id: 'meera',
    name: 'Meera',
    relationship: 'Daughter',
    avatar: getAssetUrl('/images/contacts/meera.png'),
    role: 'Primary caregiver • Morning check-in missing',
    status: 'missing_checkin',
    statusText: 'Check-in Missing',
    statusColor: '#F59E0B',
    anchorX: 23,
    anchorY: 26,
    ampX: 6,
    ampY: 5,
    freqX: 0.65,
    freqY: 0.85,
    phaseX: 2.1,
    phaseY: 0.5
  },
  {
    id: 'priya',
    name: 'Priya',
    relationship: 'Cousin',
    avatar: getAssetUrl('/images/contacts/priya.png'),
    role: 'Available for vehicle transport & emergency calls',
    status: 'available',
    statusText: 'Available',
    statusColor: '#10B981',
    anchorX: 77,
    anchorY: 26,
    ampX: 5,
    ampY: 6,
    freqX: 0.75,
    freqY: 0.7,
    phaseX: 4.2,
    phaseY: 2.8
  },
  {
    id: 'rohan',
    name: 'Rohan',
    relationship: 'Friend',
    avatar: getAssetUrl('/images/contacts/rohan.png'),
    role: 'Available for heavy lifting & ration pickups',
    status: 'available',
    statusText: 'Available',
    statusColor: '#10B981',
    anchorX: 18,
    anchorY: 72,
    ampX: 4,
    ampY: 5,
    freqX: 0.55,
    freqY: 0.9,
    phaseX: 1.5,
    phaseY: 3.4
  },
  {
    id: 'vikram',
    name: 'Vikram',
    relationship: 'Neighbour',
    avatar: getAssetUrl('/images/contacts/vikram.png'),
    role: 'Checked in safe • Coordinates clinic appointments',
    status: 'safe',
    statusText: 'Checked In',
    statusColor: '#3B82F6',
    anchorX: 82,
    anchorY: 72,
    ampX: 5,
    ampY: 4,
    freqX: 0.7,
    freqY: 0.6,
    phaseX: 3.1,
    phaseY: 4.2
  }
];

interface LivingCircleConstellationProps {
  reducedMotion?: boolean;
}

export const LivingCircleConstellation: React.FC<LivingCircleConstellationProps> = ({
  reducedMotion = false
}) => {
  const { navigateTo } = useCareContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeConfig | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // References to animated elements
  const nodeElsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const lineElsRef = useRef<Map<string, SVGPathElement>>(new Map());
  const pulseParticleRefs = useRef<Map<string, SVGCircleElement>>(new Map());

  // Observe visibility to pause RAF when off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation Loop updating node positions and dynamic SVG lines
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let animId: number;
    const startTime = performance.now();

    const updateFrame = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Center position of Savitri Amma
      const centerX = width * 0.5;
      const centerY = height * 0.48;

      INNER_NODES.forEach((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isSelected = selectedNode?.id === node.id;

        // Dampen amplitude if hovered or selected
        const mult = isHovered || isSelected ? 0.2 : 1.0;

        const dx = mult * node.ampX * Math.sin(node.freqX * elapsed + node.phaseX);
        const dy = mult * node.ampY * Math.cos(node.freqY * elapsed + node.phaseY);

        const currentX = (node.anchorX / 100) * width + dx;
        const currentY = (node.anchorY / 100) * height + dy;

        // Update DOM transform directly without React re-render
        const el = nodeElsRef.current.get(node.id);
        if (el) {
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        }

        // Update SVG line connecting center to this node
        const line = lineElsRef.current.get(node.id);
        if (line) {
          // Subtle curve towards center
          const midX = (centerX + currentX) / 2;
          const midY = (centerY + currentY) / 2;
          // Offset control point slightly for organic feel
          const perpX = -(currentY - centerY) * 0.08;
          const perpY = (currentX - centerX) * 0.08;
          const cpX = midX + perpX;
          const cpY = midY + perpY;

          line.setAttribute('d', `M ${centerX} ${centerY} Q ${cpX} ${cpY} ${currentX} ${currentY}`);
        }

        // Update traveling care signal particle along the line
        const particle = pulseParticleRefs.current.get(node.id);
        if (particle) {
          // Traveling loop every ~4.5 seconds per node
          const cycle = (elapsed * 0.35 + node.phaseX) % 1;
          const t = cycle;
          // Quadratic bezier interpolation
          const p0X = centerX;
          const p0Y = centerY;
          const p1X = (centerX + currentX) / 2 - (currentY - centerY) * 0.08;
          const p1Y = (centerY + currentY) / 2 + (currentX - centerX) * 0.08;
          const p2X = currentX;
          const p2Y = currentY;

          const px = (1 - t) * (1 - t) * p0X + 2 * (1 - t) * t * p1X + t * t * p2X;
          const py = (1 - t) * (1 - t) * p0Y + 2 * (1 - t) * t * p1Y + t * t * p2Y;

          particle.setAttribute('cx', px.toString());
          particle.setAttribute('cy', py.toString());
          // Fade in and out at ends
          const opacity = Math.sin(t * Math.PI) * 0.85;
          particle.setAttribute('opacity', opacity.toString());
        }
      });

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion, isVisible, hoveredNodeId, selectedNode]);

  // Handle ESC key to dismiss popover
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectContact = (node: NodeConfig) => {
    setSelectedNode(node);
  };

  const handleNavigateToCircle = useCallback(() => {
    navigateTo('my_circle');
  }, [navigateTo]);

  return (
    <div
      ref={containerRef}
      className={`${styles.constellationContainer} ${reducedMotion ? styles.reducedMotion : ''}`}
      aria-label="Interactive My Circle Care Network"
    >
      {/* Background Soft Orbital Rings */}
      <div className={styles.orbitalRings} aria-hidden="true">
        <div className={styles.ringInner} />
        <div className={styles.ringOuter} />
      </div>

      {/* SVG Connecting Relationship Lines & Traveling Care Pulses */}
      <svg
        ref={svgRef}
        className={styles.connectionsSvg}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F45124" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF762C" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="lineGradRest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.4" />
          </linearGradient>
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {INNER_NODES.map((node) => {
          const isActive = hoveredNodeId === node.id || selectedNode?.id === node.id;
          return (
            <g key={node.id}>
              <path
                ref={(el) => {
                  if (el) lineElsRef.current.set(node.id, el);
                  else lineElsRef.current.delete(node.id);
                }}
                className={`${styles.connectionLine} ${isActive ? styles.lineActive : ''}`}
                stroke={isActive ? 'url(#lineGradActive)' : 'url(#lineGradRest)'}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeDasharray={isActive ? 'none' : '4, 4'}
                filter={isActive ? 'url(#lineGlow)' : undefined}
                fill="none"
              />
              {/* Traveling signal particle */}
              <circle
                ref={(el) => {
                  if (el) pulseParticleRefs.current.set(node.id, el);
                  else pulseParticleRefs.current.delete(node.id);
                }}
                r="3.5"
                fill="#F45124"
                opacity="0"
              />
            </g>
          );
        })}
      </svg>

      {/* Central Anchor: Savitri Amma */}
      <div
        className={styles.centerAnchor}
        style={{ left: '50%', top: '48%' }}
        aria-label="Savitri Amma - Center of Care Circle"
      >
        <div className={styles.centerGlowRing} aria-hidden="true" />
        <div className={styles.centerAvatarFrame}>
          <picture>
            <source srcSet={getAssetUrl('/images/savitri_portrait_clean.webp')} type="image/webp" />
            <img
              src={getAssetUrl('/images/savitri_portrait_clean.png')}
              alt="Savitri Amma"
              className={styles.centerAvatarImg}
            />
          </picture>
        </div>
        <div className={styles.centerLabel}>
          <span className={styles.centerName}>Savitri Amma</span>
          <span className={styles.centerSub}>Anchor of Care</span>
        </div>
      </div>

      {/* Floating Outer Circle Nodes */}
      {INNER_NODES.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isSelected = selectedNode?.id === node.id;

        return (
          <div
            key={node.id}
            ref={(el) => {
              if (el) nodeElsRef.current.set(node.id, el);
              else nodeElsRef.current.delete(node.id);
            }}
            className={`${styles.nodeWrapper} ${isHovered ? styles.nodeHovered : ''} ${
              isSelected ? styles.nodeSelected : ''
            }`}
            style={{
              left: `${node.anchorX}%`,
              top: `${node.anchorY}%`
            }}
          >
            <button
              type="button"
              className={styles.nodeMarkerBtn}
              onClick={() => handleSelectContact(node)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onFocus={() => setHoveredNodeId(node.id)}
              onBlur={() => setHoveredNodeId(null)}
              aria-label={`${node.name}, ${node.relationship}. Status: ${node.statusText}. Click to view details.`}
            >
              <div className={styles.markerAvatarFrame}>
                <img src={node.avatar} alt="" className={styles.markerAvatarImg} />
                <span
                  className={styles.markerStatusDot}
                  style={{ backgroundColor: node.statusColor }}
                  aria-hidden="true"
                />
              </div>

              {/* Floating Pill Label */}
              <div className={styles.markerLabelPill}>
                <span className={styles.markerName}>{node.name}</span>
                <span className={styles.markerRel}>{node.relationship}</span>
              </div>
            </button>
          </div>
        );
      })}

      {/* Contact Preview Popover Card (When Clicked) */}
      {selectedNode && (
        <div className={styles.popoverOverlay} onClick={() => setSelectedNode(null)}>
          <div
            className={styles.popoverCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-preview-title"
          >
            <button
              type="button"
              className={styles.popoverCloseBtn}
              onClick={() => setSelectedNode(null)}
              aria-label="Close contact preview"
            >
              <X size={16} />
            </button>

            <div className={styles.popoverHeader}>
              <div className={styles.popoverAvatarFrame}>
                <img src={selectedNode.avatar} alt={selectedNode.name} className={styles.popoverAvatarImg} />
              </div>
              <div className={styles.popoverInfo}>
                <h4 id="contact-preview-title" className={styles.popoverName}>
                  {selectedNode.name}
                </h4>
                <div className={styles.popoverRelTag}>{selectedNode.relationship}</div>
                <div className={styles.popoverStatusRow}>
                  <span
                    className={styles.popoverStatusDot}
                    style={{ backgroundColor: selectedNode.statusColor }}
                  />
                  <span className={styles.popoverStatusText}>{selectedNode.statusText}</span>
                </div>
              </div>
            </div>

            <p className={styles.popoverRole}>{selectedNode.role}</p>

            <div className={styles.popoverActions}>
              <button
                type="button"
                className={styles.popoverCtaBtn}
                onClick={handleNavigateToCircle}
              >
                <span>View in My Circle</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
