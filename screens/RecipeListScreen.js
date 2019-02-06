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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class RecipeListScreen extends React.Component {
  static navigationOptions = {
    title: 'Recipe List',
  };

  render() {
    const newRecipes = this.props.newRecipes;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.recipesContainer}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
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
                    <Text style={styles.text}>
                      Used Ingredients: {recipe.usedIngredientCount}
                    </Text>
                    <Text style={styles.text}>
                      Missed Ingredients: {recipe.missedIngredientCount}
                    </Text>
                    <Text style={styles.text}>Likes: {recipe.likes}</Text>
                    <TouchableOpacity
                    style={styles.form}
                      onPress={async () => {
                        try {
                          await this.props.fetchRecipeDirections(recipe.id);
                          navigate('RecipeDirection');
                        } catch (err) {
                          console.error(err);
                        }
                      }}>
                      <Text
                      style={styles.formText}>
                      Get Recipe!
                   </Text>
                      </TouchableOpacity>
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
    backgroundColor: '#ffffff',
    margin: 30,
    width: wp('85%'),
    height: hp('75%'),
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 30,
  },
  image: {
    alignItems: 'center',
    margin: 15,
    height: hp('15%'),
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Futura',
    color: 'black',
    fontSize: hp('3%'),
    padding: 2,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Futura-Medium',
    color: 'black',
    fontSize: hp('1.5%'),
  },
  form: {
    marginTop: hp('2%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fbeb9e',
  },
  formText: {
    fontSize: hp('2%'),
    fontFamily: 'Futura',
    textAlign: 'center',
    color: 'black',
  },
});

const mapStateToProps = state => ({
  recipeIngredients: state.pantry.recipeIngredients,
  newRecipes: state.recipes.newRecipes,
  uid: state.user.uid,
  selectedIngredients: state.pantry.selectedIngredients,
});

const mapDispatchToProps = dispatch => ({
  fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListScreen);
