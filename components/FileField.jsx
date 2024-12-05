import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React,  { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
// import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker';
// import { icons } from '../constants'

const H = Dimensions.get("window").height
const W =  Dimensions.get("window").width

const FileField = ({ title, titleText, selectedImage, onPress, size='',...props }) => {
    return (
        <View style={styles.view}>
            <Text style={styles.label}>{titleText || title}</Text>
            <View style={{
                backgroundColor: '#F8F8F8',
                borderRadius: 25, 
                flexDirection: 'row-reverse',
                height: (size === 'small' ? 0.11*H : 0.18*H) , 
                justifyContent: 'center', 
                alignItems: 'center',
            }}>
            <TouchableOpacity onPress={onPress}>
                { selectedImage ? <Image source={{ uri: selectedImage }} resizeMode='contain' style={styles.banner} /> : <AntDesign name="upload" size={24} color="#6151DC" /> }
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '88.372%',
        textAlign: 'center',
        marginTop: '5%',
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'right',
        color: '#7E7E7E',
        marginBottom: 1,
        marginRight: 6
    },
    inputView: {
        backgroundColor: '#F8F8F8',
        borderRadius: 25, 
        flexDirection: 'row-reverse',
        height: 0.18*H , 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    input: {
        width: '88%',
        textAlign: 'right',
        padding: 3,
        paddingRight: 0
    }, 
   
    banner: {
        flex: 1,
        width: 100,
        resizeMode: 'contain' 
      }
} )

export default FileField