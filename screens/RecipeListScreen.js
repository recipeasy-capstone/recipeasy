import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { connect } from "react-redux";
import { fetchNewRecipes, addingStarRecipe } from "../store/recipes";

class RecipeListScreen extends React.Component {
  static navigationOptions = {
    title: "Recipe List"
  };

  render() {
    console.log("newRecipes", this.props.newRecipes);
    const userId = this.props.user.email;
    const newRecipes = this.props.newRecipes;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.pantryContainer}>
            {newRecipes &&
              newRecipes.body &&
              newRecipes.body.map((recipe, index) => (
                <View key={index}>
                  <Text>Title: {recipe.title}</Text>
                  {/* <Image source={`${recipe.image}`} /> */}
                  <Text>Used Ingredients: {recipe.usedIngredientCount}</Text>
                  <Text>
                    Missed Ingredients: {recipe.missedIngredientCount}
                  </Text>
                  <Text>Likes: {recipe.likes}</Text>
                  <Button
                    title="*"
                    onPress={() => {
                      this.props.addingStarRecipe(recipe, userId);
                    }}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  pantryContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
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
  recipeIngredients: state.pantry.recipeIngredients,
  newRecipes: state.recipes.newRecipes,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  addingStarRecipe: (recipe, userId) =>
    dispatch(addingStarRecipe(recipe, userId)),
  fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListScreen);
