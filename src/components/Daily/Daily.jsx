import { useSelector } from 'react-redux';
import s from './daily.module.scss'
import DailyItem from './DailyItem'

const Daily = () => {
    const {daily} = useSelector((state)=>state.weather.weather);
    console.log(daily);
  return (
    <div className={s.daily}>
        <div className={s.daily__controls}>
            <button className={s.daily__btn}>На неделю</button>
            <button className={s.daily__btn}>Отменить</button>
        </div>
        <div className={s.daily__content}>
            {
                daily.map((elem, index)=>(
                    <DailyItem key={elem.dt} day={elem} index={index} />
                )).slice(0, 7)
            }
        </div>
    </div>
  )
}

export default Daily