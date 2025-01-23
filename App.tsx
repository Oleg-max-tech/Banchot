import "react-native-unistyles";
import "./src/Styles/UnistyleRegister";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SliderScreen from "./src/Screens/SliderScreen";
import GameScreen from "./src/Screens/GameScreen";
import HintsScreen from "./src/components/HintsScreen";
import { RootStackParamList } from "./types";
import CustomHeader from "./src/CustomHeader";
import { SafeAreaView, StyleSheet } from "react-native";
import { AppThemeProvider } from "./src/Styles/ThemeContext";

import { useStyles } from "react-native-unistyles";

const Stack = createStackNavigator<RootStackParamList>();

const AppContent: React.FC = () => {
  const { theme } = useStyles();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SliderScreen">
          <Stack.Screen
            name="SliderScreen"
            component={SliderScreen}
            options={({ navigation }) => ({
              headerTitle: "",
              headerStyle: { backgroundColor: theme.headerBackground },
              headerTintColor: theme.headerText,
              headerTitleAlign: "center",
              headerRight: () => <CustomHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="GameScreen"
            component={GameScreen}
            options={({ navigation }) => ({
              headerTitle: "",
              headerStyle: { backgroundColor: theme.headerBackground },
              headerTintColor: theme.headerText,
              headerTitleAlign: "center",
              headerRight: () => <CustomHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="HintsScreen"
            component={HintsScreen}
            options={({ navigation }) => ({
              headerTitle: "",
              headerStyle: { backgroundColor: theme.headerBackground },
              headerTintColor: theme.headerText,
              headerTitleAlign: "center",
              headerRight: () => <CustomHeader navigation={navigation} />,
              presentation: "modal",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
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
