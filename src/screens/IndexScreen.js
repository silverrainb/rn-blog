import React, {useContext} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
} from 'react-native'
import {Context as BlogContext} from '../context/BlogContext'
import {FontAwesome} from '@expo/vector-icons'

const IndexScreen = ({navigation}) => {
    const {state, addBlogPost, deleteBlogPost} = useContext(BlogContext)
    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={blogPost => blogPost.title}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Show', {id: item.id})}>
                            <View style={styles.row}>
                                <Text
                                    style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity
                                    // onPress={() => console.log(item.id)}
                                    onPress={() => deleteBlogPost(item.id)}
                                >
                                    <FontAwesome name="trash-o"
                                                 style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <FontAwesome name="plus" size={24} color="black" />
            </TouchableOpacity>
        ),
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24,
        color: "black",
    },
})


export default IndexScreen
