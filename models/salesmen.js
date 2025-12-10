const mongoose = require("mongoose");

const performanceRecordSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },

    // [ supervisorValue, peerValue ]
    leadership_competence: { type: [Number], required: true },
    openness_employees: { type: [Number], required: true },
    attitude_clients: { type: [Number], required: true },
    communication: { type: [Number], required: true },
    integrity_company: { type: [Number], required: true },
  },
  {
    _id: false,
  }
);



const salesmanSchema = new mongoose.Schema(
  {
    // we keep your custom string id generated via cryptoRandomId()
    _id: { type: String, required: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    performanceRecords: {
      type: [performanceRecordSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Salesman = mongoose.model("Salesman", salesmanSchema);

module.exports = Salesman;
