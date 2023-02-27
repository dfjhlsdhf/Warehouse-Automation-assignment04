const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const url="mongodb://warehouse-record:cQKitrO8QOvmVOWiyl3NlaG9HQSEoU1uj37EN0VHpgHgrJx3A1o2rgCmlknwyrGwNfEZGUGe7dRtACDbcivNvw%3D%3D@warehouse-record.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@warehouse-record@"
const client=new MongoClient(url)
module.exports = async function (context, req) {
 
  await client.connect();
  const database = client.db("warehouserecord")
  const collection = database.collection("record")
  
  let data = { ...req.body};
  let query = { _id:req.params._id}
  let newdata = {$set:data}

  let update = await collection.findOneAndUpdate(query,newdata,{returnOriginal:false})
  
  if (!update){
      return context.res = {
          status:400,
          body: "Couldnt find that person"
      }
  }
 
   return (context.res = {
        // status: 200, /* Defaults to 200 */
        status:201,
        body: update.value
    });
};