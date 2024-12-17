import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import WeatherData from '../types/WeatherData'

interface LatestWeatherTableProps {
  weatherDataLatest: WeatherData
}

const LatestWeatherTable = ({ weatherDataLatest }: LatestWeatherTableProps) => {
  return (
    <Box textAlign="center" sx={{ m: 3 }}>
      <b>Latest values</b>
      <TableContainer className="weather-table" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                temperature_in
              </TableCell>
              <TableCell align="left">{weatherDataLatest.temperature_in?.value}&deg;C</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>temperature_out</TableCell>
              <TableCell align="left">{weatherDataLatest.temperature_out?.value}&deg;C</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>humidity</TableCell>
              <TableCell align="left">{weatherDataLatest.humidity?.value} %</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>pressure</TableCell>
              <TableCell align="left">{weatherDataLatest.pressure?.value} hPa</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

LatestWeatherTable.displayName = 'LatestWeatherTable'
export default LatestWeatherTable