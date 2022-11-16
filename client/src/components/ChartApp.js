import React, {useState} from 'react'
import BarChart from './BarChart';
import ChartData from './ChartData';
const ChartApp = () => {
  const [ selectedYear, setSelectedYear]= useState(null);
  
  const [item, setItem]= useState(ChartData.map((data)=> data.year))
  const Function = ()=>{
    if (selectedYear) {
      
    }
  }
  const [userData, setUserData]= useState({
    labels: ChartData.map((data)=>  data.day),
    datasets: [{
      label : "SOLS",
      data :  ChartData.map((data)=>  data.sols),

      backgroundColor:["#00ACEE", "#00ACEE", "#00ACEE", "#00ACEE"],
      borderColor: '#47DDFC'
    }]
  });

  // const fetchData = ({time, number})=>{

  //   const response = publication.map((data)=> data.publication_date);
  //   const date = []
  //   for (let i = 0; i < response.length; i++) {
  //     date.unshift(moment(response[i].close).format("YYYY-MM-DD"))
  //   }
  //   console.log(date, "dateeeee");
  // }

  const loading = true;
  return (
    <div className="App">
     
      {/* <button onClick={fetchData}>fetch date</button> */}

      <div style={{width:'100%', margin:"0 auto", marginTop:"50px"}}>
      <BarChart chartData={userData} setSelectedYear={setSelectedYear} />
      </div>
    </div>
  );
}

export default ChartApp
