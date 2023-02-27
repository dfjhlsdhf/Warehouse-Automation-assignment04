import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl, Select, SelectChangeEvent, Typography, InputLabel, MenuItem } from "@mui/material";
import { ResultTable } from "./components/resultTable";
import { getSelectedData,returnSelectedDate } from "./utils/getSelectedData";
import {  BASE_API_URL} from "./globals";
import { SingleSelector } from "./components/singleSelector";
import Button from '@material-ui/core/Button';
function App() {
  const [currPO,setcurrPO]=useState("");
  const [currWarehouseID, setcurrWarehouseID]=useState("")
  const [currID,setcurrID]=useState("")
  const [currBoxesRcvd,setcurrBoxesRcvd]=useState("")
  const [currShipID,setcurrShipID]=useState("")
  const [returnList,setcurreturnList]=useState([])
  const getReturnPO=(val)=>{
      setcurrPO(val)
  }
  const getReturnWarehouseID=(val)=>{
      setcurrWarehouseID(val)
  }
  const getReturnID=(val)=>{
      setcurrID(val)
  }
  const getReturnBoxesRcvd=(val)=>{
      setcurrBoxesRcvd(val)
  }
  const getReturnShipID=(val)=>{
      setcurrShipID(val)
  }
  const [currRecordList,setcurrRecordList]=useState([]);
  const [curPOList,setcurPOList]=useState([])
  const [curIDList, setcurIDList]=useState([])
  const [curWarehouseIDList,setcurWarehouseIDList]=useState([])
  const [curBoexsRcvdList,setcurBoxesRcvdList]=useState([])
  const [curShipIDList,setcurShipIDList]=useState([])
  const fetchAllRecordsList=async()=>{
    const res = await fetch(`${BASE_API_URL}/get/getall`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*',
          },
    });
  const allRecords= await res.json();
   setcurrRecordList(()=>allRecords)
   setcurPOList(()=>allRecords.map(item => item.ShippingPO))
   setcurIDList(()=>allRecords.map(item => item._id))
   setcurWarehouseIDList(()=>allRecords.map(item => item.WarehouseID))
   setcurBoxesRcvdList(()=>allRecords.map(item => item.BoxesRcvd))
   setcurShipIDList(()=>allRecords.map(item => item.ShipmentID))
  }
useEffect(()=>{
    fetchAllRecordsList()
  },[])

  

const handleFilterSubmit=async()=>{
    const res=await getSelectedData(currRecordList,currID,currWarehouseID,currPO,currShipID,currBoxesRcvd)
    setcurreturnList(()=>res)
  }
console.log(returnList)
  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Warehouse Automation
          </Typography>
        </Grid>
        {/* Selectors */}
        <SingleSelector
            recordlist={curPOList}
            title="ShippingPO"
            showlabel="ShippingPO"
            getvalue={getReturnPO}
        />
        <SingleSelector
            recordlist={curIDList}
            title="_id"
            showlabel="_id"
            getvalue={getReturnID}
        />
        <SingleSelector
            recordlist={curBoexsRcvdList}
            title="# Boxes Recieved"
            showlabel="BoxesRcvd"
            getvalue={getReturnBoxesRcvd}
        /> 
        <SingleSelector
            recordlist={curShipIDList}
            title="Shipment ID"
            showlabel="ShipmentID"
            getvalue={getReturnShipID}
        /> 
        <SingleSelector
            recordlist={curWarehouseIDList}
            title="Warehouse ID"
            showlabel="WarehouseID"
            getvalue={getReturnWarehouseID}
        /> 
        <Grid xs={12} md={8}>
        <button onClick={handleFilterSubmit}
        style={{ backgroundColor: '#0077cc', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}
        >Apply Filters</button>
          <Typography variant="h4" gutterBottom>
            Records
          </Typography>
          <div>
            {/* Table */}
          <ResultTable recordList={returnList}/>
          </div>
        </Grid>
      </Grid>
    </div>
    
  );
}

export default App;
