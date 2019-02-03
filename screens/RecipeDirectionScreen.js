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
import { fetchRecipeDirections, addingStarRecipe } from "../store/recipes";

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
            await this.props.addingStarRecipe(starred, this.props.user.email);
            navigate("Starred");
          }}
        />
        <Button
          title="I'd like to keep looking!"
          onPress={() => {
            navigate("RecipeList");
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
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  addingStarRecipe: (recipe, userId) =>
    dispatch(addingStarRecipe(recipe, userId)),
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDirectionScreen);
