import React, { useEffect, useRef, useState } from 'react';
import { useCareContext } from '../../context/CareContext';
import { ChevronRight } from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';
import styles from './AmbientNeighbourhoodConstellation.module.css';

interface AmbientNode {
  id: string;
  name: string;
  role: string;
  avatar: string;
  anchorX: number; // percentage (0 to 100)
  anchorY: number; // percentage (0 to 100)
  ampX: number;
  ampY: number;
  freqX: number;
  freqY: number;
  phaseX: number;
  phaseY: number;
}

interface HubNode {
  id: string;
  label: string;
  anchorX: number;
  anchorY: number;
}

const AMBIENT_PEOPLE: AmbientNode[] = [
  {
    id: 'amb_meera',
    name: 'Meera',
    role: 'Daughter · Needs check-in',
    avatar: getAssetUrl('/images/contacts/meera.png'),
    anchorX: 20,
    anchorY: 30,
    ampX: 6,
    ampY: 5,
    freqX: 0.6,
    freqY: 0.75,
    phaseX: 0.5,
    phaseY: 1.8
  },
  {
    id: 'amb_aarav',
    name: 'Aarav',
    role: 'Grandson · Available to help',
    avatar: getAssetUrl('/images/contacts/aarav.png'),
    anchorX: 48,
    anchorY: 22,
    ampX: 5,
    ampY: 4,
    freqX: 0.75,
    freqY: 0.6,
    phaseX: 2.3,
    phaseY: 0.9
  },
  {
    id: 'amb_priya',
    name: 'Priya',
    role: 'Neighbour · Available for transport',
    avatar: getAssetUrl('/images/contacts/priya.png'),
    anchorX: 78,
    anchorY: 28,
    ampX: 6,
    ampY: 5,
    freqX: 0.55,
    freqY: 0.85,
    phaseX: 4.1,
    phaseY: 3.2
  },
  {
    id: 'amb_rohan',
    name: 'Rohan',
    role: 'Friend · Ration support',
    avatar: getAssetUrl('/images/contacts/rohan.png'),
    anchorX: 12,
    anchorY: 72,
    ampX: 4,
    ampY: 5,
    freqX: 0.7,
    freqY: 0.65,
    phaseX: 1.2,
    phaseY: 2.5
  },
  {
    id: 'amb_vikram',
    name: 'Vikram',
    role: 'Doctor · Health coordination',
    avatar: getAssetUrl('/images/contacts/vikram.png'),
    anchorX: 86,
    anchorY: 68,
    ampX: 5,
    ampY: 4,
    freqX: 0.65,
    freqY: 0.7,
    phaseX: 3.5,
    phaseY: 1.1
  }
];

const NEIGHBOURHOOD_HUBS: HubNode[] = [
  { id: 'hub1', label: 'Indiranagar Hub', anchorX: 34, anchorY: 52 },
  { id: 'hub2', label: '100 Feet Road', anchorX: 64, anchorY: 46 }
];

// Defined connections between nodes
const CONNECTIONS = [
  { from: 'amb_meera', to: 'amb_aarav' },
  { from: 'amb_aarav', to: 'amb_priya' },
  { from: 'amb_meera', to: 'hub1' },
  { from: 'amb_aarav', to: 'hub1' },
  { from: 'amb_priya', to: 'hub2' },
  { from: 'amb_aarav', to: 'hub2' },
  { from: 'amb_rohan', to: 'hub1' },
  { from: 'amb_vikram', to: 'hub2' }
];

interface AmbientNeighbourhoodConstellationProps {
  reducedMotion?: boolean;
}

export const AmbientNeighbourhoodConstellation: React.FC<AmbientNeighbourhoodConstellationProps> = ({
  reducedMotion = false
}) => {
  const { navigateTo } = useCareContext();
  const stageRef = useRef<HTMLDivElement>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<AmbientNode | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const nodeElsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const lineElsRef = useRef<Map<string, SVGPathElement>>(new Map());

  // Observe visibility
  useEffect(() => {
    if (!stageRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation Loop for ambient drift and connected lines
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let animId: number;
    const startTime = performance.now();

    const updateFrame = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Current coordinates map
      const currentCoords = new Map<string, { x: number; y: number }>();

      // Update ambient people nodes
      AMBIENT_PEOPLE.forEach((node) => {
        const isHovered = hoveredNodeId === node.id;
        const mult = isHovered ? 0.2 : 1.0;

        const dx = mult * node.ampX * Math.sin(node.freqX * elapsed + node.phaseX);
        const dy = mult * node.ampY * Math.cos(node.freqY * elapsed + node.phaseY);

        const cx = (node.anchorX / 100) * width + dx;
        const cy = (node.anchorY / 100) * height + dy;
        currentCoords.set(node.id, { x: cx, y: cy });

        const el = nodeElsRef.current.get(node.id);
        if (el) {
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        }
      });

      // Fixed hubs
      NEIGHBOURHOOD_HUBS.forEach((hub) => {
        currentCoords.set(hub.id, {
          x: (hub.anchorX / 100) * width,
          y: (hub.anchorY / 100) * height
        });
      });

      // Update SVG connection lines
      CONNECTIONS.forEach((conn, idx) => {
        const key = `conn_${idx}`;
        const line = lineElsRef.current.get(key);
        const p1 = currentCoords.get(conn.from);
        const p2 = currentCoords.get(conn.to);

        if (line && p1 && p2) {
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2 - 8;
          line.setAttribute('d', `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`);
        }
      });

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion, isVisible, hoveredNodeId]);

  const handleNodeClick = (node: AmbientNode) => {
    setSelectedNode(node);
  };

  return (
    <div
      ref={stageRef}
      className={`${styles.ambientStage} ${reducedMotion ? styles.reducedMotion : ''}`}
      aria-label="Atmospheric Neighbourhood Constellation"
    >
      {/* Nighttime Cityscape Silhouette Background */}
      <div className={styles.cityscapeLayer}>
        <picture>
          <source srcSet={getAssetUrl('/images/cityscape_ambient.webp')} type="image/webp" />
          <img
            src={getAssetUrl('/images/cityscape_ambient.png')}
            alt=""
            className={styles.cityscapeImg}
            aria-hidden="true"
          />
        </picture>
        <div className={styles.nightGradientOverlay} aria-hidden="true" />
      </div>

      {/* SVG Connecting Community Lines */}
      <svg className={styles.linesSvg} aria-hidden="true">
        <defs>
          <linearGradient id="ambLineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F45124" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F6A53A" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="ambLineGradRest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F6A53A" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {CONNECTIONS.map((conn, idx) => {
          const key = `conn_${idx}`;
          const isRelatedToHover =
            hoveredNodeId === conn.from || hoveredNodeId === conn.to;
          return (
            <path
              key={key}
              ref={(el) => {
                if (el) lineElsRef.current.set(key, el);
                else lineElsRef.current.delete(key);
              }}
              className={`${styles.ambLine} ${isRelatedToHover ? styles.ambLineActive : ''}`}
              stroke={isRelatedToHover ? 'url(#ambLineGradActive)' : 'url(#ambLineGradRest)'}
              strokeWidth={isRelatedToHover ? 2 : 1.25}
              strokeDasharray={isRelatedToHover ? 'none' : '3, 4'}
              fill="none"
            />
          );
        })}
      </svg>

      {/* Neighbourhood Hub Points (Decorative Nodes) */}
      {NEIGHBOURHOOD_HUBS.map((hub) => (
        <div
          key={hub.id}
          className={styles.hubNode}
          style={{ left: `${hub.anchorX}%`, top: `${hub.anchorY}%` }}
          aria-hidden="true"
        >
          <div className={styles.hubDot} />
          <span className={styles.hubLabel}>{hub.label}</span>
        </div>
      ))}

      {/* Floating People Markers */}
      {AMBIENT_PEOPLE.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isSelected = selectedNode?.id === node.id;

        return (
          <div
            key={node.id}
            ref={(el) => {
              if (el) nodeElsRef.current.set(node.id, el);
              else nodeElsRef.current.delete(node.id);
            }}
            className={`${styles.personMarker} ${isHovered ? styles.personHovered : ''} ${
              isSelected ? styles.personSelected : ''
            }`}
            style={{ left: `${node.anchorX}%`, top: `${node.anchorY}%` }}
          >
            <button
              type="button"
              className={styles.personBtn}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onFocus={() => setHoveredNodeId(node.id)}
              onBlur={() => setHoveredNodeId(null)}
              aria-label={`${node.name}: ${node.role}`}
            >
              <div className={styles.personAvatarFrame}>
                <img src={node.avatar} alt="" className={styles.personAvatarImg} />
                <div className={styles.personRingGlow} aria-hidden="true" />
              </div>

              {/* Tooltip Pill */}
              <div className={styles.personTooltip}>
                <span className={styles.tooltipName}>{node.name}</span>
                <span className={styles.tooltipRole}>{node.role}</span>
              </div>
            </button>
          </div>
        );
      })}

      {/* Compact Contact Modal if clicked */}
      {selectedNode && (
        <div className={styles.selectedNodeModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <img src={selectedNode.avatar} alt="" className={styles.modalAvatar} />
              <div>
                <h5 className={styles.modalName}>{selectedNode.name}</h5>
                <p className={styles.modalRole}>{selectedNode.role}</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.modalViewBtn}
                onClick={() => navigateTo('my_circle')}
              >
                <span>View in My Circle</span>
                <ChevronRight size={14} />
              </button>
              <button
                type="button"
                className={styles.modalDismissBtn}
                onClick={() => setSelectedNode(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
