import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

import colors from '@/ui/colors';

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary[200],
    // 全屏背景
    background: colors.charcoal[950],
    text: colors.charcoal[100],
    border: colors.charcoal[500],
    // 导航栏背景，需要重新启动配置
    card: colors.charcoal[850],
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[400],
    background: colors.white,
    card: colors.primary[100],
  },
};

export function useThemeConfig() {
  // 
  const { colorScheme,setColorScheme } = useColorScheme();
  // 自定义主题颜色
  // setColorScheme('dark')
  if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}
