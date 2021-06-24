import { getData, storeData } from "./local_storage"
import player from "../services/player/PlayerServices"
const intervals:any[] = []
export const initTimerSleep = (toDo: () => void, data:any) => {
    //stex data -ov poxancel em hours:number, u minute:number, u pordzel em hamematel ete jamy khamngni es pahi jami het ropen stuge u bdi kanchver toDo()
        while(intervals.length){
            clearInterval(intervals.shift());
        }
        const interval = setInterval(() => {
            //console.log('timer',new Date().getHours(),new Date().getMinutes(),data);
            
        let nowMinute= new Date().getMinutes()
        let nowHours= new Date().getHours()
                if(nowHours==data.hours){
                    if(nowMinute==data.minute){
                        //console.log("minuu");
                        //console.log('interval',interval);
                        storeData('timerSleepTime',null)
                        clearInterval(interval);
                        toDo()
                    }
                }

            }, 5000);
            intervals.push(interval)}