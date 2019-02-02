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
import { fetchRecipeDirections } from "../store/recipes";

class RecipeDirectionScreen extends React.Component {
  static navigationOptions = {
    title: "Recipe Direction"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <WebView
        originWhitelist={["file://"]}
        source={{ uri: this.props.recipeDirections }}
      />
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
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDirectionScreen);
