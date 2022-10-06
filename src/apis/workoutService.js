import axios from 'axios';
import {baseURL} from "./config";

export const getAllWorkouts = async () => {
    const {data} = await axios.get(`${baseURL}/workouts`);
    return data;
}

export const addWorkout = async (date) => {
    const { data } = await axios.post(`${baseURL}/workouts`, {
        date
    });
    return data;
}

export const removeWorkout = async (id) =>  {
    await axios.delete(`${baseURL}/workouts/${id}`);
}
