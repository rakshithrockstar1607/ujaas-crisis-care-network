import React, { useState, useMemo } from 'react';
import {
  Search,
  Map as MapIcon,
  CircleDot,
  List as ListIcon,
  ArrowLeft,
  AlertCircle,
  HeartHandshake,
  Calendar
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { CareMap } from './CareMap';
import { CircleConstellation } from './CircleConstellation';
import { ContactListView } from './ContactListView';
import { ContactDetailDrawer } from './ContactDetailDrawer';
import { Contact } from '../../types/care';
import styles from './MyCircleView.module.css';

export const MyCircleView: React.FC = () => {
  const {
    contacts,
    openContactDrawer,
    circleLayoutMode,
    setCircleLayoutMode,
    searchQuery,
    setSearchQuery,
    needsAttentionCount,
    upcomingCheckInsCount,
    navigateTo
  } = useCareContext();

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const contactList = useMemo(() => Object.values(contacts), [contacts]);

  // Derived available helper count
  const availableHelperCount = useMemo(() => {
    return contactList.filter(c => c.volunteerStatus === 'available').length;
  }, [contactList]);

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return contactList.filter(c => {
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
      if (activeFilter === 'needs_attention') {
        return c.concernStatus === 'needs_review';
      }
      if (activeFilter === 'available') {
        return c.volunteerStatus === 'available';
      }
      if (activeFilter === 'busy') {
        return c.volunteerStatus === 'busy';
      }
      if (activeFilter === 'my_tasks') {
        return c.isUser || c.id === 'savitri';
      }
      return true;
    });
  }, [contactList, activeFilter, searchQuery]);

  const handleSelectContact = (contactOrId: Contact | string) => {
    const id = typeof contactOrId === 'string' ? contactOrId : contactOrId.id;
    openContactDrawer(id);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Navigation Breadcrumb */}
        <button
          type="button"
          className={styles.backHomeLink}
          onClick={() => navigateTo('hero')}
          aria-label="Return to landing hero"
        >
          <ArrowLeft size={16} />
          <span>Back to Overview</span>
        </button>

        {/* Top Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.titleCol}>
            <span className={styles.eyebrow}>MY CIRCLE</span>
            <h1 className={styles.headline}>
              The people you know. The care they need.
            </h1>
            <p className={styles.subtitle}>
              Your trusted circle, their current status, and how you can help.
            </p>
          </div>

          {/* 3 Metric Cards */}
          <div className={styles.statsRow} role="region" aria-label="Circle status summary">
            {/* Card 1: Needs attention */}
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{needsAttentionCount}</span>
              <div className={styles.statMeta}>
                <div className={styles.statIconWrap}>
                  <AlertCircle size={20} color="#E05624" />
                </div>
                <span className={styles.statLabel}>Needs attention</span>
              </div>
            </div>

            {/* Card 2: Available to help */}
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{availableHelperCount}</span>
              <div className={styles.statMeta}>
                <div className={styles.statIconWrap}>
                  <HeartHandshake size={20} color="#2E7D32" />
                </div>
                <span className={styles.statLabel}>Available to help</span>
              </div>
            </div>

            {/* Card 3: Upcoming check-ins */}
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{upcomingCheckInsCount}</span>
              <div className={styles.statMeta}>
                <div className={styles.statIconWrap}>
                  <Calendar size={20} color="#1A56DB" />
                </div>
                <span className={styles.statLabel}>Upcoming check-ins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Row: Search + Filter Chips + Segmented Switcher */}
        <div className={styles.controlsRow}>
          <div className={styles.searchAndFilters}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search people, locations, or needs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search people, locations, or needs"
              />
            </div>

            {/* Filter Chips */}
            <div className={styles.filterChips} role="group" aria-label="Filter circle members">
              <button
                type="button"
                className={`${styles.chipBtn} ${activeFilter === 'all' ? styles.chipBtnActive : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All 7
              </button>
              <button
                type="button"
                className={`${styles.chipBtn} ${activeFilter === 'needs_attention' ? styles.chipBtnActive : ''}`}
                onClick={() => setActiveFilter('needs_attention')}
              >
                Needs attention
              </button>
              <button
                type="button"
                className={`${styles.chipBtn} ${activeFilter === 'available' ? styles.chipBtnActive : ''}`}
                onClick={() => setActiveFilter('available')}
              >
                Available helpers
              </button>
              <button
                type="button"
                className={`${styles.chipBtn} ${activeFilter === 'busy' ? styles.chipBtnActive : ''}`}
                onClick={() => setActiveFilter('busy')}
              >
                Busy
              </button>
              <button
                type="button"
                className={`${styles.chipBtn} ${activeFilter === 'my_tasks' ? styles.chipBtnActive : ''}`}
                onClick={() => setActiveFilter('my_tasks')}
              >
                My tasks
              </button>
            </div>
          </div>

          {/* 3-Way Segmented Switcher: Map | Circle | List */}
          <div className={styles.segmentedSwitcher} role="group" aria-label="View layout toggle">
            <button
              type="button"
              className={`${styles.switchOption} ${circleLayoutMode === 'map' ? styles.switchOptionActive : ''}`}
              onClick={() => setCircleLayoutMode('map')}
              aria-label="Interactive map view"
              title="Interactive map view"
            >
              <MapIcon size={16} />
              <span>Map</span>
            </button>
            <button
              type="button"
              className={`${styles.switchOption} ${circleLayoutMode === 'circle' ? styles.switchOptionActive : ''}`}
              onClick={() => setCircleLayoutMode('circle')}
              aria-label="Constellation network view"
              title="Constellation network view"
            >
              <CircleDot size={16} />
              <span>Circle</span>
            </button>
            <button
              type="button"
              className={`${styles.switchOption} ${circleLayoutMode === 'list' ? styles.switchOptionActive : ''}`}
              onClick={() => setCircleLayoutMode('list')}
              aria-label="Contact list view"
              title="Contact list view"
            >
              <ListIcon size={16} />
              <span>List</span>
            </button>
          </div>
        </div>

        {/* Main Stage */}
        <div className={styles.mainStage}>
          {circleLayoutMode === 'map' && (
            <CareMap
              contacts={contacts}
              onSelectContact={handleSelectContact}
              filter={activeFilter}
              searchQuery={searchQuery}
            />
          )}

          {circleLayoutMode === 'circle' && (
            <CircleConstellation
              contacts={filteredContacts}
              onSelectContact={handleSelectContact}
            />
          )}

          {circleLayoutMode === 'list' && (
            <ContactListView
              contacts={filteredContacts}
              onSelectContact={handleSelectContact}
            />
          )}
        </div>
      </div>

      {/* Slide-over Contact Detail Drawer */}
      <ContactDetailDrawer />
    </div>
  );
};