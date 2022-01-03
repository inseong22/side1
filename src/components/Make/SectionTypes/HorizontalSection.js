import React, {useState, useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import './Default.css'

function HorizontalSection({content}) {
    const [show, setShow] = useState(false);
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const showPop = () => {
        setShow(!show);
        console.log()
    }

    const setWidth = len => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, width: len} : item)
        action.setContents(newContents);
    }

    return (
        <>
            <div style={{display: show ? 'none' : 'block'}} className="balloon">
                <span onClick={() => setWidth(75)}>
                    75%
                </span>
                <span onClick={() => setWidth(60)}>
                    60%
                </span>
                <span onClick={() => setWidth(90)}>
                    90%
                </span>
            </div>
            <hr style={{width:`${content.width}%`, cursor:`pointer`}} onClick={() => showPop()} />
        </>
    )
}

export default HorizontalSection
