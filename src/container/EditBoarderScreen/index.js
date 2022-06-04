import { View, Text, Button } from 'react-native';
import React from 'react';

const EditBoardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Add Board</Text>
        <Button
          title="Go to Edit Board... again"
        //   onPress={() => this.props.navigation.push('EditBoard')}
        />
        <Button
          title="Go to Home"
        //   onPress={() => this.props.navigation.navigate('Board')}
        />
        <Button
          title="Go back"
        //   onPress={() => this.props.navigation.goBack()}
        />
      </View>
  );
};

export default EditBoardScreen;
