import { useEffect, useState } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard";

function Dashboard() {

  const [data,setData] = useState({});

  useEffect(()=>{

    API.get("/api/dashboard")
      .then((res)=>{
        setData(res.data);
      });

  },[]);

  return (

    <div className="page">

      <h2>Dashboard</h2>

      <br/>

      <div className="cards">

        <StatCard
          title="Total Images"
          value={data.totalImages}
        />

        <StatCard
          title="Normal"
          value={data.normal}
        />

        <StatCard
          title="Pneumonia"
          value={data.pneumonia}
        />

      </div>

    </div>

  );

}

export default Dashboard;