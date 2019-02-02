import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PantryScreen from '../screens/PantryScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import RecipeDirectionScreen from '../screens/RecipeDirectionScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html

    Home: { screen: HomeScreen },
    Main: MainTabNavigator,
    Setting: { screen: SettingScreen },

    Pantry: { screen: PantryScreen },
    RecipeList: { screen: RecipeListScreen },
    RecipeDirection: { screen: RecipeDirectionScreen },
  })
);
