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
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { deleteFromPantry, addToPantry } from '../store/pantry';
import { CheckBox, Input } from 'react-native-elements';
import { fetchNewRecipes } from '../store/recipes';
 

class PantryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIngredients: [],
      itemToPantry: null,
    };
  }
  static navigationOptions = {
    title: 'Pantry',
  };

  componentDidUpdate() {
    this.forceUpdate()
  }

  async addIngredient() {
    const { pantry, email } = this.props.user
    if (!this.state.itemToPantry) {
      alert('You must enter an ingredient!')
    }
    else if (pantry.includes(this.state.itemToPantry)) {
      alert('This item is already in your pantry!')
    }
    else {
      await this.props.addToPantry(this.state.itemToPantry, email)
      this.forceUpdate()
    }
  }

  render() {
    console.log('this.props.pantry', this.props.pantry)
    const { pantry, email } = this.props.user;

    const { navigate } = this.props.navigation;
    if (!pantry) {
      return (
        <View />
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.pantryContainer}>
            {pantry.map((item, idx) => (
              <View
              style={styles.pantryIngredient}
              key={idx}>
                <Text>{item}</Text>
                <Button
                  type='clear'
                  title="X"
                  onPress={() => {
                    // this.props.deleteFromPantry(item, email);
                  }}
                />
                <CheckBox
                  title="Add Ingredient"
                  onPress={() =>
                    this.setState({
                      selectedIngredients: this.state.selectedIngredients.push(item)
                    })
                  }
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <Text>Add to Pantry:</Text>
          <Input
            placeholder="Ingredient"
            style={styles.form}
            onChangeText={itemToPantry => this.setState({ itemToPantry })}
            value={this.state.itemToPantry}
          />
          <Button title="Add" onPress={() => this.addIngredient()} />
          <Button
            title="Select All"
            onPress={() => {
              console.log('hello')
              this.setState({
                selectedIngredients: this.state.selectedIngredients.push(pantry),
              })
            }
            }
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (this.state.selectedIngredients) {
                this.props.fetchNewRecipes(this.state.selectedIngredients);
              }
              navigate('RecipeList');
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
    backgroundColor:'#f5fffa',
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
  form: {
    borderWidth: 1,
    borderColor: '#f2f2f3',
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => {
  return {
    addToPantry: (item, email) => dispatch(addToPantry(item, email)),
    deleteFromPantry: (item, email) => dispatch(deleteFromPantry(item, email)),
    fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryScreen);
