import { ScrollView, YStack, Card, Paragraph, Button, XStack, Avatar } from 'tamagui';

export default function Freelancers() {
  const freelancers = [
    { id: 1, name: 'John Broker', role: 'Real Estate Broker', rating: 4.8, area: 'Kampala', avatar: 'https://picsum.photos/100', bio: 'Experienced broker with 5 years in Kampala rentals.' },
    { id: 2, name: 'Sarah Photographer', role: 'Property Photographer', rating: 4.9, area: 'Entebbe', avatar: 'https://picsum.photos/100', bio: 'Professional photographer specializing in real estate shots.' },
  ];

  return (
    <ScrollView flex={1} backgroundColor="$background" padding="$4">
      <YStack space="$4">
        {freelancers.map(f => (
          <Card key={f.id} borderRadius="$6" padding="$4" backgroundColor="$gradient2" elevation="$4">
            <XStack space="$3" alignItems="center">
              <Avatar circular size="$6">
                <Avatar.Image src={f.avatar} />
              </Avatar>
              <YStack flex={1}>
                <Paragraph size="$6" fontWeight="bold" color="#1B5E20">{f.name}</Paragraph>
                <Paragraph color="#4CAF50">{f.role} • {f.area}</Paragraph>
              </YStack>
            </XStack>
            <Paragraph marginTop="$2" color="#757575">{f.bio}</Paragraph>
            <XStack space="$1" marginTop="$2">
              {[1,2,3,4,5].map(i => <Paragraph key={i} color={i <= f.rating ? '#FFD700' : '#BDBDBD'}>★</Paragraph>)}
              <Paragraph color="#757575"> ({f.rating})</Paragraph>
            </XStack>
            <Button marginTop="$3" backgroundColor="#4CAF50" color="white" borderRadius="$6">Hire</Button>
          </Card>
        ))}
      </YStack>
    </ScrollView>
  );
}