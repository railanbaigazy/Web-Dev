function getWeather() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Sunny'); 
        }, 2000);
    });
}

async function printWeather() {
    try {
        let weather = await getWeather();
        console.log(weather);
    } catch (err) {
        console.error('Error getting weather!')
    }
}

function printWeatherNoAwait() {
    getWeather()  
        .then(resp => console.log(resp))
        .catch(err => console.error(`Error getting weather: ${err}`));
}  

console.log('Getting weather\n');
printWeather();
printWeatherNoAwait();