import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  BranchCard,
  Header,
  SearchBox,
  branches,
  green,
  ink,
  styles,
} from '../../ui';

type Category = 'All' | 'Banks' | 'Bank' | 'Clinics' | 'Clinic' | 'Government';
type SortOrder = 'Recommended' | 'Shortest wait' | 'Nearest';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  openBranch: () => void;
};

const categories: Category[] = ['All', 'Banks', 'Clinics', 'Government'];
const sortOptions: SortOrder[] = ['Recommended', 'Shortest wait', 'Nearest'];

function matchesCategory(branchCategory: string, selected: Category) {
  if (selected === 'All') return true;
  const categoryName = branchCategory.split(' ·')[0].toLowerCase();
  const normalizedSelection = {
    Banks: 'bank',
    Bank: 'bank',
    Clinics: 'clinic',
    Clinic: 'clinic',
    Government: 'government',
  }[selected];
  return categoryName === normalizedSelection;
}

export default function SearchScreen({
  query,
  setQuery,
  category,
  setCategory,
  openBranch,
}: Props) {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [distanceLimit, setDistanceLimit] = useState(5);
  const [waitLimit, setWaitLimit] = useState(30);
  const [sortOrder, setSortOrder] = useState<SortOrder>('Recommended');

  const results = useMemo(() => {
    const matchingBranches = branches.filter((branch) => {
      const matchesText = `${branch.name} ${branch.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesType = matchesCategory(branch.category, category as Category);
      const distance = Number.parseFloat(branch.distance);
      const wait = Number.parseInt(branch.wait, 10);

      return (
        matchesText &&
        matchesType &&
        distance <= distanceLimit &&
        wait <= waitLimit
      );
    });

    if (sortOrder === 'Shortest wait') {
      return matchingBranches.sort(
        (a, b) => Number.parseInt(a.wait, 10) - Number.parseInt(b.wait, 10),
      );
    }

    if (sortOrder === 'Nearest') {
      return matchingBranches.sort(
        (a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance),
      );
    }

    return matchingBranches;
  }, [category, distanceLimit, query, sortOrder, waitLimit]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Header
        title="Find a service"
        subtitle="A BETTER VISIT STARTS HERE"
      />
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Service, branch or area"
      />

      <View style={styles.filterHeader}>
        <Text style={styles.sectionTitle}>Explore nearby</Text>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Show search filters"
          onPress={() => setFiltersVisible((visible) => !visible)}
          style={styles.filterButton}
        >
          <Ionicons name="options-outline" size={17} color={green} />
          <Text style={styles.filterText}>Filters</Text>
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setCategory(item)}
            style={[
              styles.chip,
              category === item && styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                category === item && styles.chipTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.filterSummary}>
        <Ionicons name="navigate-outline" size={15} color={green} />
        <Text style={styles.filterSummaryText}>Within {distanceLimit} km</Text>
        <View style={styles.summaryDivider} />
        <Ionicons name="hourglass-outline" size={14} color={green} />
        <Text style={styles.filterSummaryText}>Under {waitLimit} min wait</Text>
      </View>

      {filtersVisible && (
        <View style={localStyles.filterPanel}>
          <Text style={localStyles.panelTitle}>Distance</Text>
          <View style={localStyles.optionRow}>
            {[5, 10, 25].map((distance) => (
              <TouchableOpacity
                key={distance}
                onPress={() => setDistanceLimit(distance)}
                style={[
                  localStyles.option,
                  distanceLimit === distance && localStyles.selectedOption,
                ]}
              >
                <Text
                  style={[
                    localStyles.optionText,
                    distanceLimit === distance && localStyles.selectedOptionText,
                  ]}
                >
                  {distance} km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={localStyles.panelTitle}>Maximum wait</Text>
          <View style={localStyles.optionRow}>
            {[15, 30, 60].map((wait) => (
              <TouchableOpacity
                key={wait}
                onPress={() => setWaitLimit(wait)}
                style={[
                  localStyles.option,
                  waitLimit === wait && localStyles.selectedOption,
                ]}
              >
                <Text
                  style={[
                    localStyles.optionText,
                    waitLimit === wait && localStyles.selectedOptionText,
                  ]}
                >
                  {wait} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.resultHeader}>
        <Text style={styles.resultCount}>{results.length} places near you</Text>
        <View style={localStyles.sortGroup}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: sortOrder === option }}
              onPress={() => setSortOrder(option)}
              style={[
                localStyles.sortOption,
                sortOrder === option && localStyles.activeSortOption,
              ]}
            >
              <Text
                style={[
                  localStyles.sortOptionText,
                  sortOrder === option && localStyles.activeSortText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {results.map((branch) => (
        <BranchCard key={branch.name} branch={branch} onPress={openBranch} />
      ))}

      {results.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="search-outline" size={30} color="#91A59B" />
          <Text style={styles.emptyTitle}>No places found</Text>
          <Text style={styles.emptyCopy}>
            Try a wider distance or a shorter search.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  filterPanel: {
    padding: 13,
    marginTop: -8,
    marginBottom: 16,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9EDE6',
  },
  panelTitle: {
    marginBottom: 8,
    color: ink,
    fontSize: 11,
    fontWeight: '700',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 13,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#F4F6F1',
  },
  selectedOption: { backgroundColor: '#E4F0E7' },
  optionText: { color: '#68776F', fontSize: 10, fontWeight: '600' },
  selectedOptionText: { color: green },
  sortGroup: { flexDirection: 'row', gap: 4 },
  sortOption: { paddingHorizontal: 6, paddingVertical: 5, borderRadius: 8 },
  activeSortOption: { backgroundColor: '#EAF2EB' },
  sortOptionText: { color: '#85928B', fontSize: 8 },
  activeSortText: { color: green, fontWeight: '700' },
});
