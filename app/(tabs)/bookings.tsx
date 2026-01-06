import { YStack, Input, Button, Paragraph, Card, ScrollView, XStack } from 'tamagui';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('userToken').then(t => setToken(t || ''));
    const fetchBookings = async () => {
      try {
        const res = await fetch('https://your-rems-backend.onrender.com/bookings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setBookings(data);
      } catch (e) {
        setError('Failed to load bookings');
      }
    };
    fetchBookings();
  }, [token]);

  const handleBook = async () => {
    try {
      const res = await fetch('https://your-rems-backend.onrender.com/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ propertyId: Number(propertyId), startDate: startDate.toISOString(), endDate: endDate.toISOString(), amount: Number(amount) })
      });
      const bookingData = await res.json();
      if (res.status === 201) {
        const payRes = await fetch('https://your-rems-backend.onrender.com/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ bookingId: bookingData._id, amount: Number(amount), currency: 'UGX' })
        });
        const payData = await payRes.json();
        if (payData.status === 'paid') {
          setError('Booked and paid!');
        } else {
          setError('Payment failed');
        }
      } else {
        setError('Booking failed');
      }
    } catch (e) {
      setError('Error');
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" space="$4">
      <Paragraph size="$6" fontWeight="bold" color="#1B5E20">New Booking</Paragraph>
      <Input placeholder="Property ID" value={propertyId} onChangeText={setPropertyId} size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#F5F5F5" color="$color" />
      <Button onPress={() => setShowStartPicker(true)} backgroundColor="#F5F5F5" color="$color" borderRadius="$6">
        Start Date: {startDate.toDateString()}
      </Button>
      {showStartPicker && (
        <DateTimePicker value={startDate} mode="date" onChange={(event, date) => {
          setShowStartPicker(false);
          if (date) setStartDate(date);
        }} />
      )}
      <Button onPress={() => setShowEndPicker(true)} backgroundColor="#F5F5F5" color="$color" borderRadius="$6">
        End Date: {endDate.toDateString()}
      </Button>
      {showEndPicker && (
        <DateTimePicker value={endDate} mode="date" onChange={(event, date) => {
          setShowEndPicker(false);
          if (date) setEndDate(date);
        }} />
      )}
      <Input placeholder="Amount (UGX)" value={amount} onChangeText={setAmount} size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#F5F5F5" color="$color" />
      <Button onPress={handleBook} backgroundColor="#4CAF50" color="white" borderRadius="$6">Book and Pay</Button>
      {error && <Paragraph color="$red10" textAlign="center">{error}</Paragraph>}

      <Paragraph size="$6" fontWeight="bold" color="#1B5E20">My Bookings</Paragraph>
      <ScrollView>
        {bookings.map(b => (
          <Card key={b._id} borderRadius="$6" padding="$4" backgroundColor="$gradient1" marginBottom="$4">
            <Paragraph color="#4CAF50">Property: {b.propertyId}</Paragraph>
            <Paragraph color="#757575">Start: {new Date(b.startDate).toDateString()}</Paragraph>
            <Paragraph color="#757575">End: {new Date(b.endDate).toDateString()}</Paragraph>
            <Paragraph color="#1B5E20">Amount: UGX {b.amount}</Paragraph>
            <Paragraph color={b.status === 'pending' ? '#F44336' : '#4CAF50'}>{b.status}</Paragraph>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
}