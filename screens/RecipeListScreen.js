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
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import { connect } from "react-redux";

class RecipeListScreen extends React.Component {
  static navigationOptions = {
    title: "Recipe List"
  };

  async componentDidMount () {
    await this.props.fetchPantry(this.)
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
    //change later
    fontFamily: "Helvetica"
  }
});

const mapStateToProps = state => ({
  pantry: state.pantry.pantry,
  user: state.user.user
});

export default connect(mapStateToProps)(RecipeListScreen);
