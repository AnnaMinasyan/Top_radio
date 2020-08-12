import authApi from "./authInstance"
import qs from 'query-string';
import keys from "../keys";

export interface IgetMenuDatasMethodResponse   {
    [key:string]: any,

}
interface IDATA {
    getMenuDatas(): Promise<any>;
    getCities(): Promise<any>,
    getPlayReackLists(payload:number):Promise<any>
}
class Static implements IDATA {
    async getMenuDatas() {
        try {

            const response = await authApi.get(`${keys.API_URL}/radios.json`,);

            return response.data
        } catch (ex) {
            throw new Error(ex);
        }
    }
    async getCities() {
        try {

            const response = await authApi.get(`${keys.API_URL}/cities.json`,);

            return response.data
        } catch (ex) {
            throw new Error(ex);
        }
    }
    async getGanres() {
        console.log(`${keys.API_URL}/genres.json`);
        
        try {

            const response = await authApi.get(`${keys.API_URL}/genres.json`,);
            console.log(response.data);
            
            return response.data
        } catch (ex) {
            throw new Error(ex);
        }
    }
    async getPlayReackLists(payload:any) {
        try {
            console.log('servis getPlayReackLists',payload.payload);
            console.log(`https://botan.ru.com/api/playlists/${payload.payload}/schedules/2020-02-21`);

            const response = await authApi.get(`https://botan.ru.com/api/playlists/${payload.payload}/schedules/2020-02-21`,);

            return response.data
        } catch (ex) {
            throw new Error(ex);
        }
    }
}
const auth = new Static();
export default auth