import { useState } from "react";
import { images } from "../../assets/image"
import s from './navbar.module.scss';
import { getLatLon } from "../../store/features/weather";
import { useDispatch } from "react-redux";
// console.log(style);

const Navbar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch()
  const setWeather = (event)=>{
    if (event.key == "Enter") {
      dispatch(getLatLon(query))      
    }
  }
  return (
    <header className={s.header}>
        <a href="" className={s.logo}>
            <img src={images.logo} alt="" />
            vue weather
        </a>
        <div className={s.search}>
            <img src={images.city} alt="" className={s.search__icon} />
            <input 
              onKeyDown={setWeather} 
              value={query} 
              onChange={(event)=>{ setQuery(event.target.value) }} 
              type="text" 
              className={s.search__input} 
              placeholder="Выбрать город" 
            />
        </div>
    </header>
  )
}

export default Navbar