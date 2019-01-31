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
import { fetchPantry } from "../store/pantry";

class RecipeListScreen extends React.Component {
  static navigationOptions = {
    title: "Recipe List"
  };

  async componentDidMount() {
    await this.props.fetchPantry(this.props.user.email);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.pantryContainer} />
        </ScrollView>
        <View />
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
    width: 100,
    marginTop: 50,
    padding: 20,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Helvetica"
  }
});

const mapStateToProps = state => ({
  pantry: state.pantry.pantry,
  user: state.user.user
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPantry: userId => dispatch(fetchPantry(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListScreen);
