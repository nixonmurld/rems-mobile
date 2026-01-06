import { YStack, Input, Button, Paragraph, XStack } from 'tamagui';
import { useState } from 'react';

export default function Survey() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const sendFeedback = async () => {
    if (!feedback || rating === 0) {
      setError('Complete form');
      return;
    }
    try {
      await fetch('https://your-rems-backend.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback, rating })
      });
      setError('Thanks!');
    } catch (e) {
      setError('Failed');
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" space="$4">
      <Paragraph size="$6" fontWeight="bold" color="#1B5E20">Rate REMS</Paragraph>
      <XStack space="$1" justifyContent="center">
        {[1,2,3,4,5].map(i => (
          <Paragraph key={i} color={i <= rating ? '#FFD700' : '#BDBDBD'} onPress={() => setRating(i)}>★</Paragraph>
        ))}
      </XStack>
      <Input placeholder="Your thoughts..." value={feedback} onChangeText={setFeedback} size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#F5F5F5" multiline />
      <Button onPress={sendFeedback} backgroundColor="#4CAF50" color="white" borderRadius="$6">Send</Button>
      {error && <Paragraph color="$red10" textAlign="center">{error}</Paragraph>}
    </YStack>
  );
}