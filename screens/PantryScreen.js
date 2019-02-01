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
import { deleteFromPantry } from '../store/pantry';
import { CheckBox } from 'react-native-elements';
import { fetchNewRecipes } from '../store/recipes';

class PantryScreen extends React.Component {
  constructor() {
    super();
    state = {
      selectedIngredients: [],
    };
  }
  static navigationOptions = {
    title: 'Pantry',
  };

  render() {
    console.log('STATE', state);
    const { pantry, email } = this.props.user;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.pantryContainer}>
            <Text>Pantry</Text>
            {pantry.map((item, idx) => (
              <View key={idx}>
                <Text>{item}</Text>
                <Button
                  title="X"
                  onPress={() => {
                    // return this.props.deleteFromPantry(item, email);
                  }}
                />
                <CheckBox
                  title="Add Ingredient"
                  onPress={() =>
                    this.setState({
                      selectedIngredients: state.selectedIngredients.push(item),
                    })
                  }
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <Button
            title="Select All"
            onPress={() =>
              this.setState({
                selectedIngredients: state.selectedIngredients.push(pantry),
              })
            }
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (state.selectedIngredients) {
                console.log('here');
                console.log('selected in state', state.selectedIngredients);
                this.props.fetchNewRecipes(state.selectedIngredients);
              }
              // navigate('RecipeList');
            }}
          >
            <Text style={styles.buttonText}>Get Recipes!</Text>
          </TouchableOpacity>
        </View>
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
    margin: 20,
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => {
  return {
    deleteFromPantry: (item, email) => dispatch(deleteFromPantry(item, email)),
    fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryScreen);
