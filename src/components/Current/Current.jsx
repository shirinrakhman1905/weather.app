import s from './current.module.scss'
import { icons, images } from '../../assets/image'
import { useSelector } from 'react-redux';
import getWind from '../../utils/getWind';
import getTime from '../../utils/getTime';

const Current = () => {
    const {current, name} = useSelector((state)=>state.weather.weather);
    const iconNum = parseInt(current.weather[0].icon) 
    // console.log(iconNum);
    // console.log(current, name);
    // getTime(current.dt, 'day')
  return (
    <div className={s.current}>
        <div className={s.current__info}>
            <p className={s.current__deg}>{Math.round(current.temp)}°</p>
            <p className={s.current__day}>Сегодня</p>
            <p className={s.current__time}>Время: {getTime(current.dt, 'hours')}:{getTime(current.dt, 'minutes')}</p>
            <p className={s.current__city}>Город: {name}</p>
            <img className={s.current__img} src={icons[iconNum]} alt="" />
        </div>
        <div className={s.current__content}>
            <div className={s.current__card}>
                <div className={s.current__icon}>
                    <img src={images.temp} alt="" />
                </div>
                <p className={s.current__name}>Температура</p>
                <p className={s.current__desc}>{Math.round(current.temp)}° - ощущается как {Math.round(current.feels_like)}°</p>
            </div>
            <div className={s.current__card}>
                <div className={s.current__icon}>
                    <img src={images.pressure} alt="" />
                </div>
                <p className={s.current__name}>Давление</p>
                <p className={s.current__desc}>{current.pressure} мм ртутного столба</p>
            </div>
            <div className={s.current__card}>
                <div className={s.current__icon}>
                    <img src={images.precipitation} alt="" />
                </div>
                <p className={s.current__name}>Осадки</p>
                {
                    current.rain ? 
                    <p className={s.current__desc}>{current.rain['1h']} мм/ч</p> :
                    current.snow ? 
                    <p className={s.current__desc}>{current.snow['1h']} мм/ч</p> :
                    <p className={s.current__desc}>Без осадков</p>
                }
            </div>
            <div className={s.current__card}>
                <div className={s.current__icon}>
                    <img src={images.wind} alt="" />
                </div>
                <p className={s.current__name}>Ветер</p>
                <p className={s.current__desc}>
                    {current.wind_speed} м/с 
                    <span> {getWind(current.wind_deg)} </span>              
                    {
                        current.wind_gust && <span>- порыв ветра {current.wind_gust} м/с</span>
                    }
                </p>
            </div>
        </div>
    </div>
  )
}

export default Current