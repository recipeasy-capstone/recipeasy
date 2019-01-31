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
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import RecipeListScreen from "./RecipeListScreen";
import { connect } from "react-redux";
import { fetchPantry, deleteFromPantry } from "../store/pantry";

class PantryScreen extends React.Component {
  static navigationOptions = {
    title: "Pantry"
  };

  async componentDidMount() {
    await this.props.fetchPantry(this.props.user.email);
  }

  render() {
    const item = this.props.pantry.map((item, index) => {
      return (
        <View>
          <Text key={index}>{item}</Text>
          <Button
            title="X"
            onPress={() =>
              this.props.deleteFromPantry(item, this.props.user.email)
            }
          />
        </View>
      );
    });

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.pantryContainer}>
            <Text>Pantry</Text>
            <View style={styles.pantry} />
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
    //change later
    fontFamily: "Helvetica"
  }
});

const mapStateToProps = state => ({
  pantry: state.pantry.pantry,
  user: state.user.user
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPantry: userId => dispatch(fetchPantry(userId)),
    deleteFromPantry: item => dispatch(deleteFromPantry(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryScreen);
