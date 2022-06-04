import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Logo } from '../../components';
import { color, globalStyle } from '../../utility';
import { getAsyncStorage, keys } from '../../asycnStorage';
import { setUniqueValue, uuid } from '../../utility/constants';

const Splash = ({navigation}) => {
    useEffect(()=>{
        const redirect = setTimeout(()=> {
            getAsyncStorage(keys.uuid)
            .then((uuid) =>{
                if (uuid){
                    setUniqueValue(uuid);
                    navigation.replace('Dashboard');
                }
                else{
                    navigation.replace('Login');
                }
                }
            )
            .catch((err)=>{
                console.log(err);
                navigation.replace('Login');
            });
        }, 4000);
        return () => clearTimeout(redirect);
    },[navigation]);
  return (
    <View style={[globalStyle.containerCentered,{backgroundColor:color.SILVER}]}>
      <Logo/>
    </View>
  );
};

export default Splash;
