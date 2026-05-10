import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => { SplashScreen.hideAsync(); }, []);
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.fordBlue} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="vehicle-detail" options={{
          headerShown: true,
          title: 'Detalhes do Veículo',
          headerStyle: { backgroundColor: Colors.fordBlue },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700' },
          presentation: 'card',
        }} />
      </Stack>
    </>
  );
}
