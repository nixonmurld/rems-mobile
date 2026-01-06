import { YStack, Switch, Paragraph, Select, Button, Slider, XStack } from 'tamagui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Settings() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" space="$4">
      <XStack space="$3" alignItems="center">
        <Icon name="paint-brush" size={24} color="#1B5E20" />
        <Paragraph size="$6" fontWeight="bold" color="#1B5E20">Theme</Paragraph>
      </XStack>
      <XStack space="$4" alignItems="center">
        <Paragraph>Light</Paragraph>
        <Switch checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
        <Paragraph>Dark</Paragraph>
      </XStack>

      <XStack space="$3" alignItems="center">
        <Icon name="font" size={24} color="#1B5E20" />
        <Paragraph size="$6" fontWeight="bold" color="#1B5E20">Font Size</Paragraph>
      </XStack>
      <Slider defaultValue={[fontSize]} min={12} max={24} step=1 onValueChange={(val) => setFontSize(val[0])} />
      <Paragraph textAlign="center">Current: {fontSize}px</Paragraph>

      <XStack space="$3" alignItems="center">
        <Icon name="globe" size={24} color="#1B5E20" />
        <Paragraph size="$6" fontWeight="bold" color="#1B5E20">Language</Paragraph>
      </XStack>
      <Select value={language} onValueChange={changeLanguage}>
        <Select.Item value="en">English</Select.Item>
        <Select.Item value="fr">French</Select.Item>
        <Select.Item value="ar">Arabic</Select.Item>
        <Select.Item value="zh">Chinese</Select.Item>
      </Select>

      <Button backgroundColor="#4CAF50" color="white" borderRadius="$6">Save Changes</Button>
    </YStack>
  );
}