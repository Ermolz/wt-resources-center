import { gql } from '@apollo/client';

export const CREATE_GPU = gql`
  mutation CreateGpu($input: CreateGpuInput!) {
    createGpu(input: $input) {
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

export const UPDATE_GPU = gql`
  mutation UpdateGpu($id: ID!, $input: UpdateGpuInput!) {
    updateGpu(id: $id, input: $input) {
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

export const DELETE_GPU = gql`
  mutation DeleteGpu($id: ID!) {
    deleteGpu(id: $id)
  }
`;

export const TOGGLE_GPU_STATUS = gql`
  mutation ToggleGpuStatus($id: ID!) {
    toggleGpuStatus(id: $id) {
      id
      name
      status
    }
  }
`;

