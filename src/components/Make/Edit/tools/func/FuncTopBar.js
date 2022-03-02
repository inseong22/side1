import React, {useContext} from 'react'
import {MyContext} from '../../../../../pages/Make/MakePageV2'
import { Template } from '@styled-icons/heroicons-outline'
import { DesignServices } from '@styled-icons/material-outlined'
import './EditTopBar.css'

function FuncTopBar({category, setCategory}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <>
        <div className="edit__top-bar">
            <div className="edit__top-bar fixed">
                <div className={category === 1 ? 'edit-radios' : 'edit-radios er-clicked'} onClick={() => setCategory(0)}>
                    기본
                </div>
                <div className={category === 0 ? 'edit-radios' : 'edit-radios er-clicked'} onClick={() => setCategory(1)}>
                    디자인
                </div>
            </div>
        </div>
        </>
    )
}

export default FuncTopBar
