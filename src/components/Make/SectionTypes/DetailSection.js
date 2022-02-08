import React, { useContext, useEffect, useState, useRef } from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'
import './DetailSection.css'
import TitleDesc from './components/TitleDesc'

import appstorebutton from '../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../tools/img/playstorebutton.png'

import Popover from '@mui/material/Popover';
import {ImageAdd} from '@styled-icons/boxicons-regular';
import surfee1 from '../../../tools/img/surfee1.png'

import { motion } from 'framer-motion';

function DetailSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <>
            <motion.div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}} 
            data-aos={content.animation.type} aos-duration="2000" >
                
            </motion.div>
        </>
    )
}

export default DetailSection