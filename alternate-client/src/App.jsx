import { useQuery } from "@apollo/client";
import { GET_GPUS } from "./graphql/queries";

import { useState } from "react";

import Gpu from "./components/Gpu";
import SearchBar from "./components/SearchBar";

import "./App.css";

function App() {
  const { loading, error, data } = useQuery(GET_GPUS);
  const [searchTerm, setSearchTerm] = useState("");

  function filterGpu(gpu) {
    const fullname = `${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`;
    return fullname.toLowerCase().includes(searchTerm.trimStart());
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <h1 id="title-header">MongoDB GPUs</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {data
        .gpus
        .filter(gpu => filterGpu(gpu))
        .map((gpu) => {
        return <Gpu key={gpu._id} gpu={gpu} />;
      })}
    </>
  );
}

export default App;
