import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { color } from "../utility";
import {
  Login,
  SignUp,
  Dashboard,
  Splash,
  ShowFullImg,
  Chat,
  
} from "../container";
import AddBoardScreen from "../container/AddBoardScreen";
import BoardScreen from "../container/BoardScreen";



const Stack = createStackNavigator();

function NavContainer() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash"
          screenOptions={{
              headerShown: true,
              headerStyle:{ backgroundColor: color.DARK_GRAY },
               headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTintColor: color.WHITE,
          headerTitleAlign: "center",
          }}
          >
             <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
              <Stack.Screen name="Login" component={Login}
              options={{ headerShown: false}}/>
              <Stack.Screen name="SignUp" component={SignUp}
              options={{ headerShown: false}}/>
              <Stack.Screen name="Dashboard" component={Dashboard}
               options={{
            headerLeft: null,
          }}/>
          {/* <Stack.Screen name="CreateScreen" component={CreateScreen}
               options={{
            headerLeft: null,
          }}/>
          <Stack.Screen name="Home" component={Home}
               options={{
            headerLeft: null,
          }}/> */}

          {/* <Stack.Screen name="EditBoardScreen" component={EditBoardScreen}
               options={{
            headerLeft: null,
          }}/> */}
          {/* <Stack.Screen name="AddBoardScreen">
            {props => <AddBoardScreen {...props} extraData={user} />}
          </Stack.Screen> */}

          {/* <Stack.Screen name="AddBoardScreen" 
          component={AddBoardScreen}
               options={{
            headerLeft: null,
          }}/> */}

          <Stack.Screen name="ShowFullImg" component={ShowFullImg}
               options={{
            headerLeft: null,
          }}/>

           <Stack.Screen name="Chat" component={Chat}
               options={{
            headerLeft: null,
          }}/>
          
          
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default NavContainer;