import { ALL_GPUS } from "./graphql/queries";
import { useQuery } from "@apollo/client";
import Gpu from "./components/Gpu";
import "./App.css";

function App() {
  const { data, loading, error } = useQuery(ALL_GPUS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const gpus = data?.allGpus || [];

  return (
    <div>
      {gpus.map((gpu) => {
        return <Gpu gpu={gpu} key={gpu._id} />;
      })}
    </div>
  );
}

export default App;
