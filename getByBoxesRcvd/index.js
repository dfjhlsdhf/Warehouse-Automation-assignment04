const {MongoClient}=require("mongodb")

const url="mongodb://warehouse-record:cQKitrO8QOvmVOWiyl3NlaG9HQSEoU1uj37EN0VHpgHgrJx3A1o2rgCmlknwyrGwNfEZGUGe7dRtACDbcivNvw%3D%3D@warehouse-record.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@warehouse-record@"
const client=new MongoClient(url)
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    await client.connect();
    const database=client.db("warehouserecord")
    const collection=database.collection("record")
    let record=await collection.find({BoxesRcvd: req.body.BoxesRcvd}).toArray();
    if(record.length==0){
        return context.res={
            status:401,
            body:"Couldnt find that record"
        }
    }
    return (context.res={
        status:201,
        body:record
    });

};