import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import Mainlogo from "../image/phapirun_logo2.jpg";
import AddressDocSection from "./addressDoc";
import TableDocSection from "./tableDataDoc";

const ReportDoc = () => {
  Font.register({
    family: "NotoSerifThai",
    src: "https://fonts.gstatic.com/s/notoserifthai/v8/pxiQyoxzjClpGf8SS0efy3An9qU.woff2",
  });
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      fontFamily: "NotoSerifThai",
    },
    footer: {
      minHeight: 10,
      borderTop: "15px solid #eee",
      marginTop: "0 !important",
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: "black",
      marginVertical: 10,
      width: "100%",
    },
    logo: {
      width: 50,
      height: 50,
      objectFit: "contain",
      marginBottom: 10,
      marginTop:10,
      alignSelf: "center",
    },
  rightAlign: {
    textAlign: 'right',
    fontSize: '0.8rem',
  },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ textAlign: "center" }}>Daily Report</Text>

          <Image
            src={Mainlogo}
            style={styles.logo}
          />
          {/*<Text style={styles.rightAlign}>
            Daigoku japanese restaurant Co.,Ltd
          </Text>
          <Text style={styles.rightAlign}>
            123 3rd floor Central Sriracha{" "}
          </Text>
          <Text style={styles.rightAlign}>
            Thanon Sukhumvit, Si Racha, Si Racha, Chonburi, 20110
          </Text>
          <Text style={styles.rightAlign}>monthName : </Text>*/}
          <AddressDocSection/>
          <View style={styles.hr} />
          <Text style={{textAlign:"right"}}>monthName : </Text>
          {/*<TableDocSection/>*/}
        </View>
      </Page>
    </Document>
  );
};
export default ReportDoc;
