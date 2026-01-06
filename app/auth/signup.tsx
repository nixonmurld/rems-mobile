import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Input, Paragraph, YStack, XStack, LinearGradient } from 'tamagui';

export default function Signup() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    setError('');
    if (!nickname || !email || !password) {
      setError('Fill all fields');
      return;
    }
    try {
      const res = await fetch('https://your-rems-backend.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, email, password, role }),
      });
      const data = await res.json();
      if (res.status === 201) {
        router.replace('/auth/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (e) {
      setError('Cannot reach server – check connection');
    }
  };

  const handleSocialSignup = (provider) => {
    alert(`Signup with ${provider}`);
  };

  return (
    <LinearGradient
      colors={['#4CAF50', '#E8F5E9']}
      style={{ flex: 1 }}
    >
      <YStack flex={1} justifyContent="center" padding="$6" space="$4" borderRadius="$4">
        <Paragraph color="$gray12" size="$7" fontWeight="bold" textAlign="center">Join REMS</Paragraph>
        <Paragraph color="$gray10" textAlign="center">Create an account to start exploring rentals</Paragraph>
        
        <Input placeholder="Nickname" value={nickname} onChangeText={setNickname} size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#FFFFFF" color="$color" />
        
        <Input placeholder="Email" value={email} onChangeText={setEmail} size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#FFFFFF" color="$color" />
        
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#FFFFFF" color="$color" />
        
        <Paragraph color="$gray12" size="$5" fontWeight="bold">Role</Paragraph>
        <XStack space="$4" justifyContent="center">
          <Button onPress={() => setRole('user')} backgroundColor={role === 'user' ? '#4CAF50' : '#757575'} size="$4" borderRadius="$6" color="white">User</Button>
          <Button onPress={() => setRole('admin')} backgroundColor={role === 'admin' ? '#4CAF50' : '#757575'} size="$4" borderRadius="$6" color="white">Admin</Button>
        </XStack>
        
        {error && <Paragraph color="$red10" textAlign="center">{error}</Paragraph>}
        
        <Button size="$5" onPress={handleSignup} borderRadius="$6" color="white" backgroundColor="#4CAF50">
          Signup
        </Button>
        
        <Paragraph textAlign="center" color="$gray10">Or signup with</Paragraph>
        
        <XStack space="$3" justifyContent="center">
          <Button onPress={() => handleSocialSignup('Google')} backgroundColor="#4285F4" color="white" borderRadius="$6">Google</Button>
          <Button onPress={() => handleSocialSignup('Facebook')} backgroundColor="#1877F2" color="white" borderRadius="$6">Facebook</Button>
        </XStack>
        
        <Button size="$5" variant="outlined" onPress={() => router.push('/auth/login')} borderRadius="$6" color="#4CAF50">
          Login instead
        </Button>
      </YStack>
    </LinearGradient>
  );
}