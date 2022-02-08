import React, {useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import {EditCheckbox} from '../../tools/Custom/CheckBoxCustom'
import produce from 'immer'
import './ElementsTable.css'

function ElementsTable({elements, content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <div className="one-element">
            <div className="edit-element__box">
                <div className="edit-element__title">
                    요소
                </div>
                <div>
                    {elements.map((item,index) => {
                        return(
                            <div className="element__container" key={index}>
                                <EditCheckbox value={item.use} func={item.func} />
                                <div>
                                    {item.title}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ElementsTable
