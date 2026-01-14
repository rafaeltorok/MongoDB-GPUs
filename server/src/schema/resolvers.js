const Gpu = require('../models/Gpu');

const resolvers = {
	Query: {
    allGpus: async () => {
      try {
        return await Gpu.find();
      } catch (error) {
        throw new Error("Error fetching data from DB:" + error.message);
      }
    },
    findGpu: async (_, { id }) => {
      try {
        const gpu = await Gpu.findById(id);
        if (!gpu) {
          console.error("GPU was not found in the database");
          return null;
        } else {
          return gpu;
        }
      } catch (error) {
        throw new Error("Error fetching data from DB:" + error.message);
      }
    }
	},
  Mutation: {
    addGpu: async (_, args) => {
      try {
        const newGpu = new Gpu({ ...args });
        return await newGpu.save();
      } catch (error) {
        throw new Error("Failed to add GPU:", error.message);
      }
    }
  }
}

module.exports = resolvers;