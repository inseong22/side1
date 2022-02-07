import React from 'react'
import CheckboxCustom from '../../tools/Custom/CheckBoxCustom'
import {EditCheckbox} from '../../tools/Custom/CheckBoxCustom'
import './ElementsTable.css'

function ElementsTable({elements}) {
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
