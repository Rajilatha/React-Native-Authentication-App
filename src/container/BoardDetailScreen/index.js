import { View, Text, Button } from 'react-native';
import React from 'react';

const BoardDetailScreen = ({ navigation }) => {
  return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Board Details</Text>
        <Button
          title="Go to Details... again"
        //   onPress={() => this.props.navigation.push('BoardDetails')}
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

export default BoardDetailScreen;
