import { YStack, ScrollView, Card, Button, Paragraph, XStack } from 'tamagui';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Feed() {
  const [properties, setProperties] = useState([
    { id: 1, title: 'Beautiful Apartment in Kampala', price: 'UGX 800,000', likes: 12, liked: false },
    { id: 2, title: 'Cozy House in Entebbe', price: 'UGX 1,200,000', likes: 8, liked: false },
  ]);
  const [aiPosts, setAIPosts] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('userToken').then(t => setToken(t || ''));

    const loadOffline = async () => {
      const cachedProps = await AsyncStorage.getItem('cachedProperties');
      const cachedAI = await AsyncStorage.getItem('cachedAIPosts');
      if (cachedProps) setProperties(JSON.parse(cachedProps));
      if (cachedAI) setAIPosts(JSON.parse(cachedAI));
      setOffline(true);
    };
    loadOffline();

    const fetchData = async () => {
      try {
        setOffline(false);
        const resAI = await fetch('https://your-rems-backend.onrender.com/ai/posts');
        const dataAI = await resAI.json();
        setAIPosts(dataAI);
        await AsyncStorage.setItem('cachedAIPosts', JSON.stringify(dataAI));

        const fakeProps = [
          { id: 1, title: 'Beautiful Apartment in Kampala', price: 'UGX 800,000', likes: 12, liked: false },
          { id: 2, title: 'Cozy House in Entebbe', price: 'UGX 1,200,000', likes: 8, liked: false },
        ];
        setProperties(fakeProps);
        await AsyncStorage.setItem('cachedProperties', JSON.stringify(fakeProps));
      } catch (e) {
        setOffline(true);
        setError('Offline – showing cached data');
      }
    };
    fetchData();
  }, []);

  const handleLike = async (id) => {
    if (!token) {
      setError('Login to like');
      return;
    }
    if (offline) {
      setError('Offline – cannot like');
      return;
    }
    try {
      const prop = properties.find(p => p.id === id);
      const newLiked = !prop.liked;
      await fetch('https://your-rems-backend.onrender.com/interactions', {
        method: newLiked ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ targetId: id, type: 'like' })
      });
      const updatedProps = properties.map(p => 
        p.id === id ? { ...p, liked: newLiked, likes: newLiked ? p.likes + 1 : p.likes - 1 } : p
      );
      setProperties(updatedProps);
      await AsyncStorage.setItem('cachedProperties', JSON.stringify(updatedProps));
    } catch (e) {
      setError('Failed to like');
    }
  };

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack space="$4" padding="$4">
        {offline && <Paragraph color="$red10" textAlign="center">Offline Mode</Paragraph>}
        {aiPosts.map(post => (
          <Card key={post._id} borderRadius="$6" padding="$4" backgroundColor="$gradient2" marginBottom="$4" animation="quick" enterStyle={{ opacity: 0, y: 20 }}>
            <Paragraph color="#1B5E20" fontStyle="italic">{post.text}</Paragraph>
            <Paragraph color="$gray10" fontSize="$3">From REMS Management</Paragraph>
          </Card>
        ))}
        {properties.map(prop => (
          <Card key={prop.id} borderRadius="$6" padding="$4" backgroundColor="$gradient1" elevation="$4" animation="quick" enterStyle={{ opacity: 0, y: 20 }}>
            <Paragraph size="$6" fontWeight="bold" color="#1B5E20">{prop.title}</Paragraph>
            <Paragraph color="#4CAF50" size="$5">{prop.price}/month</Paragraph>
            <XStack space="$3" marginTop="$3">
              <motion.div whileTap={{ scale: 1.2 }}>
                <Button onPress={() => handleLike(prop.id)} backgroundColor={prop.liked ? '#4CAF50' : '#E0E0E0'} color={prop.liked ? 'white' : '#424242'} borderRadius="$6">
                  Like ({prop.likes})
                </Button>
              </motion.div>
              <Button backgroundColor="#81C784" color="white" borderRadius="$6">Comment</Button>
              <Button backgroundColor="#66BB6A" color="white" borderRadius="$6">Follow</Button>
              <Button backgroundColor="#4CAF50" color="white" borderRadius="$6">Share</Button>
              <Button backgroundColor="#43A047" color="white" borderRadius="$6">Bookmark</Button>
            </XStack>
          </Card>
        ))}
        {error && <Paragraph color="$red10" textAlign="center">{error}</Paragraph>}
      </YStack>
    </ScrollView>
  );
}