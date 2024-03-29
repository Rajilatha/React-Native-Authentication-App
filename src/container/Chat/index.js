import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Ionicons
} from "react-native";

import {
  TextInput,
  Button,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
  Provider as PaperProvider
} from "react-native-paper";
import firebase from '../../firebase/config'

import { Platform } from "react-native";




export default class Chat extends Component {
    static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chat',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.push('Dashboard') }}
        />
      ),
    };
  };
  
  constructor(props) {
    super(props);
    

    // if (!firebase.apps.length) {
    //   firebase.initializeApp(firebaseconfig.Config);
    // }
    this.tasksRef = firebase.database().ref("/items");
    
    const dataSource = [];
    this.state = {
      dataSource: dataSource,
      selecteditem: null,
      snackbarVisible: false,
      confirmVisible: false
    };
  }
  
  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }

  listenForTasks(tasksRef) {
    tasksRef.on("value", dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          name: child.val().name,
          key: child.key
        });
      });

      this.setState({
        dataSource: tasks
      });
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          width: "90%",
          height: 2,
          backgroundColor: "#BBB5B3"
        }}
      >
        <View />
      </View>
    );
  };

  deleteItem(item) {
    this.setState({ deleteItem: item, confirmVisible: true });
  }

  performDeleteItem(key) {
    var updates = {};
    updates["/items/" + key] = null;
    return firebase
      .database()
      .ref()
      .update(updates);   
  }

  addItem(itemName) {
    var newPostKey = firebase
      .database()
      .ref()
      .child("items")
      .push().key;

   
    var updates = {};
    updates["/items/" + newPostKey] = {
      name:
        itemName === "" || itemName == undefined
          ? this.state.itemname
          : itemName
    };

    return firebase
      .database()
      .ref()
      .update(updates);    
  }

  updateItem() {
    
    var updates = {};
    updates["/items/" + this.state.selecteditem.key] = {
      name: this.state.itemname
    };

    return firebase
      .database()
      .ref()
      .update(updates);   
  }

  saveItem() {
    if (this.state.selecteditem === null) this.addItem();
    else this.updateItem();

    this.setState({ itemname: "", selecteditem: null });
  }

  hideDialog(yesNo) {
    this.setState({ confirmVisible: false });
    if (yesNo === true) {
      this.performDeleteItem(this.state.deleteItem.key).then(() => {
        this.setState({ snackbarVisible: true });
      });
    }
  }

  showDialog() {
    this.setState({ confirmVisible: true });
    console.log("in show dialog");
  }

  undoDeleteItem() {
    this.addItem(this.state.deleteItem.name);
  }
  

  render()  {
    return (
      <PaperProvider>
        <View style={styles.container}>
          
            <Text>Subjects Name</Text>
            <TextInput
              label="Subject"
              style={{
                height: 50,
                width: 250,
                borderColor: "gray",
                borderWidth: 1                
              }}
              onChangeText={text => this.setState({ itemname: text })}
              value={this.state.itemname}
            />  
            <View style={{height:10}}></View>          
            <Button 
              icon={this.state.selecteditem === null ? "add" : "update"}
              mode="contained"
              onPress={() => this.saveItem()}
            >
              {this.state.selecteditem === null ? "add" : "update"}
            </Button>
             
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <View>
                  
                    <TouchableWithoutFeedback>
                      <View style={{ paddingTop: 10 }}>
                        {/* <Text
                          style={{ color: "#4B0082" }}
                          onPress={() => this.deleteItem(item)}
                        >
                          <Ionicons name="md-trash" size={20} />
                        </Text> */}
                        <Button style={{ color: "#4B0082" }}
                          onPress={() => this.deleteItem(item)}>delete</Button>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.setState({
                          selecteditem: item,
                          itemname: item.name
                        })
                      }
                    >
                      <View>
                        <Text style={styles.item}>{item.name} </Text>
                      </View>
                    </TouchableWithoutFeedback>
                 
                </View>
              )}
              ItemSeparatorComponent={this.renderSeparator}
              
            />
         
            <Text />

            
            <Portal>
              <Dialog
                visible={this.state.confirmVisible}
                onDismiss={() => this.hideDialog(false)}
              >
                <Dialog.Title>Confirm</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Are you sure you want to delete this?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => this.hideDialog(true)}>Yes</Button>
                  <Button onPress={() => this.hideDialog(false)}>No</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          
          <Snackbar
            visible={this.state.snackbarVisible}
            onDismiss={() => this.setState({ snackbarVisible: false })}
            action={{
              label: "Undo",
              onPress: () => {
                // Do something
                this.undoDeleteItem();
              }
            }}
          >
            Item deleted successfully.
          </Snackbar>
          
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 38 : 22,
    alignItems: "center",
    backgroundColor: "#F5FFFA"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: "center"
  }
});
