import { Page, Text, View, Document, StyleSheet ,PDFViewer} from '@react-pdf/renderer';
import axios from "axios";
import { useState, useEffect } from "react";
import ReportDoc from "../Component/reportDoc";
const ShowReportDoc = ()=>{
  return(
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
                <ReportDoc />
              </PDFViewer>
  );
}
export default ShowReportDoc;