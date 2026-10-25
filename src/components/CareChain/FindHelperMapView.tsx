import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  ArrowLeft,
  Navigation,
  Send,
  X,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './FindHelperMapView.module.css';

export const FindHelperMapView: React.FC = () => {
  const {
    contacts,
    navigateTo,
    assignHelperToTask
  } = useCareContext();

  const [selectedHelperId, setSelectedHelperId] = useState<string>('vikram');
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [showDispatchSuccess, setShowDispatchSuccess] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  // Eligible helper list
  const helperCandidates = [
    contacts.vikram,
    contacts.rohan,
    contacts.priya,
    contacts.neha
  ].filter(Boolean);

  const activeHelper = contacts[selectedHelperId] || contacts.vikram;

  // Initialise Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [12.971, 77.642],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true
    });

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        className: 'civic-map-tiles'
      }
    ).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Route and Markers when selected helper changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup || !activeHelper) return;

    markersGroup.clearLayers();
    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
    }

    const aaravCoords: [number, number] = [12.9719, 77.6412];
    const helperCoords: [number, number] = activeHelper.geoCoordinates
      ? [activeHelper.geoCoordinates.lat, activeHelper.geoCoordinates.lng]
      : [12.9698, 77.6435];

    // Realistic street route waypoints along Indiranagar
    let waypoints: [number, number][] = [];
    if (activeHelper.id === 'vikram') {
      waypoints = [
        aaravCoords,
        [12.9715, 77.6415],
        [12.9705, 77.6425],
        [12.9700, 77.6430],
        helperCoords
      ];
    } else {
      // Intermediate route waypoint
      const midLat = (aaravCoords[0] + helperCoords[0]) / 2;
      const midLng = (aaravCoords[1] + helperCoords[1]) / 2;
      waypoints = [aaravCoords, [midLat + 0.002, midLng], helperCoords];
    }

    // Outer route casing (white/blue)
    const routeCasing = L.polyline(waypoints, {
      color: '#FFFFFF',
      weight: 7,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    });
    markersGroup.addLayer(routeCasing);

    // Inner route path (vibrant blue)
    const routeMain = L.polyline(waypoints, {
      color: '#1A56DB',
      weight: 4.5,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round',
      className: 'route-path-main'
    });
    markersGroup.addLayer(routeMain);
    routeLayerRef.current = routeMain;

    // Aarav Marker
    const aaravHtml = `
      <div class="ujaas-marker-wrap">
        <div class="marker-pin marker-pin-aarav">
          <img src="${getAssetUrl('/images/contacts/aarav.png')}" alt="Aarav" class="marker-img" />
          <span class="marker-badge-dot badge-dot-green"></span>
        </div>
        <div class="marker-pill marker-pill-aarav">
          <span class="marker-pill-name">Aarav</span>
          <span class="marker-pill-sub sub-aarav">You</span>
        </div>
      </div>
    `;
    const aaravIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: aaravHtml,
      iconSize: [110, 70],
      iconAnchor: [55, 35]
    });
    L.marker(aaravCoords, { icon: aaravIcon }).addTo(markersGroup);

    // Helper Marker
    const helperHtml = `
      <div class="ujaas-marker-wrap">
        <div class="marker-pin marker-pin-available">
          <img src="${activeHelper.avatar}" alt="${activeHelper.name}" class="marker-img" />
          <span class="marker-badge-dot badge-dot-green"></span>
        </div>
        <div class="marker-pill">
          <span class="marker-pill-name">${activeHelper.name}</span>
          <span class="marker-pill-sub sub-green">${activeHelper.distanceKm || 1.2} km away</span>
        </div>
      </div>
    `;
    const helperIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: helperHtml,
      iconSize: [130, 70],
      iconAnchor: [65, 35]
    });
    L.marker(helperCoords, { icon: helperIcon }).addTo(markersGroup);

    // Fit bounds to show route cleanly
    const bounds = L.latLngBounds([aaravCoords, helperCoords]);
    map.fitBounds(bounds, { padding: [80, 80], maxZoom: 15 });
  }, [activeHelper]);

  const handleSelectHelper = (id: string) => {
    setSelectedHelperId(id);
  };

  const handleCenterRoute = () => {
    const map = mapInstanceRef.current;
    if (!map || !activeHelper) return;
    const aaravCoords: [number, number] = [12.9719, 77.6412];
    const helperCoords: [number, number] = activeHelper.geoCoordinates
      ? [activeHelper.geoCoordinates.lat, activeHelper.geoCoordinates.lng]
      : [12.9698, 77.6435];
    const bounds = L.latLngBounds([aaravCoords, helperCoords]);
    map.flyToBounds(bounds, { padding: [80, 80], duration: 0.8 });
  };

  const handleRequestHelp = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setShowDispatchSuccess(true);
      setTimeout(() => {
        assignHelperToTask(activeHelper.id, `${activeHelper.name} (${activeHelper.relationship})`);
      }, 1200);
    }, 800);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
          <button
            type="button"
            className={styles.breadLink}
            onClick={() => navigateTo('my_circle')}
          >
            🏠 My Circle
          </button>
          <span className={styles.breadSep}>›</span>
          <button
            type="button"
            className={styles.breadLink}
            onClick={() => navigateTo('care_concern')}
          >
            Savitri Amma
          </button>
          <span className={styles.breadSep}>›</span>
          <button
            type="button"
            className={styles.breadLink}
            onClick={() => navigateTo('care_chain')}
          >
            Care Chain
          </button>
          <span className={styles.breadSep}>›</span>
          <button
            type="button"
            className={styles.breadLink}
            onClick={() => navigateTo('task_details')}
          >
            Groceries
          </button>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>Find someone in your circle</span>
        </nav>

        {/* Header */}
        <div className={styles.headerArea}>
          <button
            type="button"
            className={styles.backBtnHeading}
            onClick={() => navigateTo('task_details')}
            aria-label="Return to task details"
          >
            <ArrowLeft size={24} color="#091C33" />
            <h1 className={styles.headingText}>Find someone in your circle</h1>
          </button>
          <p className={styles.subtitle}>
            People near you who can help with groceries.
          </p>
        </div>

        {/* Filter Chips */}
        <div className={styles.filterRow} role="group" aria-label="Filter helpers">
          <button type="button" className={`${styles.filterPill} ${styles.filterPillActive}`}>
            <span>Available</span>
            <ChevronDown size={14} />
          </button>
          <button type="button" className={styles.filterPill}>
            <span>Grocery support</span>
          </button>
          <button type="button" className={styles.filterPill}>
            <span>Nearby (10 km)</span>
          </button>
        </div>

        {/* Split Stage: Left Helper List + Right Interactive Route Map */}
        <div className={styles.splitStage}>
          {/* Left Column: Candidates */}
          <div className={styles.helpersCol}>
            {helperCandidates.map(helper => {
              const isSelected = helper.id === selectedHelperId;
              const isAvailable = helper.volunteerStatus === 'available';

              return (
                <div
                  key={helper.id}
                  className={`${styles.helperCard} ${isSelected ? styles.helperCardActive : ''}`}
                  onClick={() => handleSelectHelper(helper.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleSelectHelper(helper.id)}
                >
                  <div className={styles.helperCardHeader}>
                    <img
                      src={helper.avatar}
                      alt={helper.name}
                      className={styles.helperAvatar}
                    />
                    <div className={styles.helperInfo}>
                      <span className={styles.helperName}>{helper.name}</span>
                      <span className={styles.helperLocation}>
                        {helper.relationship} · {helper.neighborhood || helper.location}
                      </span>
                      <span className={styles.helperDistance}>
                        {helper.distanceKm || 1.2} km away
                      </span>
                    </div>

                    <span
                      className={`${styles.helperStatusPill} ${
                        isAvailable ? styles.statusAvailable : styles.statusBusy
                      }`}
                    >
                      <span>●</span>
                      <span>{isAvailable ? 'Available' : 'Busy'}</span>
                    </span>
                  </div>

                  {/* Badges */}
                  {helper.capabilities && (
                    <div className={styles.badgeRow}>
                      {helper.capabilities.map(cap => (
                        <span key={cap} className={styles.capabilityBadge}>
                          {cap}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Route Map */}
          <div className={styles.mapCol}>
            <div ref={mapContainerRef} className={styles.mapElement} />

            {/* Bottom Card for Active Helper */}
            {activeHelper && (
              <div className={styles.selectedHelperBottomCard}>
                <div className={styles.bottomCardHeader}>
                  <div className={styles.bottomCardProfile}>
                    <img
                      src={activeHelper.avatar}
                      alt={activeHelper.name}
                      className={styles.bottomCardAvatar}
                    />
                    <div className={styles.bottomCardMeta}>
                      <span className={styles.bottomCardName}>{activeHelper.name}</span>
                      <span className={styles.bottomCardSub}>
                        {activeHelper.relationship} · {activeHelper.neighborhood || activeHelper.location}
                      </span>
                      <span className={styles.helperDistance}>
                        {activeHelper.distanceKm || 1.2} km away · {activeHelper.travelTimeText || '~4 min (Illustrative)'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.bottomCardClose}
                    onClick={() => navigateTo('task_details')}
                    aria-label="Close helper card"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Capabilities */}
                {activeHelper.capabilities && (
                  <div className={styles.badgeRow}>
                    {activeHelper.capabilities.map(cap => (
                      <span key={cap} className={styles.capabilityBadge}>
                        {cap}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom Actions */}
                <div className={styles.bottomCardActions}>
                  <button
                    type="button"
                    className={styles.viewRouteBtn}
                    onClick={handleCenterRoute}
                  >
                    <Navigation size={16} />
                    <span>View route</span>
                  </button>

                  <button
                    type="button"
                    className={styles.requestHelpBtn}
                    onClick={handleRequestHelp}
                    disabled={isDispatching}
                  >
                    <Send size={16} />
                    <span>
                      {isDispatching
                        ? 'Dispatching...'
                        : `Request help from ${activeHelper.name}`}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dispatch Success Toast */}
      {showDispatchSuccess && (
        <div className={styles.dispatchBanner} role="status">
          <CheckCircle2 size={20} />
          <span>
            {activeHelper.name} accepted grocery delivery for Savitri Amma! Updating Care Chain...
          </span>
        </div>
      )}
    </div>
  );
};