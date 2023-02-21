const {MongoClient}=require("mongodb")

const url="mongodb://warehouse-record:cQKitrO8QOvmVOWiyl3NlaG9HQSEoU1uj37EN0VHpgHgrJx3A1o2rgCmlknwyrGwNfEZGUGe7dRtACDbcivNvw%3D%3D@warehouse-record.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@warehouse-record@"
const client=new MongoClient(url)

module.exports = async function (context, req) {
    
    context.log('JavaScript HTTP trigger function processed a request.');
    await client.connect();
    const database=client.db("warehouserecord")
    const collection=database.collection("record")
    let record=await collection.findOne({_id: req.body._id});
    if(!record){
        return context.res={
            status:401,
            body:"Couldnt find that record"
        }
    }
    const result = await collection.deleteOne(record);
    if (result.deletedCount === 1) {
        return (context.res = {
            // status: 200, /* Defaults to 200 */
            body: 'record has been removed'
        })
    } else {
            return context.res={
                status:400,
                body:"Couldnt find that record"
            }
          }

}