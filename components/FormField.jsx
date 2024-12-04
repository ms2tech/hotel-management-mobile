import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import React,  { useState } from 'react'
import { icons } from '../constants'

const H = Dimensions.get("window").height
const W =  Dimensions.get("window").width

const FormField = ({ title, value, placeholder, handleChangeText, titleText, multiline, disabled, numberOfLines,...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View style={styles.view}>
      <Text style={styles.label}>{titleText || title}</Text>
      <View style={styles.inputView}>
        <TextInput 
            style={styles.input}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            multiline={multiline || false}
            numberOfLines={numberOfLines || 1}
            placeholderTextColor={'#182942'}
            onChangeText={handleChangeText}
            secureTextEntry={(title === 'Password' || title === 'Confirm Password') && !showPassword}
        />
        {title === 'Password' && (<TouchableOpacity onPress={() => {setShowPassword(!showPassword)}}>
          <Image source={!showPassword ? icons.eye : icons.eyeHide} style={styles.eyeIcon}  resizeMode='contain'/>
          {/* <Text>Upload</Text> */}
        </TouchableOpacity>)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        width: 0.76744*W,
        textAlign: 'center',
        marginTop: '5%'
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        // textAlign: 'right',
        color: '#7E7E7E',
        marginBottom: 1,
        marginRight: 6
    },
    inputView: {
        backgroundColor: '#F8F8F8',
        borderRadius: 25, 
        flexDirection: 'row-reverse', 
        alignItems: 'center'
    },
    input: {
        width: '88%',
        // textAlign: 'right',
        padding: 3,
        // marginTop: 2,
        paddingRight: 0.05*W, 
        paddingTop: 0.002*W,
        minHeight: 38
    }, 
    eyeIcon: {
      flex: 1,
      width: 20,
      height: 10,
      resizeMode: 'contain' 
    }
} )

export default FormField