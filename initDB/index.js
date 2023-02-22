const { client } = require('../Utils/connection')  
const {v4:uuidv4} =require("uuid")

let record=[
        {
            "_id":uuidv4(),
            "Date": "Mar 11, 2022",
            "WarehouseID": "a908cef7-4c67-40f3-88f7-08a03ba4104e",
            "ShippingPO": "3f7b2654-052d-4a4e-905f-87f22a3877a9",
            "ShipmentID": "3",
            "BoxesRcvd": "5"
        },
        {
            "_id":uuidv4(),
            "Date": "Mar 10, 2022",
            "WarehouseID": "a908cef7-4c67-40f3-88f7-08a03ba4104e",
            "ShippingPO": "71b720e3-2847-45de-bbe7-8fa099d64632",
            "ShipmentID": "2",
            "BoxesRcvd": "2"
        },
        {
            "_id":uuidv4(),
            "Date": "Mar 9, 2022",
            "WarehouseID": "a908cef7-4c67-40f3-88f7-08a03ba4104e",
            "ShippingPO": "81d06bd2-39e3-427c-9fb3-4e217b9a4d60",
            "ShipmentID": "1",
            "BoxesRcvd": "12"
        }
    ]


module.exports = async function (context, req) {
    await client.connect();
    const database=client.db("warehouserecord")
    const collection=database.collection("record")
    await collection.deleteMany({})
    await collection.insertMany(record)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Init is done"
    };
}