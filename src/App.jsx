import { useDispatch, useSelector } from "react-redux"
import Current from "./components/Current/Current"
import Navbar from "./components/Navbar/Navbar"
import { getLatLon } from "./store/features/weather"
import { useEffect } from "react"
import Daily from "./components/Daily/Daily"

const App = () => {
  const {weather, errorInfo} = useSelector((state)=>state.weather);
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getLatLon('Ташкент'))
  }, [])
  return (
    <div className="container">
      <Navbar/>
      {
        errorInfo ? <h2>{errorInfo}</h2> :
        weather ? (
        <>
          <Current/>
          <Daily/>
        </>
        ) : <div>Загрузка...</div>

      }
    </div>
  )
}

export default App