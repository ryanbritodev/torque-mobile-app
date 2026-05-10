import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { VehicleCard } from '../../components/VehicleCard';
import { MOCK_VEHICLES } from '@/services/mockData';

type Filter = 'all' | 'inNetwork' | 'outNetwork' | 'atRisk';

export default function VehiclesScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const router = useRouter();

  const filtered = MOCK_VEHICLES.filter(v => {
    const q = search.toLowerCase();

    const matchSearch =
      v.model.toLowerCase().includes(q) ||
      v.owner.toLowerCase().includes(q) ||
      v.plate.toLowerCase().includes(q);

    const matchFilter =
      filter === 'all'
        ? true
        : filter === 'inNetwork'
        ? v.inFordNetwork
        : filter === 'outNetwork'
        ? !v.inFordNetwork
        : v.riskScore >= 60;

    return matchSearch && matchFilter;
  });

  const filterBtns: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'inNetwork', label: 'Na Rede' },
    { key: 'outNetwork', label: 'Fora' },
    { key: 'atRisk', label: 'Em Risco' },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={18}
            color={Colors.gray500}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por modelo, dono ou placa..."
            placeholderTextColor={Colors.gray500}
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons
                name="close-circle"
                size={18}
                color={Colors.gray300}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filterBtns.map(f => {
            const active = filter === f.key;

            return (
              <TouchableOpacity
                key={f.key}
                activeOpacity={0.85}
                style={[
                  styles.filterBtn,
                  active && styles.filterBtnActive,
                ]}
                onPress={() => setFilter(f.key)}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.filterTextActive,
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <Text style={styles.countText}>
        {filtered.length} veículo
        {filtered.length !== 1 ? 's' : ''} encontrado
        {filtered.length !== 1 ? 's' : ''}
      </Text>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
      >
        {filtered.map(v => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            onPress={() =>
              router.push({
                pathname: '/vehicle-detail',
                params: { id: v.id },
              })
            }
          />
        ))}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons
              name="car-outline"
              size={48}
              color={Colors.gray300}
            />

            <Text style={styles.emptyText}>
              Nenhum veículo encontrado
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },


  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.white,

    borderRadius: 18,

    paddingHorizontal: 14,
    height: 48,

    gap: 10,

    borderWidth: 1,
    borderColor: '#E6EAF0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.black,
  },


  filtersWrapper: {
    paddingBottom: 10,
  },

  filtersContent: {
    paddingHorizontal: 16,
    gap: 10,
    alignItems: 'center',
  },

  filterBtn: {
    height: 38,

    paddingHorizontal: 18,

    borderRadius: 999,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E4E8EE',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,

    elevation: 1,
  },

  filterBtnActive: {
    backgroundColor: '#0B3B82',
    borderColor: '#0B3B82',
  },

  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7C8798',
  },

  filterTextActive: {
    color: '#FFFFFF',
  },


  countText: {
    fontSize: 11,
    fontWeight: '600',

    color: Colors.gray500,

    paddingHorizontal: 16,
    paddingBottom: 10,
  },


  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },


  empty: {
    alignItems: 'center',
    paddingTop: 70,
    gap: 12,
  },

  emptyText: {
    fontSize: 15,
    color: Colors.gray500,
  },
});