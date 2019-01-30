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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Pantry: PantryScreen,
});

const SignUpStack = createStackNavigator({
  SignUp: SignUpScreen,
  Pantry: PantryScreen,
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

const RecipesStack = createStackNavigator({
  RecipeList: RecipeListScreen,
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

export default createBottomTabNavigator({
  PantryStack,
  CameraStack,
  StarredStack,
});
