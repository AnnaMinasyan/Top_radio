import { getData, storeData } from "./local_storage"
import player from "../services/player/PlayerServices"
const intervals:any[] = []
export const initAlarmClock = (toDo: () => void, data:any) => {
        console.log("initAlarmClock",data);
        
            while(intervals.length){
            clearInterval(intervals.shift());
        }
        const interval = setInterval(() => {
            console.log('timer',new Date().getHours(),new Date().getMinutes(),data);
            
        let nowMinute= new Date().getMinutes()
        let nowHours= new Date().getHours()
                if(nowHours==data.alarmClockTime.hours){
                    if(nowMinute==data.alarmClockTime.minute){
                        console.log("minuu");
                        console.log('interval',interval);
                        storeData('alarmClock',null)
                        clearInterval(interval);
                        toDo()
                    }
                }

            }, 5000);
            intervals.push(interval)
        }