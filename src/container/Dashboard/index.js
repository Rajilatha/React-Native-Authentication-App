import { SafeAreaView, Alert, Text, View, FlatList, Button,TextInput, NativeBaseConfigProvider } from 'react-native';
import React,  { useContext, useEffect, useState, useLayoutEffect }  from 'react';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { color } from '../../utility';
import { LogOutUser } from '../../network';
import { clearAsyncStorage } from '../../asycnStorage';
import firebase from '../../firebase/config'
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { Store } from "../../context/store";
import { deviceHeight } from '../../utility/styleHelper/appStyle';
import { UpdateUser } from '../../network/user';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
import ShowUsers from '../../components/showUsers';
import { Profile, StickyHeader } from "../../components";
import {launchImageLibrary} from 'react-native-image-picker' 
import ImagePicker from 'react-native-image-picker';
import styles from './styles';



const Dashboard = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
  });
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const { profileImg, name } = userDetail;
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <Button
        title='logout'
          // name="logout"
          size={26}
          color={color.BLACK}
          style={{ right: 10 }}
          onPress={() =>
            Alert.alert(
              "Logout",
              "Are you sure to log out",
              [
                {
                  text: "Yes",
                  onPress: () => logout(),
                },
                {
                  text: "No",
                },
              ],
              { cancelable: false }
            )
          }
        />
      ),
    })
  }, [navigation]);

   useEffect(() => {
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {
      firebase
        .database()
        .ref("users")
        .on("value", (dataSnapshot) => {
          let users = [];
          let currentUser = {
            id: "",
            name: "",
            profileImg: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
    } catch (error) {
      alert(error);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    }
  }, []);

  const selectPhotoTapped = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // Base 64 image:
        let source = "data:image/jpeg;base64," + response.data;
        dispatchLoaderAction({
          type: LOADING_START,
        });
        UpdateUser(uuid, source)
          .then(() => {
            setUserDetail({
              ...userDetail,
              profileImg: source,
            });
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
          })
          .catch(() => {
            alert(err);
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
          });
      }
    });
  };

  

  const logout = () =>{
    LogOutUser()
    .then(() => {
      clearAsyncStorage()
    .then(()=>{
      navigation.replace("Login");
    })
    .catch((err) =>console.log(err));
  })
  .catch((err)=>alert(err))
};
  const imgTap = (profileImg, name) => {
    if (!profileImg) {
      navigation.replace("ShowFullImg", {
        name,
        imgText: name.charAt(0),
      });
    } else {
      navigation.navigate("ShowFullImg", { name, img: profileImg });
    }
  };


  const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };


  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: color.SILVER }}>
      {/* {getScrollPosition > getOpacity() && (
       
        <StickyHeader
          name={name}
          img={profileImg}
          onImgTap={() => imgTap(profileImg, name)}
        />
      )} */}

      {/* ALL USERS */}
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        // onScroll={(event) =>
        //   setScrollPosition(event.nativeEvent.contentOffset.y)
        // }
        ListHeaderComponent={
          <View
            style={{
              opacity:
                getScrollPosition < getOpacity()
                  ? (getOpacity() - getScrollPosition) / 100
                  : 0,
            }}
          >
            <Profile
              img={profileImg}
              onImgTap={() => imgTap(profileImg, name)}
              onEditImgTap={() => selectPhotoTapped()}
              name={name}
            />

         <Button
         title="Add Subjects"
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          // icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.replace('Chat') }}
        />
            
            </View>
          
        }

      
        // renderItem={({ item }) => (
        
        //   <ShowUsers
        //     name={item.name}
        //     img={item.profileImg}
        //     onImgTap={() => imgTap(item.profileImg, item.name)}
        //     
        //   />
        
        // )}

        
      />
    </SafeAreaView>
    
  );
};

export default Dashboard;