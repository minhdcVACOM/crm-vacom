import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { VcStore } from '@/redux/vcStore';
import { PopupProvider } from '@/components/dialog/popupProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const stackScreens = {
  index: { headerShown: false },
  login: { headerShown: false },
  '(drawer)': { headerShown: false },
  forgotPass: { headerShown: false },
  listOrgUnit: { headerShown: false },
  setting: { headerShown: false },
  pageView: { title: "PDF viewer" },
  '+not-found': { headerShown: false },
} as const;
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <RootSiblingParent>
          <PopupProvider>
            <Provider store={VcStore}>
              <Stack
                screenOptions={({ route, navigation }: any) => ({
                  gestureEnabled: true,
                  gestureDirection: 'horizontal',
                  // animation: navigation.getState().type === 'pop'
                  //   ? 'slide_from_left'
                  //   : 'slide_from_right',
                  navigationBarHidden: true,
                })}
              >
                {Object.entries(stackScreens).map(([name, options]) => (
                  <Stack.Screen
                    key={name}
                    name={name}
                    options={options}
                  />
                ))}
              </Stack>
            </Provider>
          </PopupProvider>
        </RootSiblingParent>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
