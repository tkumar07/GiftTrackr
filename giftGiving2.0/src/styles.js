import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const marginTopAmnt = screenHeight * 0.09;

export const styles = {
  // Color Palette
  lightBlueBackground: "#7DAFD4",
  yellowAccent: "#D4D47D",
  babyBlueText: "#C6E9F7",
  almostWhiteText: "#ebf6fa",
  darkerAccent: "#092936",
  grayedOutColor: "#294c59",

  // Text Styles
  pageHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#C6E9F7",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C6E9F7",
  },
  regularText: {
    fontSize: 16,
    color: "#C6E9F7",
  },

  // Layout Properties
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#7DAFD4",
  },
  marginTop: {
    marginTop: marginTopAmnt,
  },
  customButton: {
    backgroundColor: "#092936",
    borderWidth: 2,
    borderColor: "#C6E9F7",
    borderRadius: 30,
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#C6E9F7",
  },

  // Input Style
  input: {
    borderWidth: 1,
    borderColor: "#C6E9F7",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
    color: "#C6E9F7",
  },
};
