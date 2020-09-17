import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import { SearchBar, ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Main: any;
    Details: any;
};

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "Main">;
    route: RouteProp<RootStackParamList, "Details">;
}

export default function Main(props: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [listOfGif, setListOfGift] = useState([]);

    const searchThroughGifyApi = async () => {
        try {
            const { data } = await axios.get("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "dD08mrciqbR49IJynxJX7EbTb7Jh5Ku1",
                    limit: 25
                }
            })
            setListOfGift(data.data)
            console.log("data: ", data.data);
        } catch (error) {
            throw new Error(error);
        }
    }
    useEffect(() => {
        searchThroughGifyApi();
    }, []);

    const _renderItem = ({ item }) => (
        <ListItem onPress={() => props.navigation.navigate("Details", { item })} bottomDivider>
            <Avatar source={{ uri: item.images.preview_gif.url }} />
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.trending_datetime}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                lightTheme
                placeholder="Type Here..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                autoCapitalize="none"
                returnKeyType="search"
            />
            <FlatList
                data={listOfGif}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainFont: {
        fontSize: 20
    }
})