import './Variable.css'
import { useState } from 'react'

function Variable({type,name,value,setValue}) {

    return (
        <div className='variable-name'>
            <h3 className='variable-title'>{name||'COUNTER'}</h3>
            <button className='variable-button btn btn-danger' onClick={() => setValue(value - 1)}>&minus;</button>
            <span className='variable-value'>{type && type === 'int' ? value : value.toFixed(2)}</span>
            <button className='variable-button btn btn-success' onClick={() => setValue(value + 1)}>+</button>
        </div>
    )
}

export default Variable