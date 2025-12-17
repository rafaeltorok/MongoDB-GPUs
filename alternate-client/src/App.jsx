import { useQuery } from '@apollo/client';
import { GET_GPUS } from './graphql/queries';
import { Gpu } from './components/Gpu';
import './App.css';


function App() {
  const { loading, error, data } = useQuery(GET_GPUS);

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error}</h1>

  return (
    <>
      {data.gpus.map(gpu => {
        return <Gpu
          key={gpu._id}
          gpu={gpu}
        />
      })}
    </>
  );
}

export default App;