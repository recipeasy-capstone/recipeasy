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
import { fetchRecipeDirections } from '../store/recipes';

class RecipeDirectionScreen extends React.Component {
  static navigationOptions = {
    title: 'Recipe Direction',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text>{this.props.recipeDirection}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigate('RecipeList');
          }}
        >
          <Text style={styles.buttonText}>Back To Recipes!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
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
  recipeDirection: state.recipes.recipeDirection,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDirectionScreen);
