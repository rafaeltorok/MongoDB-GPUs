import calculatePerformance from '../utils/calculatePerformance';

function Gpu({ gpu }) {
  const manufacturerName = 
    gpu.manufacturer.toLowerCase() === 'nvidia'
    ? 'nvidia'
    : gpu.manufacturer.toLowerCase() === 'amd'
    ? 'amd'
    : gpu.manufacturer.toLowerCase() === 'intel'
    ? 'intel'
    : gpu.gpuline.toLowerCase() === 'geforce'
    ? 'nvidia'
    : gpu.gpuline.toLowerCase() === 'radeon'
    ? 'amd'
    : gpu.gpuline.toLowerCase() === 'arc'
    ? 'intel'
    : 'generic';
  const vramToDisplay = gpu.vram < 1 ? `${gpu.vram * 1000}MB` : `${gpu.vram}GB`;

  const performance = calculatePerformance(gpu);

  return(
    <div className="container">
      <div className="table-main-header">
        <h2 className={manufacturerName}>{gpu.manufacturer} {gpu.gpuline} {gpu.model}</h2>
      </div>
      <div className="tables">
        <table className={manufacturerName}>
          <thead>
            <tr>
              <th className="table-header" colSpan={2}>SPECIFICATIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>CORES</th>
              <td>{gpu.cores}</td>
            </tr>
            <tr>
              <th>TMUs</th>
              <td>{gpu.tmus}</td>
            </tr>
            <tr>
              <th>ROPs</th>
              <td>{gpu.rops}</td>
            </tr>
            <tr>
              <th>VRAM</th>
              <td>{vramToDisplay} {gpu.memtype}</td>
            </tr>
            <tr>
              <th>BUS WIDTH</th>
              <td>{gpu.bus} bit</td>
            </tr>
          </tbody>
        </table>
        
        <table className={manufacturerName}>
          <thead>
            <tr>
              <th className="table-header" colSpan={2}>CLOCK SPEEDS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>BASE CLOCK</th>
              <td>{gpu.baseclock} MHz</td>
            </tr>
            <tr>
              <th>BOOST CLOCK</th>
              <td>{gpu.boostclock} MHz</td>
            </tr>
            <tr>
              <th>MEMORY CLOCK</th>
              <td>{gpu.memclock} Gbps effective</td>
            </tr>
          </tbody>
        </table>
        
        <table className={manufacturerName}>
          <thead>
            <tr>
              <th className="table-header" colSpan={2}>THEORETICAL PERFORMANCE</th>  
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>FP32(float)</th>
              <td>{performance[0]}</td>
            </tr>
            <tr>
              <th>TEXTURE RATE</th>
              <td>{performance[1]}</td>
            </tr>
            <tr>
              <th>PIXEL RATE</th>
              <td>{performance[2]}</td>
            </tr>
            <tr>
              <th>BANDWIDTH</th>
              <td>{performance[3]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Gpu;