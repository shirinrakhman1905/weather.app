import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLatLon = createAsyncThunk('weather/getLatLon', 
    async (city, {getState, dispatch, rejectWithValue})=>{
        try {
        const { weather } = getState()
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weather.key}`);         
            if (response.status == 200) {
                const cityInfo = response.data[0]
                dispatch(getWeather(cityInfo))
            } else {
                throw Error('Данные Lat и Lon не найдены')
            }            
        } catch (error) {
            return rejectWithValue(error)
        }
})

const getWeather = createAsyncThunk('weather/getWeather', 
    async (cityInfo, {getState, rejectWithValue})=>{
        try {
            const {local_names, lat, lon} = cityInfo;
            const { weather } = getState()
            const response = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${weather.key}&units=metric&lang=ru`)
            if (response.status == 200) {
                const weatherObj = {...response.data, name: local_names.ru}
                return weatherObj
            } else {
                throw Error('Данные о погоде не найдены')
            }            
        } catch (error) {
            return rejectWithValue(error)
        }
})

const initialState = {
  key: 'fd0a6ca27d5cbf5772fec7ac633ae094',
  weather: null,
  errorInfo: false
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {   
  },
  extraReducers: (builder)=>{
    builder.addCase(getLatLon.pending, (state)=>{
        state.errorInfo = false;
    })
    builder.addCase(getLatLon.rejected, (state, action)=>{
        state.errorInfo = action.payload.message
    })
    builder.addCase(getWeather.pending, (state)=>{
        state.errorInfo = false
    })
    builder.addCase(getWeather.rejected, (state, action)=>{
        state.errorInfo = action.payload.message
    })
    builder.addCase(getWeather.fulfilled, (state, action)=>{
        state.weather = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const {  } = weatherSlice.actions

export default weatherSlice.reducer