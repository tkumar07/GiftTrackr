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

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C6E9F7",
  },
  regularText: {
    fontSize: 16,
    color: "#C6E9F7",
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

  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  cardContainer: {
    width: "92%",
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  cardContent: {
    padding: 5,
    marginTop: -5,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#7DAFD4",
    borderColor: "red",
    borderWidth: 2,
  },
  grayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: "5",
  },
  date: {
    fontSize: 16,
    color: "#777",
  },
  headerText: {
    fontSize: 24,
  },
  pageHeader: {
    width: "100%",
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#092936",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  twoColumnContainer: {
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
};
