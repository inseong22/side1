import React, {useState, useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import './Default.css'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function HorizontalSection({content}) {
    const [show, setShow] = useState(false);
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    

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
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Open Popover
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
            >
                <div className="pop-balloon">
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
            </Popover>
            <hr style={{width:`${content.width}%`, cursor:`pointer`}} onClick={handleClick} />
        </>
    )
}

export default HorizontalSection
