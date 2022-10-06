import axios from 'axios';
import {baseURL} from "./config";

export const getStatistics = async () => {
    const {data} = await axios.get(`${baseURL}/statistics`);
    return data[0];
}