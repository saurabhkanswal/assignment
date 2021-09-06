import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Cart from './src/screens/Cart';
import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookDescription from './src/screens/BookDescription';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BookStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BookDescription" component={BookDescription} />
    </Stack.Navigator>
  );
}

const Route = ({authState}) => {
  return (
    <>
      {authState.isAuthenticated ? (
        <>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                  padding: 3,
                },
              }}>
              <Tab.Screen
                name="MyHome"
                component={BookStack}
                options={route => ({
                  tabBarIcon: ({focused}) => (
                    <Icon
                      name="book"
                      size={30}
                      color={focused ? 'orange' : 'black'}
                    />
                  ),
                })}
              />
              <Tab.Screen
                name="Cart"
                component={Cart}
                options={route => ({
                  tabBarIcon: ({focused}) => (
                    <Icon
                      name="add-shopping-cart"
                      size={30}
                      color={focused ? 'orange' : 'black'}
                    />
                  ),
                })}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </>
      ) : (
        <WelcomeScreen />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  activeIcon: {
    padding: 12,
    backgroundColor: '#8E97FD',
    borderRadius: 20,
  },
});

const mapStateToProps = state => {
  const {auth} = state;
  return {
    authState: auth,
  };
};

export default connect(mapStateToProps)(Route);
