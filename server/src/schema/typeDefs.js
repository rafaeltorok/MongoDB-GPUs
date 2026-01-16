import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    allGpus: [Gpu!]
    findGpu(id: ID!): Gpu
  }

  type Gpu {
    _id: ID!
    manufacturer: String!
    gpuline: String!
    model: String!
    cores: Int!
    tmus: Int!
    rops: Int!
    vram: Float!
    bus: Int!
    memtype: String!
    baseclock: Int!
    boostclock: Int!
    memclock: Float!
  }

  type Mutation {
    addGpu(
      manufacturer: String!
      gpuline: String!
      model: String!
      cores: Int!
      tmus: Int!
      rops: Int!
      vram: Float!
      bus: Int!
      memtype: String!
      baseclock: Int!
      boostclock: Int!
      memclock: Float!
    ): Gpu!

    removeGpu(id: ID!): Gpu

    updateGpu(
      id: ID!
      manufacturer: String
      gpuline: String
      model: String
      cores: Int
      tmus: Int
      rops: Int
      vram: Float
      bus: Int
      memtype: String
      baseclock: Int
      boostclock: Int
      memclock: Float
    ): Gpu
  }
`;

export default typeDefs;
