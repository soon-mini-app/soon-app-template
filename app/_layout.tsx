import 'expo-dev-client'
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import styled, { ThemeProvider as StyledThemeProvider, type DefaultTheme } from 'styled-components/native'
import { appTheme, navTheme } from 'src/config/theme'
import { RootSiblingParent } from 'react-native-root-siblings';
import { APIProvider } from '@/api/api-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FlashMessage from 'react-native-flash-message';
import { useThemeConfig } from '@/utils/use-theme-config';

export default function AppLayout() {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={navTheme.dark ? `dark` : undefined}
    >
      {/* StyledThemeProvider 传递样式属性的 */}
      <StyledThemeProvider theme={appTheme as DefaultTheme}>
        <StatusBar style="auto"  />
        <S.SafeAreaView>
            <NavThemeProvider value={theme}>
              <APIProvider>
                <RootSiblingParent>
                  <BottomSheetModalProvider>
                    <Stack screenOptions={ {headerShown: false}} />
                    <FlashMessage position="top" />
                  </BottomSheetModalProvider>
                </RootSiblingParent>
              </APIProvider>
            </NavThemeProvider>
        </S.SafeAreaView>
      </StyledThemeProvider>
    </GestureHandlerRootView>
    
  )
}

const S = {
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
  `
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

