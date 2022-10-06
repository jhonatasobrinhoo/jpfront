import axios from 'axios';
import {baseURL} from "./config";

export const getAllTrainings = async () => {
    const {data} = await axios.get(`${baseURL}/trainings`);
    return data;
}

export const addTraining = async (date) => {
    const { data } = await axios.post(`${baseURL}/trainings`, {
        date
    });
    return data;
}

export const removeTraining = async (id) =>  {
    await axios.delete(`${baseURL}/trainings/${id}`);
}
