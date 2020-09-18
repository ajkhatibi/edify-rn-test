import React from 'react';
import { SafeAreaView, Text, StyleSheet, Image, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';

export default function DetailScreen(props) {
    const { item } = props.route.params;
    const saveGIF = (value: string) => {
        MediaLibrary.saveToLibraryAsync(value);
        Alert.alert("Success", "Your photo has been saved!");
    }
    const saveToDevice = async () => {
        const ifAndroid = Platform.OS === "android" ? `file:///${item.images.preview_gif.url}` : item.images.preview_gif.url;
        try {
            const isGranted = await MediaLibrary.getPermissionsAsync();
            if (isGranted.granted) {
                saveGIF(ifAndroid);
            } else {
                const requestPermission = await MediaLibrary.requestPermissionsAsync();
                if (requestPermission.granted) {
                    saveGIF(ifAndroid);
                }

            }
        } catch (error) {
            throw new Error(error);
        }

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