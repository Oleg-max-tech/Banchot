import "react-native-unistyles";
import "./src/Styles/UnistyleRegister";
import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SliderScreen from "./src/Screens/SliderScreen";
import GameScreen from "./src/Screens/GameScreen";
import HintsScreen from "./src/components/HintsScreen";
import { RootStackParamList } from "./types";
import CustomHeader from "./src/CustomHeader";
import { Button, StyleSheet } from "react-native";
import { AppThemeProvider } from "./src/Styles/ThemeContext";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useStyles } from "react-native-unistyles";

const Stack = createStackNavigator<RootStackParamList>();

const AppContent: React.FC = () => {
  const { theme } = useStyles();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SliderScreen"
          // screenOptions={{
          //   headerShown: false,
          // }}
        >
          <Stack.Screen
            name="SliderScreen"
            component={SliderScreen}
            options={({ navigation }) => {
              return {
                headerTitle: "",
                headerStyle: {
                  backgroundColor: theme.colors.backgroundColor,
                  borderBottomColor: theme.colors.backgroundColor,
                },
                headerRight: () => {
                  return (
                    <CustomHeader navigation={navigation} showReset={false} />
                  );
                },
              };
            }}
          />

          <Stack.Screen
            name="GameScreen"
            component={GameScreen}
            options={({ navigation }) => {
              return {
                headerTitle: "",
                headerStyle: {
                  backgroundColor: theme.colors.backgroundColor,
                  borderBottomColor: theme.colors.backgroundColor,
                },
                headerRight: () => {
                  return <CustomHeader navigation={navigation} />;
                },
              };
            }}
          />

          <Stack.Screen
            name="HintsScreen"
            component={HintsScreen}
            options={({ navigation }) => {
              return {
                headerTitle: "",
                headerStyle: {
                  backgroundColor: theme.colors.backgroundColor,
                  borderBottomColor: theme.colors.backgroundColor,
                },
                headerRight: null,
                presentation: "modal",
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <AppContent />
    </AppThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
