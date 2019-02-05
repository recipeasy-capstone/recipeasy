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
    // let starred = this.props.starredRecipes.push(this.props.recipeDirections);
    console.log("PROPS", this.props, "RECIPEDIR", this.props.recipeDirections);
    const recipeDir = this.props.recipeDirections;
    return (
      <View>
        <Text>{recipeDir.instructions}</Text>
        {/* <Button
          title="I'd like to save this recipe!"
          onPress={async () => {
            try {
              await this.props.addingStarRecipe(starred, this.props.uid);
              navigate("Starred");
            } catch (err) {
              console.error(err);
            }
          }}
        /> */}
        <Button
          title="I'd like to keep looking!"
          onPress={async () => {
            try {
              await this.props.fetchNewRecipes(this.props.recipeIngredients);
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
  uid: state.user.uid,
  recipeIngredients: state.pantry.recipeIngredients,
  starredRecipes: state.recipes.starredRecipes
});

const mapDispatchToProps = dispatch => ({
  addingStarRecipe: (recipe, uid) => dispatch(addingStarRecipe(recipe, uid)),
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id)),
  fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
  fetchStarredRecipes: uid => dispatch(fetchStarredRecipes(uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDirectionScreen);
