import React, { useContext, useEffect, useState, useRef } from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'
import './MapSection.css'

import appstorebutton from '../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../tools/img/playstorebutton.png'

import Popover from '@mui/material/Popover';
import {ImageAdd} from '@styled-icons/boxicons-regular';

function MapSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnText = () => {
        return(
            <div className="text__container">
                <Editor 
                    data={content.text}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        changeText(data);
                    }}
                    />
            </div>
        )
    }
    const returnMap = () => {
        return(
            <div className="map__container">
                지도
            </div>
        )
    }

    const changeText = ( data ) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, text: data} : item)
        action.setContents(newContents);
    }

    const returnSectionTemplate = () => {
        switch(content.templateNumber){
            case 1:
                return(
                    <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                        {returnText()}
                        {returnMap()}
                    </div>
                )

            case 2:
                return(
                    <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                        {returnMap()}
                        {returnText()}
                    </div>
                )

            case 3:
                return(
                    <div className="template" style={{flexDirection:'column'}}>
                        {returnText()}
                        {returnMap()}
                    </div>
                )

            default:
                return(
                    <div className="template" style={{flexDirection:'column-reverse'}}>
                        {returnText()}
                        {returnMap()}
                    </div>
                )
        }
    }

    return (
        <>
            {returnSectionTemplate()}
        </>
    )
}

export default MapSection
