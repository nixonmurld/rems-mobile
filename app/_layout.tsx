import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
      </Stack>
    </TamaguiProvider>
  );
}