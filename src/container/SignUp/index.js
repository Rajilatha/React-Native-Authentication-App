import { View, Text, SafeAreaView, Keyboard, KeyboardAvoidingView,
  TouchableWithoutFeedback, Platform } from 'react-native';
import React, { useContext, useState } from 'react';
import globalStyle from '../../utility/styleHelper/globalStyle';
import Logo from '../../components/logo';
import { color } from '../../utility';
import { InputField, RoundCornerButton } from '../../components';
import { setUniqueValue, keyboardVerticalOffset} from '../../utility/constants';
import { setAsyncStorage, keys } from '../../asycnStorage';
import { AddUser, SignUpRequest } from '../../network';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
import firebase from '../../firebase/config'



const SignUp = ({navigation}) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [showLogo,toggleLogo] =useState(true)
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:""
  });
  const { email, password, confirmPassword, name } = credential;
  

  const onSignUpPress = () => {
    Keyboard.dismiss();
    if (!name) {
      alert("Name is required");
    } else if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Password is required");
    } else if (password !== confirmPassword) {
      alert("Password did not match");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignUpRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
           let uid = firebase.auth().currentUser.uid;
          let profileImg = "";
          AddUser(name, email, uid, profileImg)
          .then(() =>{
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          
          navigation.replace("Dashboard");
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
      })
       .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };
 const handleOnChange = (name, value) => {
    setCredential({
      ...credential,
      [name]: value,
    });
  };

   const handleBlur = () => {
    setTimeout(() => {
      toggleLogo(true);
    }, 200);
  };

   const handleFocus = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == "android" ? "padding" : "height"}
      style={[globalStyle.flex1, { backgroundColor: color.GREY}]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.GREY }]}>
       {showLogo && (
     <View style={[globalStyle.containerCentered]}>
            <Logo/>
            </View>
       )}
             <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
               <InputField
              placeholder="Enter name"
              value={name}
              onChangeText={(text) => handleOnChange("name", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
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

             <InputField
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => handleOnChange("confirmPassword", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <RoundCornerButton title="SignUp" 
            onPress={() => onSignUpPress()}
             />
             <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: color.GREEN,
              }}
              onPress={() => {
              //   setInitialState();
                navigation.navigate("Login");
              }}
            >
             Login
            </Text>
             </View>
    </SafeAreaView>
       </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
