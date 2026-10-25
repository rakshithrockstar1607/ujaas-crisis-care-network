import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  ShoppingBag,
  Edit2,
  ChevronDown,
  Navigation,
  ArrowRight,
  Info
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { MatchedHelper, ResourceListing } from '../../types/helpNow';
import styles from './NearbyHelpMap.module.css';

export const NearbyHelpMap: React.FC = () => {
  const {
    activeAssistanceRequest,
    matchedHelpers,
    resources,
    inviteHelperToRequest,
    navigateTo
  } = useCareContext();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [selectedFilterCircle, setSelectedFilterCircle] = useState<'all' | 'trusted'>('all');
  const [selectedFilterAvail, setSelectedFilterAvail] = useState<'all' | 'available_now'>('available_now');
  const [selectedRadius, setSelectedRadius] = useState<number>(3);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<{ type: 'helper' | 'resource'; id: string } | null>({
    type: 'helper',
    id: 'aarav'
  });

  const [showConfirmModal, setShowConfirmModal] = useState<MatchedHelper | null>(null);
  const [routeInfoModal, setRouteInfoModal] = useState<ResourceListing | null>(null);

  const req = activeAssistanceRequest;
  const requestId = req?.id || 'req-nisha-food-01';

  // Filtered helpers
  const filteredHelpers = matchedHelpers.filter(h => {
    if (selectedFilterAvail === 'available_now' && h.status !== 'available_now') return false;
    if (selectedFilterCircle === 'trusted' && !h.isTrustedCircle) return false;
    if (h.distanceKm > selectedRadius) return false;
    return true;
  });

  // Filtered resources
  const filteredResources = resources.filter(r => {
    if (r.distanceKm > selectedRadius) return false;
    return true;
  });

  // Leaflet Map Initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const userLat = 12.9716;
    const userLng = 77.6412;

    const map = L.map(mapContainerRef.current, {
      center: [userLat, userLng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    // 1. User Location Pulse Pin
    const userIcon = L.divIcon({
      className: 'user-pulse-marker',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="
            position: absolute;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(24, 119, 242, 0.25);
            animation: pulse-ring 2s infinite ease-out;
          "></div>
          <div style="
            width: 22px;
            height: 22px;
            background: #1877F2;
            border: 3px solid #FFFFFF;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(24, 119, 242, 0.5);
            z-index: 2;
          "></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    L.marker([userLat, userLng], { icon: userIcon })
      .bindTooltip('Your location · Indiranagar', {
        permanent: true,
        direction: 'bottom',
        className: 'user-tooltip'
      })
      .addTo(map);

    // 2. Helper Markers
    matchedHelpers.forEach(h => {
      const isSelected = activeItem?.id === h.id;
      const isAvailable = h.status === 'available_now';

      const helperIcon = L.divIcon({
        className: 'helper-map-marker',
        html: `
          <div style="
            position: relative;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: ${isSelected ? '3px solid #F45124' : '2.5px solid #FFFFFF'};
            box-shadow: 0 4px 14px rgba(16, 39, 68, 0.3);
            background: #FAF7F0;
            overflow: visible;
            cursor: pointer;
          ">
            <img src="${h.avatar}" alt="${h.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
            <div style="
              position: absolute;
              bottom: -2px;
              right: -2px;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border: 2px solid #FFFFFF;
              background: ${isAvailable ? '#287346' : '#D97706'};
            "></div>
          </div>
        `,
        iconSize: [42, 42],
        iconAnchor: [21, 21]
      });

      const marker = L.marker([h.lat, h.lng], { icon: helperIcon }).addTo(map);
      marker.on('click', () => {
        setActiveItem({ type: 'helper', id: h.id });
      });

      // Radiating connecting line from user to Aarav
      if (h.id === 'aarav') {
        const line = L.polyline(
          [
            [userLat, userLng],
            [h.lat, h.lng]
          ],
          {
            color: '#F45124',
            weight: 2.5,
            dashArray: '6, 6',
            opacity: 0.85
          }
        ).addTo(map);

        line.bindTooltip('Illustrative connection · Straight-line distance ~1.2 km', {
          direction: 'center',
          className: 'connector-tooltip'
        });

        marker.bindTooltip(
          `Aarav · ~1.2 km straight-line distance · ${isAvailable ? 'Available now' : 'Busy with task'}`,
          {
            permanent: true,
            direction: 'top',
            className: 'aarav-tooltip'
          }
        );
      }
    });

    // 3. Resource Markers
    resources.forEach(r => {
      const isFood = r.category === 'food';
      const isClinic = r.category === 'medical';
      const bgColor = isFood ? '#F6A53A' : isClinic ? '#287346' : '#1877F2';

      const resIcon = L.divIcon({
        className: 'resource-map-marker',
        html: `
          <div style="
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: ${bgColor};
            border: 2.5px solid #FFFFFF;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            font-size: 14px;
            cursor: pointer;
          ">
            ${isFood ? '🍲' : isClinic ? '🏥' : '🛒'}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const resMarker = L.marker([r.lat, r.lng], { icon: resIcon }).addTo(map);
      resMarker.on('click', () => {
        setActiveItem({ type: 'resource', id: r.id });
      });

      // Subtle dashed connection to community food point
      if (r.id === 'res-food-point') {
        L.polyline(
          [
            [userLat, userLng],
            [r.lat, r.lng]
          ],
          {
            color: '#F6A53A',
            weight: 2,
            dashArray: '4, 6',
            opacity: 0.6
          }
        ).addTo(map);
      }
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleRequestClick = (helper: MatchedHelper) => {
    setShowConfirmModal(helper);
  };

  const handleConfirmInvite = (helper: MatchedHelper) => {
    inviteHelperToRequest(requestId, helper.id);
    setShowConfirmModal(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Top Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>— MATCHED SUPPORT</div>
          <h1 className={styles.title}>
            Nearby ways <span className={styles.highlight}>to get help.</span>
          </h1>
          <p className={styles.subtitle}>
            We've found trusted people and community resources near you. Choose an option, or
            view the map to see what's available.
          </p>
        </div>

        {/* 2-Column Split: Map on Left, Options on Right */}
        <div className={styles.layoutGrid}>
          {/* Left Column: Leaflet Map */}
          <div className={styles.mapCard}>
            {/* Map Legend */}
            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDotAvailable} />
                <span>Available</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDotBusy} />
                <span>Busy</span>
              </div>
              <div className={styles.legendItem}>
                <span style={{ width: '16px', height: '0', borderTop: '2.5px dashed #F45124', display: 'inline-block' }} />
                <span>Illustrative connection</span>
              </div>
            </div>

            {/* Main Interactive Map */}
            <div ref={mapContainerRef} className={styles.leafletMap} />

            {/* Map Floating Labels */}
            <div className={styles.mapLocationBadge}>
              <Navigation size={13} />
              <span>Indiranagar Sector 2 · Near 100 Feet Rd</span>
            </div>
          </div>

          {/* Right Column: Request Details & Matched Helpers */}
          <div className={styles.resultsCol}>
            {/* Top Card: Your Request Summary */}
            <div className={styles.requestSummaryCard}>
              <div className={styles.reqTop}>
                <div className={styles.reqIconWrap}>
                  <ShoppingBag size={20} />
                </div>
                <div className={styles.reqInfo}>
                  <span className={styles.reqEyebrow}>YOUR REQUEST</span>
                  <h3 className={styles.reqTitle}>Food &amp; essentials</h3>
                  <div className={styles.reqMeta}>
                    <span>Today</span>
                    <span>•</span>
                    <span>Delivery possible</span>
                    <span>•</span>
                    <span>Indiranagar</span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.editReqBtn}
                  onClick={() => navigateTo('help_request_form')}
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className={styles.filtersRow}>
              <div className={styles.filterPill}>
                <select
                  value={selectedFilterCircle}
                  onChange={e => setSelectedFilterCircle(e.target.value as any)}
                  className={styles.filterSelect}
                >
                  <option value="all">All volunteers</option>
                  <option value="trusted">Trusted circle</option>
                </select>
                <ChevronDown size={14} className={styles.chevron} />
              </div>

              <div className={styles.filterPill}>
                <span className={styles.availDot} />
                <select
                  value={selectedFilterAvail}
                  onChange={e => setSelectedFilterAvail(e.target.value as any)}
                  className={styles.filterSelect}
                >
                  <option value="available_now">Available now</option>
                  <option value="all">Any availability</option>
                </select>
                <ChevronDown size={14} className={styles.chevron} />
              </div>

              <div className={styles.filterPill}>
                <select
                  value={selectedRadius}
                  onChange={e => setSelectedRadius(Number(e.target.value))}
                  className={styles.filterSelect}
                >
                  <option value={1}>Within 1 km</option>
                  <option value={3}>Within 3 km</option>
                  <option value={5}>Within 5 km</option>
                  <option value={10}>Within 10 km</option>
                </select>
                <ChevronDown size={14} className={styles.chevron} />
              </div>

              <div className={styles.filterPill}>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Groceries &amp; Water</option>
                  <option value="food">Community Food Points</option>
                  <option value="medical">Clinics &amp; Medicines</option>
                </select>
                <ChevronDown size={14} className={styles.chevron} />
              </div>
            </div>

            {/* List of Matched Helpers & Resources */}
            <div className={styles.cardsList}>
              {/* Primary Helper: Aarav Sharma */}
              {filteredHelpers.map(h => {
                const isAaravItem = h.id === 'aarav';
                return (
                  <div
                    key={h.id}
                    className={`${styles.helperCard} ${isAaravItem ? styles.highlightCard : ''}`}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.avatarWrap}>
                        <img src={h.avatar} alt={h.name} className={styles.avatar} />
                        <span
                          className={
                            h.status === 'available_now'
                              ? styles.badgeAvailable
                              : styles.badgeBusy
                          }
                        />
                      </div>

                      <div className={styles.helperInfo}>
                        <div className={styles.nameRow}>
                          <h4 className={styles.helperName}>{h.name}</h4>
                          <span className={styles.availStatusText}>
                            {h.status === 'available_now' ? '🟢 Available now' : '🟠 Busy'}
                          </span>
                        </div>
                        <span className={styles.distText}>
                          📍 {h.distanceKm} km away • {h.neighbourhood}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={styles.requestBtn}
                        onClick={() => handleRequestClick(h)}
                      >
                        <span>Request {h.name.split(' ')[0]}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>

                    <p className={styles.helperDesc}>{h.description}</p>

                    <div className={styles.tagsRow}>
                      {h.capabilities.map((cap, idx) => (
                        <span key={idx} className={styles.tagPill}>
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Resource 1: Community Food Point */}
              {filteredResources.map(r => (
                <div key={r.id} className={styles.resourceCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.resIconBox}>
                      {r.category === 'food' ? '🍲' : '🏥'}
                    </div>

                    <div className={styles.helperInfo}>
                      <div className={styles.nameRow}>
                        <h4 className={styles.helperName}>{r.name}</h4>
                        <span className={styles.statusReported}>
                          {r.informationStatus === 'reported_open'
                            ? '🟢 Reported open'
                            : '🟠 Confirmation pending'}
                        </span>
                      </div>
                      <span className={styles.distText}>
                        📍 {r.distanceKm} km away • {r.area}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={styles.routeBtn}
                      onClick={() => setRouteInfoModal(r)}
                    >
                      <span>{r.category === 'food' ? 'View route' : 'See details'}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  <p className={styles.helperDesc}>{r.description}</p>

                  <div className={styles.tagsRow}>
                    {r.tags.map((tag, idx) => (
                      <span key={idx} className={styles.resTagPill}>
                        {tag}
                      </span>
                    ))}
                    <span className={styles.lastReported}>Updated {r.lastReportedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Modal: Request Help from Aarav */}
        {showConfirmModal && (
          <div className={styles.modalOverlay} role="dialog" aria-modal="true">
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.modalEyebrow}>VOLUNTEER ASSISTANCE INVITATION</span>
                  <h3 className={styles.modalTitle}>
                    Request help from {showConfirmModal.name}?
                  </h3>
                </div>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.helperPreview}>
                  <img
                    src={showConfirmModal.avatar}
                    alt={showConfirmModal.name}
                    className={styles.modalAvatar}
                  />
                  <div>
                    <strong>{showConfirmModal.name}</strong>
                    <span>
                      {showConfirmModal.isTrustedCircle ? 'Known in My Circle · ' : ''}Available Volunteer • {showConfirmModal.neighbourhood}
                    </span>
                    <span className={styles.modalDistance}>
                      📍 Approx. {showConfirmModal.distanceKm} km straight-line distance
                    </span>
                  </div>
                </div>

                <div className={styles.shareNotice}>
                  <Info size={18} className={styles.infoIcon} />
                  <div>
                    <strong>What will be shared with {showConfirmModal.name.split(' ')[0]}?</strong>
                    <p>
                      Your requested items, general neighbourhood, and preferred contact method.
                      Your building landmarks and exact location remain private until the helper accepts.
                      All information is maintained locally in your browser demonstration.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.modalCancelBtn}
                  onClick={() => setShowConfirmModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.modalConfirmBtn}
                  onClick={() => handleConfirmInvite(showConfirmModal)}
                >
                  <span>Send assistance invitation</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Resource Route Info Modal */}
        {routeInfoModal && (
          <div className={styles.modalOverlay} role="dialog" aria-modal="true">
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.modalEyebrow}>COMMUNITY RELIEF POINT</span>
                  <h3 className={styles.modalTitle}>{routeInfoModal.name}</h3>
                  <p className={styles.modalSub}>{routeInfoModal.contactInfo}</p>
                </div>
              </div>

              <div className={styles.modalBody}>
                <p>{routeInfoModal.description}</p>
                <div className={styles.routePillBox}>
                  <span>📍 Straight-line distance: ~{routeInfoModal.distanceKm} km (Illustrative)</span>
                  <span>🧭 Direct path reference · No live GPS or transit tracking</span>
                  <span>⚡ Status: Verified open in fictional demo</span>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.modalCancelBtn}
                  onClick={() => setRouteInfoModal(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className={styles.modalConfirmBtn}
                  onClick={() => setRouteInfoModal(null)}
                >
                  <span>Return to nearby help</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
