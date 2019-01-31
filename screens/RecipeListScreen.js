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
import { fetchPantry, deleteFromPantry } from "../store/pantry";

class RecipeListScreen extends React.Component {
  static navigationOptions = {
    title: "Recipe List"
  };

  async componentDidMount() {
    await this.props.fetchPantry(this.props.user.email);
  }

  deleteFromPantry(item) {
    this.props.deleteFromPantry(item, this.props.user.email);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.pantryContainer}>
            {this.props.pantry.map((item, index) => {
              return (
                <Text key={item.index}>
                  {item.name}
                  <Button onPress={this.deleteItemFromPantry(item.id)}>
                    X
                  </Button>
                </Text>
              );
            })}
          </View>
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
    fetchPantry: userId => dispatch(fetchPantry(userId)),
    deleteFromPantry: item => dispatch(deleteFromPantry(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListScreen);
