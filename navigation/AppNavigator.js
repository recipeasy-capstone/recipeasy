import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PantryScreen from '../screens/PantryScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,

    Home: { screen: HomeScreen },
    SignUp: { screen: SignUpScreen },
    Pantry: { screen: PantryScreen },
    RecipeList: { screen: RecipeListScreen },
  })
);
