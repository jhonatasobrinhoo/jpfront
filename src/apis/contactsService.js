import axios from "axios";
import {baseURL} from "./config";

export const saveContact = (contact) => {
    const {data} = axios.post(`${baseURL}/contacts`, contact);
    return data;
}

export const fetchContacts = async () => {
    const {data} = await axios.get(`${baseURL}/contacts`);
    return data;
}