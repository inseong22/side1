import React, {useState} from 'react'

function Line({content}) {
    const [show, setShow] = useState(false);

    const showPop = () => {
        setShow(true);
    }
    return (
        <>
        <div style={{display: show ? 'none' : 'block'}}>
            말풍선
        </div>
        <hr style={{width:`${content.width}%`, cursor:`pointer`}} onClick={() => showPop()} />
        </>
    )
}

export default Line
