import { gql } from '@apollo/client';

export const GET_GPUS = gql`
  query {
    gpus: allGpus {
      _id
      manufacturer
      gpuline
      model
      cores
      tmus
      rops
      vram
      bus
      memtype
      baseclock
      boostclock
      memclock
    }
  }
`;