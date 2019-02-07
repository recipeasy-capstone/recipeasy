import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import PantryScreen from "../screens/PantryScreen";
import CameraScreen from "../screens/CameraScreen";
import StarredScreen from "../screens/StarredScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import RecipeDirectionScreen from "../screens/RecipeDirectionScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "HOME"
};

const PantryStack = createStackNavigator({
  Pantry: PantryScreen,
  RecipeList: RecipeListScreen
});

PantryStack.navigationOptions = {
  tabBarLabel: "PANTRY"
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen,
  Pantry: PantryScreen
});

CameraStack.navigationOptions = {
  tabBarLabel: "CAMERA"
};
const RecipeDirectionStack = createStackNavigator({
  RecipeDirection: RecipeDirectionScreen,
  Pantry: PantryScreen
});

const StarredStack = createStackNavigator({
  Starred: StarredScreen,
  Pantry: PantryScreen,
  RecipeList: RecipeListScreen,
  RecipeDirection: RecipeDirectionScreen
});

StarredStack.navigationOptions = {
  tabBarLabel: "STARRED"
};

const RecipesStack = createStackNavigator({
  RecipeList: RecipeListScreen,
  RecipeDirection: RecipeDirectionScreen,
  Pantry: PantryScreen
});

RecipesStack.navigationOptions = {
  tabBarLabel: "RECIPES"
};

const SettingStack = createStackNavigator({
  Setting: SettingScreen
});

SettingStack.navigationOptions = {
  tabBarLabel: "SETTINGS"
};

export default createBottomTabNavigator({
  PantryStack,
  CameraStack,
  StarredStack,
  SettingStack
});
