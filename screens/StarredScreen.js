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
import Hyperlink from "react-native-hyperlink";
import { connect } from "react-redux";
import { fetchStarredRecipes } from "../store/recipes";

class Starred extends React.Component {
  constructor() {
    super();
    this.state = {
      starred: this.props.user.starred
    };
  }
  static navigationOptions = {
    title: "Starred"
  };

  async componentDidMount() {
    const { email } = this.props.user;
    try {
      await this.props.fetchStarredRecipes(email);
      this.setState({ starred: this.props.recipes.starredRecipes });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const starredRecipes = this.state.starred;
    return (
      <View style={styles.container}>
        <ScrollView>
          {starredRecipes.map((starredRecipe, index) => (
            <View key={index}>
              <Hyperlink linkDefault={true}>
                <Text>
                  {index}: {starredRecipe}
                </Text>
              </Hyperlink>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => ({
  user: state.user.user,
  recipes: state.recipes
});

const mapDispatchToProps = dispatch => ({
  fetchStarredRecipes: userId => dispatch(fetchStarredRecipes(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Starred);
