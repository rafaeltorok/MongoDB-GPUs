const mongoose = require("mongoose");

const gpuSchema = new mongoose.Schema({
  manufacturer: { type: String, required: true, trim: true },
  gpuline: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  cores: { type: Number, required: true, min: 1 },
  tmus: { type: Number, required: true, min: 1 },
  rops: { type: Number, required: true, min: 1 },
  vram: { type: Number, required: true, min: 0.1 },
  bus: { type: Number, required: true, min: 1 },
  memtype: { type: String, required: true, trim: true },
  baseclock: { type: Number, required: true, min: 1 },
  boostclock: { type: Number, required: true, min: 1 },
  memclock: { type: Number, required: true, min: 0.01 },
});

const Gpu = mongoose.model("Gpu", gpuSchema);
module.exports = Gpu;
