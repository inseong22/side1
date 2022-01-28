import React, {useState} from 'react'
import { MDBRange } from 'mdb-react-ui-kit';

function EditSlider({func, value}) {
    const [range, setRange] = useState(value);

    const onChange = (e) => {
        setRange(e.target.value)
      }

    return (
      <MDBRange
        value={range}
        id='customRange'
        label=''
        min='0'
        max='20'
        onChange={onChange}   
        onClick={e => func(e)}
      />
    )
}

export const EditSliderContainer = ({text, value, func}) => {
  return(
    <div className="edit-element">
      <div className="edit-element__left">
          {text}
      </div>
      <div className="edit-element__right">
        <EditSlider value={value} func={func}/>
      </div>
    </div>
  )
}

export default EditSlider
