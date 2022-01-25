import React, {useContext} from 'react'
import {MyContext} from '../../../../pages/Make/MakePageV2'
import { Template } from '@styled-icons/heroicons-outline'
import { DesignServices } from '@styled-icons/material-outlined'
import './EditTopBar.css'

function EditTopBar({category, setCategory}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <div className="edit__top-bar">
            <div className="edit-radios" onClick={() => setCategory(0)} style={{backgroundColor:`${category === 1 ? 'white' : 'rgb(200,200,202)'}`}}>
                기본
            </div>
            <div className="edit-radios" onClick={() => setCategory(1)} style={{backgroundColor:`${category === 0 ? 'white' : 'rgb(200,200,202)'}`}}>
                디자인
            </div>
        </div>
    )
}

export default EditTopBar
