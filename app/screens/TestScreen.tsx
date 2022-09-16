import React from 'react';
import { View } from 'react-native';
import User from '../classes/User';
import { Props } from '../navigation/types';

const Testcreen = ({ route, navigation }: Props) => {  
    var u = new User();
    u.name = "aaa"
    u.email = "awdawdaw"
    
    u.get()
    .then(r => {            
    })
    .catch( ex => {
    console.log("🚀 ~ file: TestScreen.tsx ~ line 15 ~ Testcreen ~ ex", ex)
    })
    return (
        <View>
            
        </View>
    );
}

export default Testcreen;