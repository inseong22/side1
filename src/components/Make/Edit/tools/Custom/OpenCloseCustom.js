import React, {useState, useEffect, useMemo} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip, ChakraProvider } from '@chakra-ui/react'
import './OpenCloseCustom.css'
import './SelectCustom.css'
// import Accordion from '@mui/material/Accordion';

const OpenCloseCustom = (props) => {
  /**
   * title, tooltip, preseen 설정 가능
   */
  const [open, setOpen] = useState(props.open ? true : false)
  const [focused, setFocused] = useState(props.open)
  const [bgc, setBgc] = useState('white')

  useMemo(() => {
    setOpen(props.open)
    setFocused(props.open)
    setTimeout(() => {
      setFocused(false)
    },2000)
  }, [props.open])

  return (
    props.use ? ( 
    <div className="one-element">
      <div className="accordion" style={{ border:`1px solid ${focused ? '#6c63ff' : 'white'}`}}>
        <div className="accordion__header" onClick={() => setOpen(!open)}>
          <div className="edit-element">
            <ChakraProvider>
            <div className="accordion__title">
              <div className="title_text">
                {props.title}
              </div> 
              {
                props.subtext && 
                <div className="title_subtext">
                  {props.subtext}
                </div> 
              }
            </div>
            </ChakraProvider>
            <div className="centera" style={{justifyContent: 'flex-end'}}>
              { open ? <ExpandMoreIcon style={{transform:'rotate(180deg)'}} /> : <ExpandMoreIcon />}
            </div>
          </div>
          { props.preseen && 
            <div>
              {props.preseen}
            </div> }
        </div>
        <div className="accordion__body" style={{display:`${open ? 'flex' : 'none'}`}}>
          {
            props.tooltip && 
              <div style={{fontSize:'13px', width:'100%', textAlign:'left', paddingLeft:'10px'}}>
                {props.tooltip}
              </div>
          }
          {props.children}
        </div>
      </div>
    </div>
    ) : 
    <div className="one-element">
    <div className="dis-accordion">
      <div className="dis-accordion__header">
        <div className="edit-element">
          <ChakraProvider>
          <div className="accordion__title">
            <div className="title_text">
              {props.title}
            </div>      
          </div>
          </ChakraProvider>
          <div className="centera" style={{justifyContent: 'flex-end'}}>
             <ExpandMoreIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default OpenCloseCustom


