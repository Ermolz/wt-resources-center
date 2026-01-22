import { gql } from '@apollo/client';

export const GET_GPUS = gql`
  query GetGpus($filters: GpuFilters) {
    getGpus(filters: $filters) {
      id
      name
      memoryGB
      memoryType
      tdp
      price
      status
      description
      createdAt
      updatedAt
      chipset {
        id
        name
        manufacturer
      }
      vendor {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_GPU = gql`
  query GetGpu($id: ID!) {
    getGpu(id: $id) {
      id
      name
      memoryGB
      memoryType
      tdp
      price
      status
      description
      createdAt
      updatedAt
      chipset {
        id
        name
        manufacturer
      }
      vendor {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_CHIPSETS = gql`
  query GetChipsets {
    getChipsets {
      id
      name
      manufacturer
    }
  }
`;

export const GET_VENDORS = gql`
  query GetVendors {
    getVendors {
      id
      name
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    getTags {
      id
      name
    }
  }
`;

