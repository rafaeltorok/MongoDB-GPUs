import { gql } from "@apollo/client";

export const ALL_GPUS = gql`
  query {
    allGpus {
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
