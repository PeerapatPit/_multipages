import'./Temperatures.css'
import Variable from '../Variable/Variable'
import { useState } from 'react'

function Temperatures() {
    const [celsius, setCelsius] = useState(25)
    const [fahrenheit, setFahrenheit] = useState(77)
    const [kelvin, setKelvin] = useState(298.15)

    function convertTemperature(temp, sc) {
        if (sc === 'C') {
            const celsiusTemp = temp;
            setCelsius((celsiusTemp));
            setFahrenheit(celsiusTemp * 1.8 + 32);
            setKelvin(celsiusTemp + 273.15);
        } else if (sc === 'F') {
            const fahrenheitTemp = temp;
            setCelsius((fahrenheitTemp - 32) / 1.8);
            setFahrenheit(fahrenheitTemp);
            setKelvin(((fahrenheitTemp - 32) / 1.8) + 273.15);
        } else if (sc === 'K') {
            const kelvinTemp = temp;
            setCelsius(kelvinTemp - 273.15);
            setFahrenheit((kelvinTemp - 273.15) * 1.8 + 32);
            setKelvin(kelvinTemp);
        }
    }

    return(
        <div className='temperatures-container'>
            <h3 className='temperatures-title'>Temperatures</h3>
            <h3 className='tem-display'>
                <span className='badge bg-primary '>{(celsius).toFixed(2)}C</span>
                <span className='badge bg-primary '>{(fahrenheit).toFixed(2)}F</span>
                <span className='badge bg-primary '>{(kelvin).toFixed(2)}K</span></h3>
            <div className='temperatures-variables'>
                <Variable name={'Celsius'} value={celsius} setValue={(value) => convertTemperature(value, 'C')} />
                <Variable name={'Fahrenheit'} value={fahrenheit} setValue={(value) => convertTemperature(value, 'F')} />
                <Variable name={'Kelvin'} value={kelvin} setValue={(value) => convertTemperature(value, 'K')} />
            </div>
        </div>
    )
}

export default Temperatures