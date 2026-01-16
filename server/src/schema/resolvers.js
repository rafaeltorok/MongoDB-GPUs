import Gpu from "../models/Gpu.js";
import { GraphQLError } from "graphql";

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
        throw new GraphQLError(
          `Error fetching data from DB: ${error.message}`,
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.id,
            },
          },
        );
      }
    },
  },
  Mutation: {
    addGpu: async (_, args) => {
      try {
        const newGpu = new Gpu({ ...args });
        return await newGpu.save();
      } catch (error) {
        throw new Error("Failed to add GPU:", error.message);
      }
    },
    removeGpu: async (root, args) => {
      // findByIdAndDelete returns the GPU if it was found or null
      const gpuToRemove = await Gpu.findByIdAndDelete(args.id); // Only makes one trip to the database instead of two
      if (!gpuToRemove) {
        throw new GraphQLError(`Invalid or missing ID`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.id,
          },
        });
      }
      return gpuToRemove;
    },
    updateGpu: async (root, { id, ...updatedData }) => {
      const updatedGpu = await Gpu.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });
      if (!updatedGpu) {
        throw new GraphQLError(`Invalid or missing ID`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: id,
          },
        });
      }
      return updatedGpu;
    },
  },
};

export default resolvers;
