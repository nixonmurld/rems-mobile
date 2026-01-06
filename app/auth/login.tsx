import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Button, Input, Paragraph, YStack, XStack, LinearGradient } from 'tamagui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Fill all fields');
      return;
    }
    try {
      const res = await fetch('https://your-rems-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        await SecureStore.setItemAsync('userToken', data.token);
        await SecureStore.setItemAsync('userRole', data.user.role);
        await SecureStore.setItemAsync('userNickname', data.user.nickname);
        router.replace('/(tabs)/explore');
      } else {
        setError(data.message || 'Wrong email or password');
      }
    } catch (e) {
      setError('Cannot reach server – check connection');
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Login with ${provider}`);
  };

  return (
    <LinearGradient
      colors={['#4CAF50', '#E8F5E9']}
      style={{ flex: 1 }}
    >
      <YStack flex={1} justifyContent="center" padding="$6" space="$4" borderRadius="$4">
        <Paragraph color="$gray12" size="$7" fontWeight="bold" textAlign="center">Welcome Back</Paragraph>
        <Paragraph color="$gray10" textAlign="center">Sign in to find your perfect rental</Paragraph>
        
        <Input placeholder="Email" value={email} onChangeText={setEmail} size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#FFFFFF" color="$color" />
        
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry size="$5" borderRadius="$6" placeholderTextColor="$gray9" backgroundColor="#FFFFFF" color="$color" />
        
        {error && <Paragraph color="$red10" textAlign="center">{error}</Paragraph>}
        
        <Button size="$5" onPress={handleLogin} borderRadius="$6" color="white" backgroundColor="#4CAF50">
          Login
        </Button>
        
        <Paragraph textAlign="center" color="$gray10">Or continue with</Paragraph>
        
        <XStack space="$3" justifyContent="center">
          <Button onPress={() => handleSocialLogin('Google')} backgroundColor="#4285F4" color="white" borderRadius="$6">Google</Button>
          <Button onPress={() => handleSocialLogin('Facebook')} backgroundColor="#1877F2" color="white" borderRadius="$6">Facebook</Button>
        </XStack>
        
        <Button size="$5" variant="outlined" onPress={() => router.push('/auth/signup')} borderRadius="$6" color="#4CAF50">
          Signup instead
        </Button>
      </YStack>
    </LinearGradient>
  );
}