const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  _id:{
    type:String,
    required: true
  },
  Date: {
    type: String,
    required: true,
    default:Date.now
  },
  WarehouseID: {
    type: String,
    required: true
  },
  ShippingPO:{
    type: String,
    required: true
  },
  ShipmentID:{
    type: String,
    required: true
  },
  BoxesRcvd:{
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Record', recordSchema)
