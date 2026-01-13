import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import calculatePerformance from '../utils/calculatePerformance';

const renderRow = (header, data) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">{header}</TableCell>
      <TableCell align="right">{data}</TableCell>
    </TableRow>
  );
};

export function Gpu({ gpu }) {
  const performance = calculatePerformance(gpu);
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

  return (
    <div>
      <TableContainer className='gpu-table'>
        <Table aria-label='gpus table' className={manufacturerName}>
          <TableHead>
            <TableRow>
              <TableCell 
                component="th" 
                colSpan={2}
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  backgroundColor: '#222',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  padding: '1rem'
                }}
              >
                {gpu.manufacturer} {gpu.gpuline} {gpu.model}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className='table-header'>
              <TableCell component="th" colSpan={2}>SPECIFICATIONS</TableCell>
            </TableRow>
            {renderRow('CORES', `${gpu.cores}`)}
            {renderRow('TMUs', `${gpu.tmus}`)}
            {renderRow('ROPs', `${gpu.rops}`)}
            {renderRow('VRAM', `${vramToDisplay} ${gpu.memtype}`)}
            {renderRow('BUS WIDTH', `${gpu.bus} bit`)}

            <TableRow className='table-header'>
              <TableCell component="th" colSpan={2}>CLOCK SPEEDS</TableCell>
            </TableRow>
            {renderRow('BASE CLOCK', `${gpu.baseclock} MHz`)}
            {renderRow('BOOST CLOCK', `${gpu.boostclock} MHz`)}
            {renderRow('MEMORY CLOCK', `${gpu.memclock} Gbps effective`)}

            <TableRow className='table-header'>
              <TableCell component="th" colSpan={2}>THEORETICAL PERFORMANCE</TableCell>
            </TableRow>
            {renderRow('FP32(float)', `${performance[0]}`)}
            {renderRow('TEXTURE RATE', `${performance[1]}`)}
            {renderRow('PIXEL RATE', `${performance[2]}`)}
            {renderRow('BANDWIDTH', `${performance[3]}`)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}