import React, {useContext} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Context as BlogContext} from '../context/BlogContext'
import {FontAwesome, SimpleLineIcons} from '@expo/vector-icons'

const ShowScreen = ({navigation}) => {
    const {state} = useContext(BlogContext)
    // console.log(navigation.getParam('id'))
    const blogPost = state.find((blogPost) =>
        blogPost.id === navigation.getParam('id'))

    return (<View>
        <Text style={styles.title}>{blogPost.title}</Text>
        <Text style={styles.content}>{blogPost.content}</Text>

    </View>)
}

ShowScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Edit', {id: navigation.getParam('id')})}
            >
                <SimpleLineIcons name="pencil" size={24} color="black"/>
            </TouchableOpacity>
        ),
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 14,
    },
})

export default ShowScreen

