import { View, Text, LogBox } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavContainer from './src/navigation';
import { Loader } from './src/components';
import { StoreProvider } from './src/context/store';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {
    return(
    <StoreProvider>   
<NavContainer/>
{/* <Loader/> */}
 </StoreProvider>
 )
    

}

export default App;
