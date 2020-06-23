import axios from 'axios';
import { config } from '../config';
export default async function EiaApi() {
  const requestEia = {
    method: 'GET',
    url: `${config.eia.baseUrl}?api_key=${config.eia.apiKey}&series_id=PET.EMM_EPM0U_PTE_NUS_DPG.W`,
  };
  const weeklyRetailGasoline = await axiosRequest(requestEia);
  console.log(weeklyRetailGasoline.series[0].data[0]);
  return weeklyRetailGasoline.series[0].data[0];
}

async function axiosRequest(request: object) {
  const result = await axios({
    ...request,
  });
  return result.data;
}
