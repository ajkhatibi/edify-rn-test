import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';
import { SearchBar, ListItem, Avatar, Button } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { STORE } from '../../reducers';
import { searchThroughGifyApi, showTrendingGify } from '../../actions';

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
    const dispatch = useDispatch();
    const state = useSelector((state: STORE) => state.app);

    useEffect(() => {
        dispatch(searchThroughGifyApi(searchQuery))
    }, [searchQuery]);

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
    const showTrendingButtong = () => {
        dispatch(showTrendingButtong())
    }
    const displayInitialContent = () => {
        if (state.data.length > 0) {
            return (
                <FlatList
                    data={state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderItem}
                />
            )
        } else {
            return (
                <View style={[styles.container, styles.contentView]}>
                    <Text allowFontScaling>Search results empty</Text>
                    <Button
                        onPress={() => dispatch(showTrendingGify())}
                        loading={state.trendingButtongLoading}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.buttonStyle}
                        title="Show trending gifys"
                    />
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                lightTheme
                placeholder="Type Here..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                showLoading={state.searchLoading}
            />
            {displayInitialContent()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainFont: {
        fontSize: 20
    },
    buttonContainer: {
        margin: 10
    },
    buttonStyle: {
        width: 200,
        height: 40
    }
})