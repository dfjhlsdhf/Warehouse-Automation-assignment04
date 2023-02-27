import {  BASE_API_URL} from "../globals";

// export async function fetchAllRecordsList(){
//     const res = await fetch(`${BASE_API_URL}/get/getall`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//             'Access-Control-Allow-Origin':'*',
//           },
//     });
//   const allRecordsList= await res.json();
//   return allRecordsList
// }

export async function getSelectedData(recordsList,_id,warehouseid,shippingpo,shipmentid,boxesrcvd){
    // const recordsList=await fetchAllRecordsList()
    if(_id == '' && warehouseid == '' && shippingpo == '' && shipmentid == ''
    && boxesrcvd == ''){
        return recordsList
    }
    let result=recordsList
    if(_id){
        result=result.filter(item=>item._id==_id)
    }
    if(warehouseid){
        result=result.filter(item=>item.WarehouseID==warehouseid)
    }
    if(shippingpo){
        result=result.filter(item=>item.ShippingPO==shippingpo)
    }
    if(shipmentid){
        result=result.filter(item=>item.ShipmentID==shipmentid)
    }
    if(boxesrcvd){
        result=result.filter(item=>item.BoxesRcvd==boxesrcvd)
    }
    return result


    // return recordsList.filter(item=>{
    //     return (_id!='' || item._id === _id) &&
    //        (warehouseid!='' || item.WarehouseID === warehouseid) &&
    //        (shippingpo!='' || item.ShippingPO === shippingpo) &&
    //        (shipmentid!='' || item.ShipmentID === shipmentid) &&
    //        (boxesrcvd!='' || item.BoxesRcvd === boxesrcvd);
    //     });
}
