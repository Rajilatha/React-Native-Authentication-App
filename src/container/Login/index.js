import { View, Text, SafeAreaView, Keyboard, KeyboardAvoidingView,
  TouchableWithoutFeedback, Platform } from 'react-native';
("react-native-keyboard-aware-scroll-view");
import React, { useContext, useState } from 'react';
import globalStyle from '../../utility/styleHelper/globalStyle';
import Logo from '../../components/logo';
import { color } from '../../utility';
import { InputField, RoundCornerButton } from '../../components';
import { setUniqueValue, keyboardVerticalOffset} from '../../utility/constants';
import { setAsyncStorage, keys } from '../../asycnStorage';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
import { LoginRequest } from '../../network';


const Login = ({navigation}) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [showLogo,toggleLogo] =useState(true)
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credential;
   const setInitialState = () => {
    setCredential({ email: "", password: "" });
  };
  const handleOnChange = (name, value) => {
    setCredential({
      ...credential,
      [name]: value,
    });
  };

  const onLoginPress = () => {
    Keyboard.dismiss();
    if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Password is required");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          setInitialState();
          navigation.replace("Dashboard");
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };

   const handleFocus = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };

   const handleBlur = () => {
    setTimeout(() => {
      toggleLogo(true);
    }, 200);
  };

  return (
    <KeyboardAvoidingView
    style={[globalStyle.flex1, { backgroundColor: color.GREY}]}
    behavior={Platform.OS==='android' ? 'padding': 'height'}
    keyboardVerticalOffset={keyboardVerticalOffset}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.GREY }]}>
      {showLogo && (
     <View style={[globalStyle.containerCentered]}>
            <Logo/>
            </View>
      )}
             <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
               <InputField
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => handleOnChange("email", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => handleOnChange("password", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <RoundCornerButton title="Login" 
            onPress={() => onLoginPress()}
             />
             <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: color.GREEN,
              }}
              onPress={() => {
              //   setInitialState();
                navigation.navigate("SignUp");
              }}
            >
              Sign Up
            </Text>
             </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
