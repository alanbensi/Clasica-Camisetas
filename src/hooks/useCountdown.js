import { useState, useCallback } from 'react';

export const useCountdown = (date, time) => {
    
    let dateMessage = date;
    let [targetDay, targetMonth, targetYear] = (dateMessage).split('/')

    let timeMessage = time;
    let [targetHour, targetMin] = (timeMessage).split(':')

    const [daysLeft, setdaysLeft] = useState("");
    const [hoursLeft, setHoursLeft] = useState("");
    const [minutesLeft, setMinutesLeft] = useState("");
    const [secondsLeft, setSecondsLeft] = useState("");


    let targetDate = new Date()
    targetDate.setFullYear(targetYear, targetMonth -1, targetDay);
    targetDate.setHours(targetHour);
    targetDate.setMinutes(targetMin);
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);

    const timeCounter = useCallback(() => {
        let currentDate = new Date();
        let difference = targetDate.getTime() - currentDate.getTime();
        let remainingTime = new Date(difference);
        setdaysLeft(remainingTime.getUTCDate() - 1);
        setHoursLeft(remainingTime.getUTCHours());
        setMinutesLeft(remainingTime.getUTCMinutes());
        setSecondsLeft(remainingTime.getUTCSeconds());   
    })

    return {timeCounter: timeCounter, daysLeft, hoursLeft, minutesLeft, secondsLeft}
};
