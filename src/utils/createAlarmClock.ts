import { getData, storeData } from "./local_storage"
import player from "../services/player/PlayerServices"
const intervals: any[] = []
export const initAlarmClock = (toDo: (data: any) => void, data: any) => {
    console.log("initAlarmClock", data);
if (data) {
    while (intervals.length) {
        clearInterval(intervals.shift());
    }
    const interval = setInterval(() => {
        console.log('timer', new Date().getHours(), new Date().getMinutes(), data);

        let nowMinute = new Date().getMinutes()
        let nowHours = new Date().getHours()
        if (nowHours == data.alarmClockTime.hours) {

            if (nowMinute == data.alarmClockTime.minute) {
                console.log("sakdalk");

                toDo(data.radioStation)
                console.log("minuu");
                console.log('interval', interval);

                if (data.alarmClockTime.repeatTime > 0) {
                    console.log("oifsfiosoehfii");

                    toDo(data.radioStation)
                    let alarmClockData = data
                    alarmClockData.alarmClockTime.minute = alarmClockData.alarmClockTime.minute + data.alarmClockTime.repeatTime
                    storeData('alarmClock', alarmClockData)
                } else {
                    storeData('alarmClock', null)
                    clearInterval(interval);
                }

            }
        }

    }, 5000);
    intervals.push(interval) 
}else{
    console.log("sssssssssssssssssss");
    
    while (intervals.length) {
        clearInterval(intervals.shift());
    }
}
    
}