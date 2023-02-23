const { client } = require('../Utils/connection')  
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    await client.connect();
    const database=client.db("warehouserecord")
    const collection=database.collection("record")
    let record=await collection.findOne({ShipmentID: req.query.ShipmentID});
    if(!record){
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