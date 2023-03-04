import {useEffect, useState} from "react";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
export default function useTimer(deadline, interval = SECOND) {
    const [timespan, setTimespan] = useState(new Date(deadline) - Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimespan((_timespan) => _timespan - interval);
        }, interval);

        if (timespan <= 0) {
            clearInterval(intervalId);
            return;
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [interval, timespan]);

    useEffect(() => {
        setTimespan(new Date(deadline) - Date.now());
    }, [deadline]);

    return {
        days: Math.floor(timespan / DAY),
        hours: Math.floor((timespan / HOUR) % 24),
        minutes: Math.floor((timespan / MINUTE) % 60),
        seconds: Math.floor((timespan / SECOND) % 60)
    };
}