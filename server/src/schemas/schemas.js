const { gql } = require('graphql-tag');

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
    vram: Int!
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
      vram: Int!
      bus: Int!
      memtype: String!
      baseclock: Int!
      boostclock: Int!
      memclock: Float!
    ): Gpu!
  }
`;

module.exports = typeDefs;