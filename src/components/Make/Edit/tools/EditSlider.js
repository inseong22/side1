import React, {useState} from 'react'
import { MDBRange } from 'mdb-react-ui-kit';

function EditSlider({content, func, value}) {
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
      onClick={e=>func(e)}
    />
    )
}

export default EditSlider
