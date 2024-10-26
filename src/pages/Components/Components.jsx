import './Components/Counter/Counter'
import Counter from './Components/Counter/Counter'
import './Components/Timer/Timer'
import Timer from './Components/Timer/Timer'
import './Components/Add/Add'
import Add from './Components/Add/Add'
import './Components/Temperatures/Temperatures'
import Temperatures from './Components/Temperatures/Temperatures'
import './Components.css'

function Components() {

  return (
      <div className="main-container">
        <h1 className='title-container'>React Component</h1>
        <div>
          <div className='first-container'>
            <div className='first-box'>
              <Counter name='My Counter' value={10}/>
              <Timer value={0}/>
            </div>
            <div className='second-box'>
              <Add v1={0} v2={0}/>
            </div>
          </div>
          <div>
            <Temperatures/>
          </div>
        </div>
        <h2 className='name'>นาย พีระพัฒน์ พิมทา 66059914</h2>
      </div>
  )
}

export default Components
