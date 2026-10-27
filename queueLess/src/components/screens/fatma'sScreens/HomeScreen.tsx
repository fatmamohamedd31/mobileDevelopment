
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  BranchCard,
  Header,
  IconButton,
  SearchBox,
  branches,
  green,
  ink,
  muted,
  styles,
} from '../../ui';
import type { Screen } from '../../ui';

type Props = {
  setScreen: (screen: Screen) => void;
  setCategory: (category: string) => void;
  openBranch: () => void;
  query: string;
  setQuery: (value: string) => void;
};

export default function HomeScreen({
  setScreen,
  setCategory,
  openBranch,
  query,
  setQuery,
}: Props) {
  const today = new Date()
    .toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    .toUpperCase();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Header
        title="Good morning, Fatma"
        subtitle={today}
        right={
          <IconButton
            name="notifications-outline"
            onPress={() => {}}
          />
        }
      />

      <TouchableOpacity style={styles.locationRow}>
        <Ionicons name="location" size={16} color={green} />
        <Text style={styles.locationText}>Cairo, Egypt</Text>
        <Ionicons name="chevron-down" size={14} color={muted} />
      </TouchableOpacity>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.heroOverline}>YOUR TIME, WELL SPENT</Text>
          <Text style={styles.heroTitle}>
            {'Skip the\n'}long wait.
          </Text>
          <Text style={styles.heroCopy}>
            Find the right place, at the right time.
          </Text>
        </View>

        <View style={styles.heroArt}>
          <View style={styles.clockFace}>
            <Ionicons
              name="time-outline"
              size={42}
              color="#D9EEE3"
            />
            <Text style={styles.clockLabel}>12 min</Text>
          </View>
          <View style={styles.heroSpark}>
            <Ionicons
              name="sparkles"
              size={15}
              color="#F4D58D"
            />
          </View>
        </View>
      </View>

      <SearchBox
        value={query}
        onChange={setQuery}
        onFocus={() => setScreen('search')}
        placeholder="What do you need today?"
      />

      {/* Browse services */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Browse services</Text>
        <TouchableOpacity onPress={() => setScreen('search')}>
          <Text style={styles.link}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        {[
          {
            label: 'Banks',
            icon: 'business-outline' as const,
            tint: '#E9F0E6',
            color: '#537653',
          },
          {
            label: 'Clinics',
            icon: 'medkit-outline' as const,
            tint: '#F9EDE7',
            color: '#C47A57',
          },
          {
            label: 'Government',
            icon: 'documents-outline' as const,
            tint: '#E9EDF6',
            color: '#607EAE',
          },
        ].map((c) => (
          <TouchableOpacity
            key={c.label}
            onPress={() => {
              setCategory(
                c.label === 'Government'
                  ? 'Government'
                  : c.label.slice(0, -1)
              );
              setScreen('search');
            }}
            style={styles.category}
          >
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: c.tint },
              ]}
            >
              <Ionicons
                name={c.icon}
                size={21}
                color={c.color}
              />
            </View>
            <Text style={styles.categoryLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nearby branches */}
      <View style={styles.sectionHead}>
        <View>
          <Text style={styles.sectionTitle}>Nearby branches</Text>
          <Text style={styles.sectionSub}>
            Live updates around you
          </Text>
        </View>

        <TouchableOpacity
          style={styles.mapLink}
          onPress={() => setScreen('search')}
        >
          <Ionicons name="map-outline" size={15} color={green} />
          <Text style={styles.link}>Map</Text>
        </TouchableOpacity>
      </View>

      {branches.slice(0, 2).map((b) => (
        <BranchCard
          key={b.name}
          branch={b}
          onPress={openBranch}
        />
      ))}

      {/* Existing queue tools */}
      <View style={styles.sectionHead}>
        <View>
          <Text style={styles.sectionTitle}>Queue tools</Text>
          <Text style={styles.sectionSub}>
            Plan around the crowd
          </Text>
        </View>
        <Ionicons
          name="analytics-outline"
          size={19}
          color={green}
        />
      </View>

      <View style={styles.queueTools}>
        <TouchableOpacity
          style={styles.queueTool}
          onPress={() => setScreen('queue')}
        >
          <View style={styles.queueToolIcon}>
            <Ionicons
              name="pulse-outline"
              size={18}
              color={green}
            />
          </View>
          <Text style={styles.queueToolTitle}>Live queue</Text>
          <Text style={styles.queueToolSub}>
            See the latest wait
          </Text>
          <Ionicons
            name="arrow-forward"
            size={15}
            color={green}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.queueTool}
          onPress={() => setScreen('compare')}
        >
          <View
            style={[
              styles.queueToolIcon,
              { backgroundColor: '#F3EEE3' },
            ]}
          >
            <Ionicons
              name="git-compare-outline"
              size={18}
              color="#A2773E"
            />
          </View>
          <Text style={styles.queueToolTitle}>Compare</Text>
          <Text style={styles.queueToolSub}>
            Nearby branches
          </Text>
          <Ionicons
            name="arrow-forward"
            size={15}
            color={green}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.queueTool}
          onPress={() => setScreen('trends')}
        >
          <View
            style={[
              styles.queueToolIcon,
              { backgroundColor: '#E9EDF6' },
            ]}
          >
            <Ionicons
              name="bar-chart-outline"
              size={18}
              color="#607EAE"
            />
          </View>
          <Text style={styles.queueToolTitle}>Queue trends</Text>
          <Text style={styles.queueToolSub}>
            Find a quieter time
          </Text>
          <Ionicons
            name="arrow-forward"
            size={15}
            color={green}
          />
        </TouchableOpacity>
      </View>

      {/* NEW: Smart Planning */}
      <View style={styles.sectionHead}>
        <View>
          <Text style={styles.sectionTitle}>Smart Planning</Text>
          <Text style={styles.sectionSub}>
            Make your next visit easier
          </Text>
        </View>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={green}
        />
      </View>

      <View style={{ gap: 12, marginBottom: 20 }}>
        {/* Screen 7 */}
        <TouchableOpacity
          onPress={() => setScreen('bestTime' as Screen)}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#E9F3EC',
            borderRadius: 18,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              backgroundColor: '#D4E9DA',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 13,
            }}
          >
            <Ionicons
              name="time-outline"
              size={24}
              color={green}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: ink, fontSize: 15, fontWeight: '700' }}>
              Best Time to Visit
            </Text>
            <Text
              style={{
                color: muted,
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Discover quieter days and time slots
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={green}
          />
        </TouchableOpacity>

        {/* Screen 8 */}
        <TouchableOpacity
          onPress={() => setScreen('planner' as Screen)}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#F3EEE3',
            borderRadius: 18,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              backgroundColor: '#E9DEC8',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 13,
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#A2773E"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: ink, fontSize: 15, fontWeight: '700' }}>
              Visit Planner
            </Text>
            <Text
              style={{
                color: muted,
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Choose a branch, date, and time
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#A2773E"
          />
        </TouchableOpacity>

        {/* Screen 9 */}
        <TouchableOpacity
          onPress={() => setScreen('notifications' as Screen)}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#E9EDF6',
            borderRadius: 18,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              backgroundColor: '#D9E1F0',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 13,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#607EAE"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: ink, fontSize: 15, fontWeight: '700' }}>
              Notifications & Alerts
            </Text>
            <Text
              style={{
                color: muted,
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Get updates when queues become shorter
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#607EAE"
          />
        </TouchableOpacity>
      </View>

      {/* Recently viewed */}
      <View style={styles.recentRow}>
        <View style={styles.recentIcon}>
          <Ionicons
            name="time-outline"
            size={18}
            color={green}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.recentTitle}>Recently viewed</Text>
          <Text style={styles.recentSub}>
            Dokki Civil Registry · yesterday
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={17}
          color="#98A29D"
        />
      </View>
    </ScrollView>
  );
}
