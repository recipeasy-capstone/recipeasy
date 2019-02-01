import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class Starred extends React.Component {
  static navigationOptions = {
    title: 'Starred',
  };

  render() {
    const starredRecipes = this.props.user.starred;
    return (
      <View style={styles.container}>
        <ScrollView>
          {starredRecipes.map((starredRecipe, index) => (
            <View key={index}>
              <Text>{starredRecipe}</Text>
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
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  allRecipes: state.recipes.allRecipes,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  fetchStarredRecipes: userId => dispatch(fetchStarredRecipes(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Starred);
