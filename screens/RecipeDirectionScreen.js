import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchRecipeDirections,
  addingStarRecipe,
  fetchStarredRecipes,
  fetchNewRecipes,
} from '../store/recipes';

class RecipeDirectionScreen extends React.Component {
  static navigationOptions = {
    title: 'Recipe Direction',
  };

  handleRecipes(){
    const {recipeIngredients} = this.props
    const { navigate } = this.props.navigation;
    if (recipeIngredients.length!== 0){
      navigate('RecipeList'); 
    } else {
      alert('Please select ingredients from pantry!')
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let starred = [...this.props.starredRecipes, this.props.recipeDirections];

    const recipeDir = this.props.recipeDirections;
    return (
      <View style={styles.container}>
        <View style={styles.white}>
          <ScrollView>
            <Text style={styles.title}>{recipeDir.title}</Text>
            <Image style={styles.image} source={{ uri: recipeDir.image }} />
            <Text style={styles.addOns}>Servings: {recipeDir.servings}</Text>
            <Text style={styles.addOns}>
              Time: {recipeDir.readyInMinutes} minutes
            </Text>
            {recipeDir.extendedIngredients.map((food, indx) => (
              <Text key={indx} style={styles.addOns}>
                {food.original}
              </Text>
            ))}
            <Text style={styles.instructions}>{recipeDir.instructions}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                try {
                  await this.props.addingStarRecipe(starred, this.props.uid);
                  navigate('Starred');
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Text style={styles.buttonText}>
                I'd like to save this recipe!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.handleRecipes() }
          }
            >
              <Text style={styles.buttonText}>I'd like to keep looking!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigate('Pantry');
              }}
            >
              <Text style={styles.buttonText}>
                I'd like to try different ingredients
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  recipeDirections: state.recipes.recipeDirections,
  uid: state.user.uid,
  recipeIngredients: state.pantry.recipeIngredients,
  starredRecipes: state.recipes.starredRecipes,
});

const mapDispatchToProps = dispatch => ({
  addingStarRecipe: (recipe, uid) => dispatch(addingStarRecipe(recipe, uid)),
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id)),
  fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
  fetchStarredRecipes: uid => dispatch(fetchStarredRecipes(uid)),
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fbeb9e',
  },
  white: {
    margin: 55,
    backgroundColor: '#ffffff',
    width: 350,
    height: 630,
    borderRadius: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#c4e4cf',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Futura',
    color: 'white',
    fontSize: 15,
    padding: 3,
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
  image: {
    alignItems: 'center',
    margin: 15,
    height: 110,
  },
  addOns: {
    textAlign: 'center',
    fontFamily: 'Futura',
    color: '#828282',
    fontSize: 12,
    padding: 2,
  },
  instructions: {
    fontFamily: 'Futura',
    color: 'black',
    fontSize: 15,
    padding: 2,
    alignItems: 'center',
    margin: 15,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDirectionScreen);
