import axios from "axios";
import { TestType } from "../types/test.ts"

const instance = axios.create({ baseURL: "http://localhost:5173" });

const api = {
    async getTests(): Promise<TestType[]> {
        const response = await instance.get('/data/tests.json');
        return response.data;
    },
};

export default api;
