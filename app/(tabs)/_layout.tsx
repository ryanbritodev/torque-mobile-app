import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

function LogoutButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.replace('/login')} style={{ marginRight: 16 }}>
      <Ionicons name="log-out-outline" size={22} color={Colors.white} />
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.fordSkyBlue,
      tabBarInactiveTintColor: Colors.gray300,
      tabBarStyle: { backgroundColor: Colors.tabBar, borderTopWidth: 0, elevation: 0, shadowOpacity: 0, height: 60, paddingBottom: 8 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      headerStyle: { backgroundColor: Colors.fordBlue },
      headerTintColor: Colors.white,
      headerTitleStyle: { fontWeight: '800', fontSize: 17 },
      headerRight: () => <LogoutButton />,
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Dashboard',
        tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" size={size} color={color} />,
        headerTitle: 'Torque  ·  Dashboard',
      }} />
      <Tabs.Screen name="vehicles" options={{
        title: 'Frota',
        tabBarIcon: ({ color, size }) => <Ionicons name="car-sport" size={size} color={color} />,
        headerTitle: 'Torque  ·  Frota',
      }} />
      <Tabs.Screen name="leads" options={{
        title: 'Leads',
        tabBarIcon: ({ color, size }) => <Ionicons name="flash" size={size} color={color} />,
        headerTitle: 'Torque  ·  Leads',
      }} />
      <Tabs.Screen name="notifications" options={{
        title: 'Alertas',
        tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={size} color={color} />,
        headerTitle: 'Torque  ·  Alertas',
      }} />
    </Tabs>
  );
}
