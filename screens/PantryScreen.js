import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { deleteFromPantry, addToPantry, fetchPantry } from "../store/pantry";
import { fetchNewRecipes } from "../store/recipes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class PantryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIngredients: [],
      itemToPantry: null,
      addText: ""
    };
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }
  static navigationOptions = {
    title: "Pantry"
  };

  async componentDidMount() {
    const { uid } = this.props;
    await this.props.fetchPantry(uid);
  }

  addIngredient() {
    const { uid } = this.props;
    const { pantry } = this.props;
    if (!this.state.itemToPantry) {
      alert("You must enter an ingredient!");
    } else if (pantry.includes(this.state.itemToPantry)) {
      alert("This item is already in your pantry!");
    } else {
      this.props.addToPantry(this.state.itemToPantry, uid);
    }
  }

  removeIngredient(item) {
    const { uid } = this.props;
    this.props.deleteFromPantry(item, uid);
  }

  handleNewRecipes() {
    const { selectedIngredients } = this.state;
    const { navigate } = this.props.navigation;
    if (selectedIngredients.length === 0) {
      alert("Please select ingredients!");
    } else {
      this.props.fetchNewRecipes(selectedIngredients);
      navigate("RecipeList");
    }
  }

  render() {
    const { pantry } = this.props;
    if (pantry.length === 0) {
      return (
        <View style={styles.container}>
          <View style={styles.pantryContainer}>
            <Image
              source={require("../assets/images/empty.png")}
              style={styles.image}
            />
            <Text style={styles.ingredients}>Add to Pantry:</Text>
            <TextInput
              placeholder="Ingredient"
              style={styles.form}
              onChangeText={itemToPantry => this.setState({ itemToPantry })}
              value={this.state.itemToPantry}
              clearButtonMode="always"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addIngredient();
              }}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <View style={styles.pantryContainer}>
          <ScrollView>
            {pantry.map((item, idx) => (
              <View key={idx}>
                <Text style={styles.ingredients}>{item}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.pantryButton}
                    onPress={() => {
                      this.removeIngredient(item);
                      this.setState({
                        selectedIngredients: [
                          ...this.state.selectedIngredients
                        ].filter(food => food !== item)
                      });
                    }}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.pantryButton}
                    onPress={() => {
                      !this.state.selectedIngredients.includes(item)
                        ? this.setState({
                            selectedIngredients: [
                              ...this.state.selectedIngredients,
                              item
                            ]
                          })
                        : this.setState({
                            selectedIngredients: [
                              ...this.state.selectedIngredients
                            ].filter(food => food !== item)
                          });
                    }}
                  >
                    {this.state.selectedIngredients.includes(item) ? (
                      <Text style={styles.buttonText}>Selected</Text>
                    ) : (
                      <Text style={styles.buttonText}>Select</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.ingredients}>Add to Pantry:</Text>
          <TextInput
            placeholder="Ingredient"
            style={styles.form}
            onChangeText={itemToPantry => this.setState({ itemToPantry })}
            value={this.state.itemToPantry}
            clearButtonMode="always"
            ref="add"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addIngredient(), this.refs.add.clear();
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.state.selectedIngredients.length !== 0
                ? this.setState({
                    selectedIngredients: []
                  })
                : this.setState({
                    selectedIngredients: [
                      ...this.state.selectedIngredients,
                      pantry
                    ]
                  });
            }}
          >
            {this.state.selectedIngredients.length !== 0 ? (
              <Text style={styles.buttonText}>Deselect All!</Text>
            ) : (
              <Text style={styles.buttonText}>Select All!</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handleNewRecipes();
            }}
          >
            <Text style={styles.buttonText}>Get Recipes!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c4e4cf",
    alignItems: "center"
  },
  pantryContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 30,
    width: wp("85%"),
    height: hp("75%"),
    borderRadius: 10
  },
  ingredients: {
    textAlign: "center",
    fontFamily: "Futura",
    color: "black",
    fontSize: hp("3%"),
    padding: 10,
    marginTop: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  pantryButton: {
    width: 100,
    height: hp("3%"),
    margin: 5,
    borderWidth: 2,
    borderColor: "#fbeb9e",
    borderRadius: 10
  },
  button: {
    width: 200,
    margin: 10,
    backgroundColor: "#fbeb9e",
    borderRadius: 10
  },
  buttonText: {
    fontSize: hp("2%"),
    fontFamily: "Futura",
    textAlign: "center",
    color: "black"
  },
  form: {
    borderWidth: 1,
    width: 300,
    height: 30,
    borderColor: "#c4e4cf"
  },
  image: {
    alignItems: "center",
    margin: 80,
    width: 250,
    height: 250
  }
});

const mapStateToProps = state => {
  return {
    uid: state.user.uid,
    pantry: state.pantry.pantry,
    recipeIngredients: state.pantry.recipeIngredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToPantry: (item, uid) => dispatch(addToPantry(item, uid)),
    deleteFromPantry: (item, uid) => dispatch(deleteFromPantry(item, uid)),
    fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
    fetchPantry: uid => dispatch(fetchPantry(uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryScreen);
