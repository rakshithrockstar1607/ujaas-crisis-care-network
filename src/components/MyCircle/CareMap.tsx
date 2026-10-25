import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { Plus, Minus, Crosshair, Layers } from 'lucide-react';
import { Contact } from '../../types/care';
import styles from './CareMap.module.css';

interface CareMapProps {
  contacts: Record<string, Contact>;
  onSelectContact: (id: string) => void;
  selectedContactId?: string | null;
  filter?: string;
  searchQuery?: string;
}

export const CareMap: React.FC<CareMapProps> = ({
  contacts,
  onSelectContact,
  selectedContactId,
  filter = 'all',
  searchQuery = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const linesGroupRef = useRef<L.LayerGroup | null>(null);
  const [activeTileLayer, setActiveTileLayer] = useState<'voyager' | 'positron'>('voyager');
  const [activeContactId, setActiveContactId] = useState<string | null>(selectedContactId || null);

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return Object.values(contacts).filter(c => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          c.name.toLowerCase().includes(q) ||
          c.relationship.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          (c.capabilities && c.capabilities.some(cap => cap.toLowerCase().includes(q)));
        if (!matches) return false;
      }

      // Filter chips
      if (filter === 'needs_attention') {
        return c.concernStatus === 'needs_review';
      }
      if (filter === 'available') {
        return c.volunteerStatus === 'available';
      }
      if (filter === 'busy') {
        return c.volunteerStatus === 'busy';
      }
      if (filter === 'my_tasks') {
        return c.isUser || c.id === 'savitri';
      }
      return true;
    });
  }, [contacts, filter, searchQuery]);

  // Initialise Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center coordinates: Indiranagar, Bengaluru
    const map = L.map(mapContainerRef.current, {
      center: [12.966, 77.640],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      fadeAnimation: true
    });

    // Default tile layer: Clean OpenStreetMap (Watermark-free, high-resolution)
    const baseTiles = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        className: 'civic-map-tiles'
      }
    ).addTo(map);

    (map as any)._customTileLayer = baseTiles;

    const linesGroup = L.layerGroup().addTo(map);
    linesGroupRef.current = linesGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Toggle Tile Layer
  const toggleTileLayer = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if ((map as any)._customTileLayer) {
      map.removeLayer((map as any)._customTileLayer);
    }

    const nextMode = activeTileLayer === 'voyager' ? 'positron' : 'voyager';
    const tileUrl =
      nextMode === 'voyager'
        ? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

    const newLayer = L.tileLayer(tileUrl, {
      subdomains: 'abc',
      maxZoom: 19,
      className: 'civic-map-tiles'
    }).addTo(map);

    (map as any)._customTileLayer = newLayer;
    setActiveTileLayer(nextMode);
  };

  // Render Markers and Relationship Lines
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    if (linesGroupRef.current) {
      linesGroupRef.current.clearLayers();
    }

    const aaravContact = contacts.aarav;
    const aaravCoords = aaravContact?.geoCoordinates || { lat: 12.9719, lng: 77.6412 };

    filteredContacts.forEach(contact => {
      const coords = contact.geoCoordinates || { lat: 12.9719, lng: 77.6412 };

      // Relationship connector line to Aarav (except Aarav himself)
      if (!contact.isUser && linesGroupRef.current) {
        const polyline = L.polyline(
          [
            [aaravCoords.lat, aaravCoords.lng],
            [coords.lat, coords.lng]
          ],
          {
            color: '#64748B',
            weight: 1.5,
            dashArray: '5, 8',
            opacity: 0.65
          }
        );
        linesGroupRef.current.addLayer(polyline);
      }

      // Marker Icon creation
      let pinClass = 'marker-pin-available';
      let dotClass = 'badge-dot-green';
      let subClass = 'sub-green';
      let subText = 'Available';

      if (contact.isUser) {
        pinClass = 'marker-pin-aarav';
        dotClass = 'badge-dot-green';
        subClass = 'sub-aarav';
        subText = 'You';
      } else if (contact.concernStatus === 'needs_review') {
        pinClass = 'marker-pin-savitri';
        dotClass = 'badge-dot-red';
        subClass = 'sub-red';
        subText = 'Needs review 🔴';
      } else if (contact.volunteerStatus === 'busy') {
        pinClass = 'marker-pin-busy';
        dotClass = 'badge-dot-blue';
        subClass = 'sub-blue';
        subText = 'Busy';
      } else if (contact.volunteerStatus === 'unknown') {
        pinClass = 'marker-pin-unknown';
        dotClass = 'badge-dot-grey';
        subClass = 'sub-grey';
        subText = 'Unknown';
      }

      const radarHtml = contact.isUser
        ? `
        <div class="radar-halo-container" aria-hidden="true">
          <div class="radar-ring"></div>
          <div class="radar-ring"></div>
          <div class="radar-ring"></div>
        </div>
      `
        : '';

      const alertIcon = contact.concernStatus === 'needs_review' ? '!' : '';

      const html = `
        <div class="ujaas-marker-wrap">
          ${radarHtml}
          <div class="marker-pin ${pinClass}">
            <img src="${contact.avatar}" alt="${contact.name}" class="marker-img" />
            <span class="marker-badge-dot ${dotClass}">${alertIcon}</span>
          </div>
          <div class="marker-pill ${contact.isUser ? 'marker-pill-aarav' : ''}">
            <span class="marker-pill-name">${contact.name}</span>
            <span class="marker-pill-sub ${subClass}">${subText}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html,
        iconSize: [120, 80],
        iconAnchor: [60, 40]
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveContactId(contact.id);
        onSelectContact(contact.id);
        map.flyTo([coords.lat, coords.lng], Math.max(map.getZoom(), 14), {
          duration: 0.8
        });
      });

      markersRef.current[contact.id] = marker;
    });
  }, [filteredContacts, contacts, onSelectContact]);

  // Controls: Zoom In, Zoom Out, Fit All
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleFitAll = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const latLngs = Object.values(contacts)
      .filter(c => c.geoCoordinates)
      .map(c => [c.geoCoordinates!.lat, c.geoCoordinates!.lng] as [number, number]);

    if (latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  };

  const handleContactCardClick = (contact: Contact) => {
    setActiveContactId(contact.id);
    if (contact.id === 'savitri') {
      onSelectContact('savitri');
    }
    if (contact.geoCoordinates && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [contact.geoCoordinates.lat, contact.geoCoordinates.lng],
        14,
        { duration: 0.8 }
      );
    }
  };

  return (
    <div className={styles.mapWrapper}>
      {/* Map Surface */}
      <div ref={mapContainerRef} className={styles.mapContainer} />

      {/* Floating Left Contacts Drawer / Card */}
      <div className={styles.floatingContactsCard}>
        <div className={styles.contactsCardHeader}>
          {filteredContacts.length} people in your circle
        </div>
        <ul className={styles.contactsList}>
          {filteredContacts.map(c => {
            let dotStyle = styles.statusDotGreen;
            if (c.concernStatus === 'needs_review') dotStyle = styles.statusDotRed;
            else if (c.volunteerStatus === 'busy') dotStyle = styles.statusDotBlue;
            else if (c.volunteerStatus === 'unknown') dotStyle = styles.statusDotGrey;

            return (
              <li key={c.id}>
                <button
                  type="button"
                  className={`${styles.contactItemBtn} ${activeContactId === c.id ? styles.contactItemActive : ''}`}
                  onClick={() => handleContactCardClick(c)}
                  aria-label={`View ${c.name} on map`}
                >
                  <img src={c.avatar} alt={c.name} className={styles.itemAvatar} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{c.name}</span>
                    <span className={styles.itemRole}>{c.relationship}</span>
                  </div>
                  <span className={`${styles.itemStatusDot} ${dotStyle}`} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Map Controls */}
      <div className={styles.mapControls}>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={handleZoomIn}
          aria-label="Zoom in"
          title="Zoom in"
        >
          <Plus size={18} />
        </button>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={handleZoomOut}
          aria-label="Zoom out"
          title="Zoom out"
        >
          <Minus size={18} />
        </button>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={handleFitAll}
          aria-label="Center all circle members"
          title="Center all members"
        >
          <Crosshair size={18} />
        </button>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={toggleTileLayer}
          aria-label="Toggle map view mode"
          title="Toggle map style"
        >
          <Layers size={18} />
        </button>
      </div>

      {/* Scale Indicator */}
      <div className={styles.scaleIndicator}>
        <div className={styles.scaleBar} />
        <span className={styles.scaleText}>2 km</span>
      </div>

      {/* Legend Bar */}
      <div className={styles.legendPill}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.statusDotRed}`} />
          <span>Needs attention</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.statusDotGreen}`} />
          <span>Available</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.statusDotBlue}`} />
          <span>Busy</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.statusDotGrey}`} />
          <span>Unknown</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendRelationship}>--- Relationship</span>
        </div>
      </div>
    </div>
  );
};