import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './MenuContext';
import { ChefAuthProvider } from './ChefAuthCon';
import AddDishScreen from './screens/AddDishScreen';
import FilterScreen from './screens/FilterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator () {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Add Dish') {
          iconName = focused ? 'add-circle': 'add-circle-outline';
        } else if (route.name === 'Filter') {
          iconName = focused ? 'funnel' : 'funnel-outline';
        } else if (route.name === 'Login') {
          iconName = focused ? 'log-in' : 'log-in-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#adb5bd',
      tabBarStyle: {
        backgroundColor: '#343a40',
        borderTopWidth: 0,
        elevation: 5,
        height: 60,
        paddingBottom: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Add Dish" component={AddDishScreen} />
    <Tab.Screen name="Filter" component={FilterScreen} />
    <Tab.Screen name="Login" component={LoginScreen} />
  </Tab.Navigator>
  );
}

const App = () => {
  return (
    <MenuProvider>
      <ChefAuthProvider>
        {/* <SafeAreaProvider> */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen 
                name="Splash" 
                component={SplashScreen} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Main" 
                component={TabNavigator} 
                options={{ headerShown: false }} 
              />
            </Stack.Navigator>
          </NavigationContainer>
        {/* </SafeAreaProvider> */}
       </ChefAuthProvider> 
    </MenuProvider>
  )
};

export default App;
