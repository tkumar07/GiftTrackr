export const styles = {
  box: {
    flexDirection: "row", // contents lay horizontally
    justifyContent: "space-between", //contents spread out
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
  buttonText: {
    color: "white",
    fontSize: 18,
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
    margin: 15,
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
    flex: 1, // Each column takes an equal amount of space.
    paddingHorizontal: 10, // Add horizontal padding for spacing.
    flexDirection: "column", // contents lay vertically
    alignItems: "flex-start",
  },
  columnTitle: {
    fontSize: 16, // Style for the column title ("Likes" and "Dislikes").
    fontWeight: "bold", // Make it bold if needed.
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  date: {
    fontSize: 16,
    color: "#777",
  },
  headerText: {
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  twoColumnContainer: {
    flexDirection: "row", // Set the direction to 'row' for a horizontal layout.
    justifyContent: "space-between", // Add space between the two columns.
    alignItems: "center", // Center the content vertically.
  },
};
