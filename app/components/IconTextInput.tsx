import React from 'react';
import { TextInput, View, Text, StyleSheet, KeyboardEventEasing, KeyboardTypeOptions, ColorValue } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function IconTextInput({config}: IIconTextInputConfig){
    const [isInputFocused, setIsInputFocused] = React.useState(false);

    const styles = StyleSheet.create({
        input: {
            flex:1,            
            fontSize: config.textInputSize, 
            color: (config.isLoading || !config.isEditable) ? "lightgrey" : config.textInputColor 
        },
        border: {
            borderBottomWidth: 2,
            borderBottomColor: (isInputFocused && config.inputBorderBottomColorOnFocus) || ((config.isLoading || !config.isEditable) && "lightgrey") || "black",
            paddingHorizontal: 10, 
            paddingVertical: 7,
        }
    });

    return (
        <View>
            <View style={{ justifyContent: "flex-start", alignItems: "stretch", marginBottom: 10 }}>
                <Text style={{fontSize: config.labelFontSize, color: config.labelColor}}>
                    { config.labelText ? config.labelText : "none" }
                </Text>
            </View>    
            <View style={{ justifyContent: "flex-start", alignItems: "stretch", flexDirection:"row" }}>
                    {config.isTouched && config.isValid 
                        ?

                        <FontAwesome5 
                            name="check" 
                            solid 
                            size={ config.textInputSize } 
                            color="green" 
                            style={ [ styles.border, {paddingTop: 12} ]}/>

                         :
                         
                        <FontAwesome5 
                            name={ !config.isValid && config.isTouched ? config.invalidIcon : config.icon } 
                            solid 
                            size={ config.textInputSize } 
                            color={ ((!config.isEditable || config.isLoading ) && "lightgrey") || (!config.isValid && config.isTouched ? config.invalidIconColor : config.iconColor)}
                            style={ [ styles.border, {paddingTop: 12} ]}/>
                    }

                    <TextInput 
                        style={[styles.input, styles.border]}
                        keyboardType={ config.keyboardType }
                        value={ config.inputValue }
                        onChangeText={ (e) => { config.onInputValueChanged(e);} }
                        onBlur={ () => setIsInputFocused(false) }
                        onFocus={ () => setIsInputFocused(true) }
                        editable={ !(config.isLoading || !config.isEditable) }
                        secureTextEntry={config.isPassword}
                        selectTextOnFocus={ !(config.isLoading || !config.isEditable)}/>
            </View>
            <View style={{ justifyContent: "flex-start", alignItems: "stretch"}}>
                <Text style={ {fontSize: config.invalidTextFontSize, color: config.invalidTextFontColor} }>
                    { !config.isValid && config.isTouched && config.invalidText }
                </Text>
            </View>
        </View>
    );

}

interface IIconTextInputConfig {
    config: IconTextInputConfig
 }

export class IconTextInputConfig{
    constructor(
        public labelText: string = "none",        
        public labelFontSize: number = 15,
        public labelColor: string = "",
        public icon: string = "empty-set",
        public iconColor: ColorValue = "black",
        public textInputSize: number = 18,
        public textInputColor: string = "black",
        public keyboardType: KeyboardTypeOptions = "default",
        public inputValue: string = "",
        public onInputValueChanged: (e: string) => void = () => {},
        public inputBorderBottomColorOnFocus: string = "grey",
        public isValid: boolean = true,
        public invalidText: string = "",
        public invalidTextFontSize: number = 14,
        public invalidTextFontColor: string = "red",
        public invalidIcon: string = "times",
        public invalidIconColor: ColorValue = "red",
        public isTouched: boolean = false,
        public isLoading: boolean = false,
        public isEditable: boolean = true,
        public isPassword: boolean = false
    ){
    }
}  