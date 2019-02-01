import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import PantryScreen from '../screens/PantryScreen';
import CameraScreen from '../screens/CameraScreen';
import StarredScreen from '../screens/StarredScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SettingScreen from '../screens/SettingScreen';
import RecipeDirectionScreen from '../screens/RecipeDirectionScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SignUpStack = createStackNavigator({
  SignUp: SignUpScreen,
});

const PantryStack = createStackNavigator({
  Pantry: PantryScreen,
  RecipeList: RecipeListScreen,
});

PantryStack.navigationOptions = {
  tabBarLabel: 'Pantry',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen,
  Pantry: PantryScreen,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const StarredStack = createStackNavigator({
  Starred: StarredScreen,
});

StarredStack.navigationOptions = {
  tabBarLabel: 'Starred',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

// const RecipeDirectionStack = createStackNavigator({
//   RecipeDirection: RecipeDirectionScreen,
//   RecipeList: RecipeListScreen,
// });

const RecipesStack = createStackNavigator({
  RecipeList: RecipeListScreen,
  RecipeDirection: RecipeDirectionScreen,
});

RecipesStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const SettingStack = createStackNavigator({
  Setting: SettingScreen,
});

SettingStack.navigationOptions = {
  tabBarLabel: 'Setting',
};

export default createBottomTabNavigator({
  PantryStack,
  CameraStack,
  StarredStack,
  SettingStack,
});
