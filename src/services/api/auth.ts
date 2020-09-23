import authApi from "./authInstance"
import qs from 'query-string';
import keys from "../keys";
import moment from 'moment';
import { Alert } from "react-native";

export interface IgetMenuDatasMethodResponse {
    [key: string]: any,
}
interface IDATA {
    getMenuDatas(): Promise<any>;
    getCities(): Promise<any>,
    getPlayLists(payload: number): Promise<any>
}
class Static implements IDATA {
    async getMenuDatas() {
        try {
            const response = await authApi.get(`${keys.API_URL}radios.json`,);
            console.log(response);
            
            return response.data
        } catch (error) {
         return Alert.alert("Error",error)
          
        }
    }
    async getCities() {
        try {
            const response = await authApi.get(`${keys.API_URL}cities.json`,);
            return response.data
        } catch (ex) {
            return Alert.alert("Error",ex)
        }
    }
    async getGanres() {
        try {
            const response = await authApi.get(`${keys.API_URL}genres.json`,);
            return response.data
        } catch (ex) {
            return Alert.alert("Error",ex)
        }
    }
    async getPlayLists(payload: any) {
        try {
            const data = moment().format('YYYY-MM-DD')
            const response = await authApi.get(`https://botan.ru.com/api/application/playlist/${payload.payload}/schedules/${data}?trackList=true`,);
            return response.data
        } catch (ex) {
            return Alert.alert("Error",ex)
        }
    }
    async getPlayItemType(payload: any) {
        try {
            const data = moment().format('YYYY-MM-DD')
            
            const response = await authApi.get(`https://botan.ru.com/api/application/playlist/${payload}/schedules/${data}?trackList=true&limit=1`,);
           console.log(`https://botan.ru.com/api/application/playlist/${payload}/schedules/${data}?trackList=true&limit=1`,response);
           
            return response.data
        } catch (ex) {
            return Alert.alert("Error",ex)
        }
    }
}
const auth = new Static();
export default auth