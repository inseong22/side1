import React, {useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import CheckBoxCustom from '../../tools/Custom/CheckBoxCustom'
import produce from 'immer'
import './ElementsTable.css'

function ElementsTable({elements, content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <div className="one-element">
            <div className="edit-element__box">
                <div className="edit-element__title">
                    요소 ON/OFF
                </div>
                <div>
                    {elements.map((item,index) => {
                        return(
                            <CheckBoxCustom value={item.use} func={item.func} key={index} text={item.title}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ElementsTable
