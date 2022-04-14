import moment from 'moment-timezone';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import {DATE_COUNT_DOWN} from '../../containers/App/contants';


const CountDownTimer = ({className}) => {
    const [time, setTime] = useState('')
    const [countimer, setCountTimer] = useState(null)

    function padWithZeros(number, minLength) {
        const numberString = number.toString();
        if(numberString.length >= minLength) return numberString;
        return "0".repeat(minLength - numberString.length) +  numberString;
    }

    const convertSquare = (time, type) => {
        return (
            <div>
                <div className='font-500 fs-32 text-center uppercase mb-4 md:text-xl title-count-down text-white'>{type}</div>
                <div className='flex'>
                    <div className='time-item flex flex-col items-center justify-center font-700 fs-44'>
                        {time.substr(0, 1)}
                    </div>
                    <div className='time-item flex flex-col items-center justify-center font-700 fs-44'>
                        {time.substr(1, 2)}
                    </div>
                </div>
            </div>
        )
    }


    useEffect(() => {
        var eventTime, currentTime, duration, interval, intervalId;
    
        interval = 1000; // 1 second
    
        eventTime = moment.tz(`${DATE_COUNT_DOWN}T00:00:00`, "America/New_York");
        currentTime = moment.tz();
        duration = moment.duration(eventTime.diff(currentTime));
    
        setInterval(function() {
            duration = moment.duration(duration - interval, 'milliseconds');
            if (duration.asSeconds() <= 0) {
                clearInterval(intervalId);
                setCountTimer({
                    day: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                })
            } else {
                setCountTimer({
                    day: padWithZeros(duration.asDays().toFixed(0), 2),
                    hours: padWithZeros(duration.hours(), 2),
                    minutes: padWithZeros(duration.minutes(), 2),
                    seconds: padWithZeros(duration.seconds(), 2),
                })
            }
        }, interval);
        // return () => clearInterval(intervalId);
    }, []);
   

    return(
        <div className={className}>
            {
                countimer ? (
                    <div className='flex fs-72 content-count'>
                        <div>{convertSquare(countimer?.day, 'days')}</div><span className='dot'>:</span>
                        <div>{convertSquare(countimer?.hours, 'hours')}</div><span className='dot'>:</span>
                        <div>{convertSquare(countimer?.minutes, 'minutes')}</div><span className='dot'>:</span>
                        <div>{convertSquare(countimer?.seconds, 'seconds')}</div>
                    </div>
                ) : null
            }
           
        </div>
    );
}

export default styled(CountDownTimer)`
    .time-item {
        background: #FFFFFF;
        box-shadow: 4px 4px 8px rgba(138, 79, 255, 0.25);
        border-radius: 10px;
        width: 90px;
        height: 120px;
        margin: 5px;
    }
    .dot {
        color: #fff;
        display: flex;
        align-items: flex-end;
        margin: 0px 10px 20px 10px;
    }
`;
