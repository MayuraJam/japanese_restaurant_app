import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 24,
      borderWidth: 1,
      borderColor: "black"
    },
    container: {
      flexDirection: "row",
      borderBottomColor: "black",
      backgroundColor: "black",
      color: "#fff",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      textAlign: "center",
      fontStyle: "bold",
      flexGrow: 1
    },
    OrderID: {
      width: "60%",
      borderRightColor: "black",
      borderRightWidth: 1
    },
    CustomerID: {
      width: "10%",
      borderRightColor: "black",
      borderRightWidth: 1
    },
    netTotal: {
      width: "15%",
      borderRightColor: "black",
      borderRightWidth: 1
    },
    datetime: {
      width: "15%"
    }
  });

  const TableDocSection = ({data}) =>{
    <View style={styles.tableContainer}>
    {/* Invoice Table Header */}
    <View style={styles.container}>
      <Text style={styles.OrderID}>Item Description</Text>
      <Text style={styles.CustomerID}>Qty</Text>
      <Text style={styles.netTotal}>Price</Text>
      <Text style={styles.datetime}>Amount</Text>
    </View>
    {/* Invoice Table Rows */}
   {/*} <InvoiceTableRow items={invoice.items} />*/}
  </View>
  }
  export default TableDocSection;