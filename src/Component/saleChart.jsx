import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as chartjs, registerables } from "chart.js/auto";
chartjs.register(...registerables);

const SaleChart = () => {
  const [monlyData, setmonlyData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // เรียกข้อมูลรายได้
    const fetchingFulldata = async () => {
      try {
        const response = await axios.get(`https://localhost:7202/api/Admin/GetRevenue`);
        console.log("orderData3", response.data.revenueList);
        setRevenueData(response.data.revenueList);
      } catch (error) {
        console.log("ไม่สามารถดึงข้อมูลได้");
      }
    };

    fetchingFulldata(); 
  }, []);

  useEffect(() => {
    if (revenueData.length === 0) return;


    // สร้าง array สำหรับรายได้รายเดือน (12 เดือน)
    const revenuePerMonth = new Array(12).fill(0);

    // วนลูปข้อมูลเพื่อตรวจสอบว่าแต่ละรายการอยู่ในเดือนใด
    revenueData?.forEach((item) => {
      const date = new Date(item.createDate);
      const monthIndex = date.getMonth(); // ดึงเดือนออกมาในรูปแบบตัวเลข (0-11)
      revenuePerMonth[monthIndex] += item.netAmount; // เพิ่มรายได้ของเดือนนั้น
    });
    
    console.log("revenuePerMonthx:", revenuePerMonth);
    setmonlyData(revenuePerMonth); // อัพเดทข้อมูลยอดขายรายเดือน
  }, [revenueData]);
  console.log("data month",monlyData);
  
  useEffect(() => {
    // ตั้งค่าข้อมูลกราฟเมื่อมีข้อมูลยอดขายรายเดือน
    setChartData({
      labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
               "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"], // แกน x
      datasets: [
        {
          label: "ยอดขายรายเดือน",
          data: monlyData, // แกน y
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [monlyData]);



  return (
    <div className="mb-3">
      <div className="bg-white shadow-sm rounded-3 p-3 mt-2" style={{ height: "300px" }}>
        <p>กราฟแสดงแนวโน้มยอดขายรายเดือน:</p>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default SaleChart;
