import './Counter.css'
import { useState } from 'react'

function Counter({ name = 'Counter', value: initialValue = 0 }) {
    const [value, setValue] = useState(initialValue)
    const increment = () => setValue(value + 1)
    const decrement = () => setValue(value - 1)

    return (
        <div className='counter-name'>
            <h3 className='counter-title'>{name}</h3>
            <button className='counter-button btn btn-danger' onClick={decrement}>-</button>
            <span className='counter-value'>{value}</span>
            <button className='counter-button btn btn-success' onClick={increment}>+</button>
        </div>
    )
}

export default Counter