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
import { fetchNewRecipes, fetchRecipeDirections } from '../store/recipes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

class RecipeListScreen extends React.Component {
  static navigationOptions = {
    title: 'RecipeList',
  };

  render() {
    const newRecipes = this.props.newRecipes;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={styles.recipesContainer}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.textContainer}>
            {newRecipes &&
              newRecipes.body &&
              newRecipes.body.map((recipe, index) => (
                <View key={index}>
                 <Image
                   style={styles.image} 
                    source={{ uri: recipe.image }}
                  />
                  <Text style={styles.title}>{recipe.title}</Text>
                  <Text style={styles.text}>Used Ingredients: {recipe.usedIngredientCount}</Text>
                  <Text style={styles.text}>
                    Missed Ingredients: {recipe.missedIngredientCount}
                  </Text>
                  <Text style={styles.text}>Likes: {recipe.likes}</Text>
                  <Button
                    title="Recipe"
                    onPress={async () => {
                      try {
                        await this.props.fetchRecipeDirections(recipe.id);
                        navigate('RecipeDirection');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4e4cf',
    alignItems: 'center',
  },
  recipesContainer: {
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: '#ffffff',
    width: wp('75%'),
    height: hp('70%'),
    borderRadius: 30,
  },
  textContainer: {
    marginTop: 30,
  },
  image: {
    alignItems: 'center',
    margin: 15,
    height: 110,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Futura',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 2,
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Futura-Medium',
    color: 'black',
    fontSize: 15,
    padding: 5,
  },
  link: {
    textAlign: 'center',
    fontFamily: 'Futura',
    color: '#b6e1e0',
    fontSize: 12,
    padding: 5,
  },
});

const mapStateToProps = state => ({
  recipeIngredients: state.pantry.recipeIngredients,
  newRecipes: state.recipes.newRecipes,
  uid: state.user.uid,
  selectedIngredients: state.pantry.selectedIngredients
});

const mapDispatchToProps = dispatch => ({
  fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListScreen);
