import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { deleteFromPantry } from "../store/pantry";
import {Button} from 'react-native-elements'

class PantryScreen extends React.Component {
  static navigationOptions = {
    title: "Pantry"
  };

  render() {
    const { pantry, email } = this.props.user;
    const { navigate } = this.props.navigation;
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
                    // return this.props.deleteFromPantry(item, email);
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
          <Button
            title= 'Easy Peasy!'
            type = 'outline'
            style={styles.button}
            onPress={() => navigate("RecipeList")}
          >
          </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f5fffa',
    flex: 1,
  },
  pantryContainer: {
    alignItems: "center",
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  pantryIngredient: {
    margin:15
  },
  button: {
    backgroundColor: "#fbfbfb",
    margin: 20,
    padding: 20,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Helvetica"
  }
});

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => {
  return {
    deleteFromPantry: (item, email) => dispatch(deleteFromPantry(item, email))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryScreen);
