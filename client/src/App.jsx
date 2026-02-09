import { useState } from "react";

import { ALL_GPUS } from "./graphql/queries";
import { useQuery } from "@apollo/client";

import GpuList from "./components/GpuList";
import SearchBar from "./components/SearchBar";

import GpuContext from "./GpuContext";

import "./App.css";

function App() {
  const { data, loading, error } = useQuery(ALL_GPUS);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const gpus = data?.allGpus || [];

  return (
    <GpuContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        gpus,
      }}
    >
      <h1 id="title-header">MongoDB GPUs</h1>
      <SearchBar />
      <GpuList />
    </GpuContext.Provider>
  );
}

export default App;
