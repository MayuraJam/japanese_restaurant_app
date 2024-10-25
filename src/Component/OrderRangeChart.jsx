import { useState, useEffect } from "react";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Line ,Bar} from "react-chartjs-2";
import { Chart as chartjs, registerables } from "chart.js/auto";
import axios from "axios";
chartjs.register(...registerables);

const OrderRangeChart = ({selectMonth}) => {
  const [filterData, setFilterData] = useState([]);
  //const [selectMonth, setSelectMonth] = useState("");
  const [orderData, setOrderData] = useState([]);
  
  
  useEffect(() => {
    if (!selectMonth) return;
    console.log("monthSelect",selectMonth);

    const month = new Date(selectMonth).getMonth() ;
    const year = new Date(selectMonth).getFullYear() ;

    const day = new Date(year, month + 1, 0).getDate();
    const allDays = Array.from({ length: day }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return date.toISOString().split("T")[0];
    });
    const orderCount = allDays.map((date) => {
      const totalOrder = orderData.filter((item) => {
        const orderDate = new Date(item.orderDate).toISOString().split("T")[0];
        return orderDate === date;
    }).length;
    return { date, totalOrder };
});

    setFilterData(orderCount);
    console.log("Filter activated");
  }, [orderData, selectMonth]);

  const charData = {
      labels: filterData?.map((item) => item.date), //แกน x
      datasets: [
          {
              label: "จำนวนรายการสั่ง",
              data: filterData?.map((item) => item.totalOrder), //แกน y
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
        ],
    };
    
  /*console.log("filterData to graph",filterData);
  console.log("OrderData",orderData);
  console.log("orderdate num",filterData?.map((item) => item.totalOrder));
  console.log("orderdate day",filterData?.map((item) => item.orderDate));*/
  
  const fetchingOrderdata = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Admin/GetOrder`,{
          orderID : ""
        }
      );
    setOrderData(response.data.orders);
     
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingOrderdata();
  }, []);
  return(
    <>
   {/* <input type="month" style={{fontSize:"0.8rem"}} value={selectMonth} onChange={(e)=>setSelectMonth(e.target.value)}/>*/}
    <div
    className=" bg-white shadow-sm rounded-3  p-3 mt-2"
    style={{ height: "300px" , border: "1px solid #EB5B00" }}
  >
    <p>กราฟปริมาณการสั่ง order รายวัน</p>
    <Bar data={charData} />
  </div>
    </>
  );
     
};
export default OrderRangeChart;
