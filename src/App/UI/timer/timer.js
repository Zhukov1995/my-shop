import { useState, useRef, useEffect } from 'react';
import './timer.scss';

const Timer = () => {
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [distance,setDistance] = useState(0);

    let interval = useRef();

    const startTimer = () => {
        const countDownDate = new Date('May 28, 2022 00:27:00').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            setDistance(distance);

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance <= 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000)
    }

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    },[]);

    return (
        <div className="timer">
            <h2>До конца акции осталось:</h2>
            {distance > 0 ?
                <div className="timer_wrapper">
                    <section>
                        <p>{timerDays}</p>
                        <p><small>Дней</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerHours}</p>
                        <p><small>Часов</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerMinutes}</p>
                        <p><small>Минут</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerSeconds}</p>
                        <p><small>Секунд</small></p>
                    </section>
                </div>
                :
                <h2 className='timer-finish'>Акция завершена!</h2>
            }
            
        </div>
    )
}

export default Timer;