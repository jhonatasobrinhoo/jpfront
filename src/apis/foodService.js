import axios from 'axios';
import {baseURL} from "./config";

export const getAllFood = async () => {
    const {data} = await axios.get(`${baseURL}/food`);
    return data;
}

export const addFood = async (date) => {
    const { data } = await axios.post(`${baseURL}/food`, {
        date
    });
    return data;
}

export const removeFood = async (id) =>  {
    await axios.delete(`${baseURL}/food/${id}`);
}