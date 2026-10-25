import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { INDIAN_CITIES, BENGALURU_NEIGHBOURHOODS } from '../../data/seedAccounts';
import styles from './Step05Neighbourhood.module.css';

interface Step05NeighbourhoodProps {
  city: string;
  onCityChange: (city: string) => void;
  neighbourhood: string;
  onNeighbourhoodChange: (neighbourhood: string) => void;
}

export const Step05Neighbourhood: React.FC<Step05NeighbourhoodProps> = ({
  city,
  onCityChange,
  neighbourhood,
  onNeighbourhoodChange
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const selectedLoc = BENGALURU_NEIGHBOURHOODS.find(
    n => n.name.toLowerCase() === neighbourhood.toLowerCase()
  ) || BENGALURU_NEIGHBOURHOODS[0];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [selectedLoc.lat, selectedLoc.lng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom pulsing pin
      const pinIcon = L.divIcon({
        className: 'onboarding-map-pin',
        html: `
          <div style="
            width: 38px;
            height: 38px;
            background: #F45124;
            border: 2.5px solid #FFFFFF;
            box-shadow: 0 4px 12px rgba(244, 81, 36, 0.4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([selectedLoc.lat, selectedLoc.lng], { icon: pinIcon }).addTo(map);
      markerRef.current = marker;
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([selectedLoc.lat, selectedLoc.lng], 14, { animate: true });
      markerRef.current?.setLatLng([selectedLoc.lat, selectedLoc.lng]);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedLoc]);

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Where should your circle begin?</h1>
      <p className={styles.subtitle}>
        Choose the area where you can receive help or offer support.
      </p>

      {/* Select Dropdowns Grid */}
      <div className={styles.selectGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="citySelect" className={styles.label}>City *</label>
          <div className={styles.selectWrap}>
            <select
              id="citySelect"
              className={styles.select}
              value={city}
              onChange={e => onCityChange(e.target.value)}
            >
              {INDIAN_CITIES.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className={styles.selectArrow} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="neighSelect" className={styles.label}>Locality / neighbourhood *</label>
          <div className={styles.selectWrap}>
            <select
              id="neighSelect"
              className={styles.select}
              value={neighbourhood}
              onChange={e => onNeighbourhoodChange(e.target.value)}
            >
              {BENGALURU_NEIGHBOURHOODS.map(n => (
                <option key={n.id} value={n.name}>{n.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className={styles.selectArrow} />
          </div>
        </div>
      </div>

      {/* Approximate Location Map Container */}
      <div className={styles.mapOuter}>
        <div ref={mapContainerRef} className={styles.mapCanvas} />

        {/* Floating Bottom Left Badge */}
        <div className={styles.mapDisclaimer}>
          <span className={styles.dotIcon} />
          <span>Approximate location only · No live tracking</span>
        </div>

        {/* Floating Right Detail Card */}
        <div className={styles.areaFloatingCard}>
          <div className={styles.areaTag}>
            <MapPin size={14} className={styles.pinTagIcon} />
            <span>YOUR APPROXIMATE AREA</span>
          </div>
          <h2 className={styles.areaName}>{neighbourhood}</h2>
          <p className={styles.areaSub}>{city}, Karnataka</p>

          <div className={styles.circleVisNotice}>
            <strong>Visible to your circle</strong>
            <span>Neighbourhood only</span>
          </div>

          <button
            type="button"
            className={styles.adjustBtn}
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.setZoom(15);
              }
            }}
          >
            <span>Adjust approximate pin</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Privacy Notice Box */}
      <div className={styles.privacyBox}>
        <ShieldCheck size={18} className={styles.shieldIcon} />
        <span>Your exact home address is never displayed on the public map. Share further details only for an authorised task.</span>
      </div>
    </div>
  );
};
