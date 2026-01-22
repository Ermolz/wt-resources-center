const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Manufacturer {
    NVIDIA
    AMD
    Intel
  }

  enum GpuStatus {
    AVAILABLE
    DISCONTINUED
    COMING_SOON
  }

  enum UserRole {
    USER
    ADMIN
  }

  type User {
    id: ID!
    email: String!
    isActive: Boolean!
    role: UserRole!
    createdAt: String!
    updatedAt: String!
  }

  type Chipset {
    id: ID!
    name: String!
    manufacturer: Manufacturer!
    createdAt: String!
    updatedAt: String!
  }

  type Vendor {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Tag {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Gpu {
    id: ID!
    name: String!
    chipset: Chipset!
    vendor: Vendor!
    memoryGB: Int!
    memoryType: String!
    tdp: Int!
    price: Float!
    status: GpuStatus!
    description: String
    tags: [Tag!]!
    createdAt: String!
    updatedAt: String!
  }

  input GpuFilters {
    status: GpuStatus
    chipsetId: ID
    vendorId: ID
    minMemory: Int
    maxMemory: Int
    minTdp: Int
    maxTdp: Int
    minPrice: Float
    maxPrice: Float
    search: String
    tagIds: [ID!]
  }

  input CreateGpuInput {
    name: String!
    chipsetId: ID!
    vendorId: ID!
    memoryGB: Int!
    memoryType: String!
    tdp: Int!
    price: Float!
    status: GpuStatus
    description: String
    tagIds: [ID!]
  }

  input UpdateGpuInput {
    name: String
    chipsetId: ID
    vendorId: ID
    memoryGB: Int
    memoryType: String
    tdp: Int
    price: Float
    status: GpuStatus
    description: String
    tagIds: [ID!]
  }

  type Query {
    getGpus(filters: GpuFilters): [Gpu!]!
    getGpu(id: ID!): Gpu
    getChipsets: [Chipset!]!
    getVendors: [Vendor!]!
    getTags: [Tag!]!
    me: User
  }

  type Mutation {
    createGpu(input: CreateGpuInput!): Gpu!
    updateGpu(id: ID!, input: UpdateGpuInput!): Gpu!
    deleteGpu(id: ID!): Boolean!
    toggleGpuStatus(id: ID!): Gpu!
  }
`;

module.exports = typeDefs;

