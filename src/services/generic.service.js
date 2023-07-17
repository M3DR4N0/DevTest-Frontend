import axios from "axios";

export const http = axios.create({
    baseURL: 'https://localhost:7067/api',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'    
    }
});

export default function GenericService(endpoint = '') {
    
    const httpService = {
        getAll: async () => {
            const res = await http.get(`/${endpoint}`);
            return res.data;
        },
        getById: async (id) => {
            const res = await http.get(`/${endpoint}/${id}`);
            return res.data;
        },
        create: async (data) => {
            console.log(data);
            const res = await http.post(`/${endpoint}`, data);
            return res.data;
        },
        update: async (data) => {
            const res = await http.put(`/${endpoint}`, data);
            return res.data;
        },
        delete: async (id) => {
            const res = await http.delete(`/${endpoint}/${id}`);
            return res.data;
        }
    }

    return httpService; 
}