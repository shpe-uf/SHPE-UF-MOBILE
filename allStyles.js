import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default StyleSheet.create({
  container: {
    height: "100%",
    marginTop: "10%",
    width: "100%"
  },
  page: {
    alignItems: "center",
    alignSelf: "center",
    width: "80%"
  },
  content: {
    width: "100%"
  },
  title: {
    textAlign: "center",
    color: "#001F5B",
    fontSize: 28,
    paddingVertical: "8%",
    marginTop: "10%"
  },
  h1: {
    alignSelf: "flex-start",
    color: "#FD652F",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    margin: 6
  },
  h2: {
    color: "#FD652F",
    fontSize: 23,
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10
  },
  h3: {
    color: "#FD652F",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 6
  },
  outerTableContainer: {
    width: "100%"
  },
  tableContainer: {
    borderColor: "#C1C1C1",
    borderRadius: 5,
    borderWidth: 1
  },
  headerContainer: {
    backgroundColor: "#F6F6F6",
    color: "#0070C0",
    fontSize: 22
  },
  headerTextStyle: {
    color: "#0070C0",
    fontSize: 20,
    textDecorationColor: "#0070C0"
  },
  tableRow1: {
    backgroundColor: "#FFF"
  },
  tableRow2: {
    backgroundColor: "#F6F6F6"
  },
  noContentText: {
    borderColor: "#CCC",
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
    height: 55,
    paddingTop: "5%",
    textAlign: "center"
  },
  input: {
    backgroundColor: "#f0f0f0",
    color: "black",
    borderRadius: 6,
    padding: wp("5%"),
    margin: hp("1%"),
    width: wp("75%"),
    height: hp("8.5%"),
    fontSize: hp("2.5%"),
    alignSelf: "center"
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: hp("2.5%")
  }
});
