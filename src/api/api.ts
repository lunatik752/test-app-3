import axios from "axios";
import { TestType } from "../types/test"

const instance = axios.create({ baseURL: import.meta.env.BASE_URL });

const api = {
    async getTests(): Promise<TestType[]> {
        const response = await instance.get('/assets/data/tests.json');
        return response.data;
    },
};

export default api;
