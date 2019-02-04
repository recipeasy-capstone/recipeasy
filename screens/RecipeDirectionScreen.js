import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  WebView
} from "react-native";
import { connect } from "react-redux";
import {
  fetchRecipeDirections,
  addingStarRecipe,
  fetchStarredRecipes,
  fetchNewRecipes
} from "../store/recipes";

class RecipeDirectionScreen extends React.Component {
  static navigationOptions = {
    title: "Recipe Direction"
  };

  render() {
    const { navigate } = this.props.navigation;
    let starred = [...this.props.user.starred, this.props.recipeDirections];

    return (
      <View>
        <WebView
          originWhitelist={["file://"]}
          source={{ uri: this.props.recipeDirections }}
        />
        <Button
          title="I'd like to save this recipe!"
          onPress={async () => {
            try {
              await this.props.addingStarRecipe(starred, this.props.user.email);
              navigate("Starred");
            } catch (err) {
              console.error(err);
            }
          }}
        />
        <Button
          title="I'd like to keep looking!"
          onPress={async () => {
            try {
              this.props.fetchNewRecipes(this.props.recipeIngredients);
              navigate("RecipeList");
            } catch (err) {
              console.error(err);
            }
          }}
        />
        <Button
          title="I'd like to try different ingredients"
          onPress={() => {
            navigate("Pantry");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  button: {
    backgroundColor: "#fbfbfb",
    width: 100,
    marginTop: 50,
    padding: 20,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Helvetica"
  }
});

const mapStateToProps = state => ({
  recipeDirections: state.recipes.recipeDirections,
  user: state.user.user,
  recipeIngredients: state.pantry.recipeIngredients,
  starredRecipes: state.recipes.starredRecipes
});

const mapDispatchToProps = dispatch => ({
  addingStarRecipe: (recipe, userId) =>
    dispatch(addingStarRecipe(recipe, userId)),
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id)),
  fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
  fetchStarredRecipes: userId => dispatch(fetchStarredRecipes(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDirectionScreen);
