const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  },
  serviceCharge: {
  type: Number,
  default: 0
},
partsCost: {
  type: Number,
  default: 0
},
totalAmount: {
  type: Number,
  default: 0
},
paymentStatus: {
  type: String,
  default: "Unpaid"
}
});

module.exports = mongoose.model("Service", serviceSchema);