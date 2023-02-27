// eslint-disable-next-line 
import { FormControl, Select, SelectChangeEvent, Typography, InputLabel, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
 
export const SingleSelector =({recordlist,title,getvalue,showlabel})=>{
    const [open, setOpen]=useState(false);
    const [currValue,setcurValue]=useState("")
    let recordList=[]
    recordList=recordlist
    const handleChange=(event)=>{
        setcurValue(event.target.value)
        getvalue(event.target.value)
      }
      const openHandler=()=>{
        setOpen(true);
      }
    
      const closeHandler=()=>{
        setOpen(false);
      }
    
    return (
<Grid xs={12} md={4}>
          <Typography variant="h7" gutterBottom>
            {title}
          </Typography>
          <div style={{ width: "90%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{showlabel}</InputLabel>
              <Select fullWidth={true} label={showlabel}
               value={currValue}
               onChange={handleChange}
               onOpen={openHandler}
               onClose={closeHandler}
               open={open}
               >
               <MenuItem value=''>None</MenuItem>
              {
                recordList.map((record,index)=>(
                  <MenuItem 
                  key={index}
                  value={record}
                  >{record}
                  </MenuItem>
                ))
              }
              
              </Select>
            </FormControl>
          </div>
        </Grid>
    );
}

