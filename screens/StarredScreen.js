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
import Hyperlink from 'react-native-hyperlink';
import { connect } from 'react-redux';
import { fetchStarredRecipes } from '../store/recipes';

class Starred extends React.Component {
  static navigationOptions = {
    title: null,
  };

  async componentDidMount() {
    const { uid } = this.props;
    try {
      await this.props.fetchStarredRecipes(uid);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const starredRecipes = this.props.starredRecipes;
    return (
      <View style={styles.container}>
        <View style={styles.starred}>
          <ScrollView>
            {starredRecipes.map((starredRecipe, index) => (
              <View key={index} style={styles.textContainer}>
                <Text style={styles.text}>Recipe</Text>
                <Text style={styles.link}>{starredRecipe}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4e4cf',
    alignItems: 'center',
  },
  starred: {
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: '#ffffff',
    width: 350,
    height: 630,
    borderRadius: 30,
  },
  textContainer: {
    marginTop: 30,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Futura-Medium',
    color: 'black',
    fontSize: 15,
    padding: 5,
  },
  link: {
    textAlign: 'center',
    fontFamily: 'Futura',
    color: '#b6e1e0',
    fontSize: 12,
    padding: 5,
  },
});

const mapStateToProps = state => ({
  starredRecipes: state.recipes.starredRecipes,
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch => ({
  fetchStarredRecipes: uid => dispatch(fetchStarredRecipes(uid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Starred);
