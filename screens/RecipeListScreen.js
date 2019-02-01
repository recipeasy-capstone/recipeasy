import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchNewRecipes, addingStarRecipe } from '../store/recipes';

class RecipeListScreen extends React.Component {
  static navigationOptions = {
    title: 'Recipe List',
  };

  render() {
    console.log('PROPS', this.props);
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
            {newRecipes.map((recipe, index) => (
              <View key={index}>
                <Text>{recipe}</Text>
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
    backgroundColor: '#fff',
  },
  pantryContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fbfbfb',
    width: 100,
    marginTop: 50,
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
});

const mapStateToProps = state => ({
  recipeIngredients: state.pantry.recipeIngredients,
  newRecipes: state.recipes.newRecipes,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  addingStarRecipe: (recipe, userId) =>
    dispatch(addingStarRecipe(recipe, userId)),
  fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListScreen);
