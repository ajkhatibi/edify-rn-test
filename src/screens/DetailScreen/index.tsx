import React from 'react';
import { SafeAreaView, Text, StyleSheet, Image, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';

export default function DetailScreen(props) {
    console.log("details props: ", props);
    const { item } = props.route.params;
    const saveToDevice = () => {
        const ifAndroid = Platform.OS === "android" ? `file:///${item.images.preview_gif.url}` : item.images.preview_gif.url;
        MediaLibrary.saveToLibraryAsync(ifAndroid);
        Alert.alert("Success", "Your photo has been saved!");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.fontMain} allowFontScaling>{item.title}</Text>
            <Image style={styles.image} source={{ uri: item.images.preview_gif.url }} />
            <Button onPress={saveToDevice} containerStyle={styles.buttonContainer} title="Save To Device" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fontMain: {
        fontSize: 20,
        margin: 10
    },
    image: {
        height: 200,
        width: 200
    },
    buttonContainer: {
        margin: 10
    }
})