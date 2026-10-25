import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  Search
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './ResourcesView.module.css';

export const ResourcesView: React.FC = () => {
  const { resources, navigateTo } = useCareContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(res => {
    const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span>—</span>
            <span>CRISIS AID DIRECTORY • PREVIEW</span>
          </div>
          <h1 className={styles.title}>Essential Services & Community Resources</h1>
          <p className={styles.subtitle}>
            Verified operating status of community kitchens, food distribution points, neighbourhood clinics, and supply stores across East Bengaluru in April 2018.
          </p>

          <div className={styles.phaseNotice}>
            <Compass size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Local Signal Interactive Verification Engine arriving in Phase 06.</strong> Current listings reflect real-time operational status updates verified by local volunteers and resident welfare associations.
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{
            position: 'relative',
            flex: '1',
            minWidth: '260px'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#526072' }} />
            <input
              type="text"
              placeholder="Search by resource name, area, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px 14px 10px 42px',
                borderRadius: '12px',
                border: '1px solid #DDD8CE',
                background: '#FFFFFF',
                fontSize: '0.9375rem',
                color: '#102744'
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersBar}>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Resources ({resources.length})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedCategory === 'food' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedCategory('food')}
          >
            Food & Water
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedCategory === 'supplies' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedCategory('supplies')}
          >
            Essential Supplies & Rations
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedCategory === 'medical' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedCategory('medical')}
          >
            Clinics & Medical Support
          </button>
        </div>

        {/* Resources Grid */}
        <div className={styles.grid}>
          {filteredResources.map(res => (
            <div key={res.id} className={styles.card}>
              <div>
                <div className={styles.cardTop}>
                  <span className={styles.categoryBadge}>
                    {res.category.toUpperCase()}
                  </span>
                  {res.informationStatus === 'reported_open' ? (
                    <span className={styles.statusPillOpen}>
                      Reported Open
                    </span>
                  ) : (
                    <span className={styles.statusPillPending}>
                      Confirmation Pending
                    </span>
                  )}
                </div>

                <h3 className={styles.cardName}>{res.name}</h3>
                <p className={styles.cardDesc}>{res.description}</p>

                <div className={styles.cardMeta}>
                  <div className={styles.metaRow}>
                    <MapPin size={14} />
                    <span>{res.area} • {res.distanceKm} km away</span>
                  </div>
                  <div className={styles.metaRow}>
                    <Clock size={14} />
                    <span>Status checked {res.lastReportedAt}</span>
                  </div>
                  {res.contactInfo && (
                    <div className={styles.metaRow}>
                      <span style={{ fontWeight: 600 }}>Landmark:</span>
                      <span>{res.contactInfo}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.cardBottom}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {res.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        background: '#FAF7F0',
                        border: '1px solid #DDD8CE',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        color: '#526072'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.cardActionBtn}
                  onClick={() => navigateTo('help_now_landing')}
                >
                  <span>Request Delivery Instead</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
