import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { connect } from "react-redux";
import { deleteFromPantry } from "../store/pantry";

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
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("RecipeList")}
          >
            <Text style={styles.buttonText}>EASY PEASY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  pantryContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
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
