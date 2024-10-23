import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    headerContainer: {
      marginTop: 20,
      justifyContent: "flex-start",
    },
    billTo: {
      marginRight: 10,
    },
    Mainbillto: {
      display: "flex",
      flexDirection: "row",
      marginTop: 20,
      paddingBottom: 3
    }
  });
const AddressDocSection = ()=>(
    <View style={styles.headerContainer}>
    <View style={styles.Mainbillto}>
      <Text style={styles.billTo}>Company Name:</Text>
      <Text>Daigoku japanese restaurant Co.,Ltd</Text>
    </View>
    <View style={styles.Mainbillto}>
      <Text style={styles.billTo}>Company Address:</Text>
      <Text>123 3rd floor Central Sriracha</Text>
    </View>
    <View style={styles.Mainbillto}>
      <Text style={styles.billTo}>Phone no:</Text>
      <Text>0987678987</Text>
    </View>
    <View style={styles.Mainbillto}>
      <Text style={styles.billTo}>Email:</Text>
      <Text>Daigoku_restaurant@daigokuRest.com</Text>
    </View>
  </View>
);
export default AddressDocSection;