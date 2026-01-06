import { YStack, Button, Paragraph, Input, ScrollView, Card } from 'tamagui';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function Reminders() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    SecureStore.getItemAsync('userToken').then(t => setToken(t || ''));
    // Fake reminders
    setReminders([
      { id: 1, phone: '+256123456789', message: 'Rent due tomorrow', status: 'sent' },
    ]);
  }, []);

  const sendReminder = async () => {
    if (!phone || !message) {
      setError('Fill fields');
      return;
    }
    try {
      const role = await SecureStore.getItemAsync('userRole');
      if (role !== 'admin') {
        setError('Admin only');
        return;
      }
      const res = await fetch('https://your-rems-backend.onrender.com/reminders/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ phone, message })
      });
      const data = await res.json();
      if (data.SMSMessageData) {
        setError('Sent!');
        setReminders([...reminders, { id: reminders.length + 1, phone, message, status: 'sent' }]);
      } else {
        setError('Failed');
      }
    } catch (e) {
      setError('Error');
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" space="$4">
      <Paragraph size="$6" fontWeight="bold" color="#1B5E20">Send Reminder</Paragraph>
      <Input placeholder="Phone (+256...)" value={phone} onChangeText={setPhone} size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#F5F5F5" color="$color" />
      <Input placeholder="Message" value={message} onChangeText={setMessage} size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#F5F5F5" color="$color" />
      <Button onPress={sendReminder} backgroundColor="#4CAF50" color="white" borderRadius="$6">Send SMS Reminder</Button>
      {error && <Paragraph color="$red10" textAlign="center">{error}</Paragraph>}

      <Paragraph size="$6" fontWeight="bold" color="#1B5E20">Sent Reminders</Paragraph>
      <ScrollView>
        {reminders.map(r => (
          <Card key={r.id} borderRadius="$6" padding="$4" backgroundColor="$gradient1" marginBottom="$4">
            <Paragraph color="#4CAF50">Phone: {r.phone}</Paragraph>
            <Paragraph color="#757575">Message: {r.message}</Paragraph>
            <Paragraph color="#1B5E20">Status: {r.status}</Paragraph>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
}