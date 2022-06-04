import { StyleSheet } from "react-native";
import { appStyle, color } from "../../utility";

export default StyleSheet.create({
  welcome: {
    color: appStyle.fieldTextColor,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 38 : 22,
    alignItems: "center",
    backgroundColor: color.SILVER
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});