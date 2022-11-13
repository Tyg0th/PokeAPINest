import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios, { AxiosInstance } from 'axios';

export class AxiosAdapter implements HttpAdapter {

    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error('This is an error in Axios Adapter - Check logs')
        }


    }

}