import { useState } from 'react';
import { Avatar, Button, Input, Paragraph, ScrollView, XStack, YStack } from 'tamagui';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi, is this apartment still available?', fromUser: false, timestamp: new Date().toLocaleTimeString(), avatar: 'https://picsum.photos/50' },
    { id: 2, text: 'Yes, it is! When would you like to view?', fromUser: true, timestamp: new Date().toLocaleTimeString(), avatar: 'https://picsum.photos/50' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, fromUser: true, timestamp: new Date().toLocaleTimeString(), avatar: 'https://picsum.photos/50' }]);
      setNewMessage('');
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView flex={1} padding="$4" space="$3">
        {messages.map(msg => (
          <XStack key={msg.id} justifyContent={msg.fromUser ? 'flex-end' : 'flex-start'} space="$3">
            {!msg.fromUser && <Avatar circular size="$4"><Avatar.Image src={msg.avatar} /></Avatar>}
            <YStack space="$1">
              <Paragraph padding="$3" borderRadius="$6" backgroundColor={msg.fromUser ? '#4CAF50' : '#E0E0E0'} color={msg.fromUser ? 'white' : 'black'}>
                {msg.text}
              </Paragraph>
              <Paragraph color="$gray10" fontSize="$3" textAlign={msg.fromUser ? 'right' : 'left'}>{msg.timestamp}</Paragraph>
            </YStack>
            {msg.fromUser && <Avatar circular size="$4"><Avatar.Image src={msg.avatar} /></Avatar>}
          </XStack>
        ))}
      </ScrollView>
      <XStack padding="$4" space="$2" backgroundColor="$background">
        <Input flex={1} placeholder="Type message..." value={newMessage} onChangeText={setNewMessage} borderRadius="$6" backgroundColor="#F5F5F5" />
        <Button onPress={sendMessage} backgroundColor="#4CAF50" color="white" borderRadius="$6">Send</Button>
      </XStack>
    </YStack>
  );
}