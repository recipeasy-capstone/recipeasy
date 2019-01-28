import React from 'react'
import { View, ScrollView, StyleSheet, Button, Text } from 'react-native'
import {connect} from 'react-redux'

class Pantry extends React.Component {
    render() {
        console.log('Props', this.props)
        console.log('Pantry', this.props.pantry)
        return (
            <View>
                <Text>Pantry</Text>
                <ScrollView>
                    {this.props.pantry.map((item, index) => <Text key={index}>{item}</Text>)}
                </ScrollView>
            </View>
        )

    }
}

const mapStateToProps = state => ({
    pantry: state.pantry.pantry
})

export default connect(mapStateToProps)(Pantry)
