const { client } = require('../Utils/connection')  
module.exports = async function (context, req) {
await client.connect();
   const database=client.db("warehouserecord")
   const collection=database.collection("record")
   let recordlist=await collection.find({}).toArray();
   
   context.res = {
       // status: 200, /* Defaults to 200 */
       body: recordlist
   };
}