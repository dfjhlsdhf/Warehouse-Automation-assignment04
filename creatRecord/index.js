const {MongoClient}=require("mongodb")
const Record= require("../Models/WarehouseRecord")
const {v4:uuidv4} =require("uuid")
const url="mongodb://warehouse-record:cQKitrO8QOvmVOWiyl3NlaG9HQSEoU1uj37EN0VHpgHgrJx3A1o2rgCmlknwyrGwNfEZGUGe7dRtACDbcivNvw%3D%3D@warehouse-record.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@warehouse-record@"
const client=new MongoClient(url)

module.exports = async function (context, req) {
    await client.connect();
    const database=client.db("warehouserecord")
    const collection=database.collection("record")
    const newRecord=req.body
    if(newRecord && newRecord.Date && newRecord.BoxesRcvd && newRecord.ShipmentID && newRecord.ShippingPO
        && newRecord.WarehouseID){
        const record=new Record({
            _id:uuidv4(),
            Date: newRecord.Date,
            WarehouseID: newRecord.WarehouseID,
            ShippingPO: newRecord.ShippingPO,
            ShipmentID: newRecord.ShipmentID,
            BoxesRcvd:newRecord.BoxesRcvd
        })
        await collection.insertOne(record)
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Insert is done"
        };
    }else{
        context.res={
            status:400
        };
        context.log.error("Invalid input",context.invocationId,JSON.stringify(newRecord))
    }
    context.log.info("Create complete")
    
    
}