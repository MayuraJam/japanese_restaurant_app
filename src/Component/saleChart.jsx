import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as chartjs, registerables } from "chart.js/auto";
chartjs.register(...registerables);

const SaleChart = ({selectMonth}) => {
  const [revenueData,setRevenueData] = useState([]);
  const [filterData,setFilterData] = useState([]);
   
  const fetchingdata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetRevenue`
      );
    setRevenueData(response.data.revenueList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingdata();
  }, []);
   
   useEffect(()=>{
     if(!selectMonth) return;

     const month = new Date(selectMonth).getMonth();
     const year = new Date(selectMonth).getFullYear();
     const day = new Date(year,month+1,0).getDate();

     const allDays = Array.from({length:day},(_,i)=>{
      const date = new Date(year,month,i+1);
      return date.toISOString().split("T")[0];
     });
     const showTotalRevenue = allDays.map((date)=>{
     const totalRevenue = revenueData.filter((item)=>{
          const revenueDate = new Date(item.createDate).toISOString().split("T")[0];
          return revenueDate === date;
      }).reduce((total,currentItem)=>total+currentItem.netAmount,0);
      return {date,totalRevenue};
     });
       setFilterData(showTotalRevenue);
       console.log("Filter activated");

   },[revenueData,selectMonth]);


  const chartData = {
    labels: filterData?.map((item) => item.date), //แกน x
    datasets: [
      {
        label: 'ยอดขาย',
        data:filterData?.map((item)=>item.totalRevenue),
      },
    ],
  }

  return (
    <div className="mb-3">
      <div className="bg-white shadow-sm rounded-3 p-3 mt-2" style={{ height: "300px" , border: "1px solid #EB5B00" }}>
        <p>กราฟแสดงแนวโน้มยอดขาย:</p>
        <Bar 
          data={chartData}  
        />
      </div>
    </div>
  );
};

export default SaleChart;
