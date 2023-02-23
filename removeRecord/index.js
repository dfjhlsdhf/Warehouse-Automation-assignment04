const { client } = require('../Utils/connection')  

module.exports = async function (context, req) {
    
    context.log('JavaScript HTTP trigger function processed a request.');
    await client.connect();
    const database=client.db("warehouserecord")
    const collection=database.collection("record")
    let record=await collection.findOne({_id: req.query._id});
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