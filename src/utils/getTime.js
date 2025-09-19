export default function getTime(dt, type) {
    const milsec = dt * 1000;
    const date = new Date(milsec);
    let result = type == 'hours' ? date.getHours() : 
                type == 'minutes' ? date.getMinutes() :
                type == 'weekday' ? date.toLocaleDateString('ru-RU', {weekday: "short"}): 
                type == 'month' ? date.toLocaleDateString('ru-RU', {month: "short"}): 
                type == 'day' ? date.toLocaleDateString('ru-RU', {day: "numeric"}) : '';
    
    result = type != 'minutes' ? result : 
    result < 10 ? '0' + result : result;
    // console.log(result);
    return result
}