import { Tabs } from 'expo-router';
import { House, Heart, MessageCircle, Users, Calendar, Bell, Cog, BarChart2 } from '@tamagui/lucide-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#4CAF50', headerShown: false }}>
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color }) => <House color={color} /> }} />
      <Tabs.Screen name="feed" options={{ title: 'Feed', tabBarIcon: ({ color }) => <Heart color={color} /> }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: ({ color }) => <MessageCircle color={color} /> }} />
      <Tabs.Screen name="freelancers" options={{ title: 'Freelancers', tabBarIcon: ({ color }) => <Users color={color} /> }} />
      <Tabs.Screen name="bookings" options={{ title: 'Bookings', tabBarIcon: ({ color }) => <Calendar color={color} /> }} />
      <Tabs.Screen name="reminders" options={{ title: 'Reminders', tabBarIcon: ({ color }) => <Bell color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Cog color={color} /> }} />
      <Tabs.Screen name="survey" options={{ title: 'Survey', tabBarIcon: ({ color }) => <BarChart2 color={color} /> }} />
    </Tabs>
  );
}