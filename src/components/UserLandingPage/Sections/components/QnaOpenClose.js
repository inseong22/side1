import React, { useContext, useState, useRef, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { MyContext } from '../../../../pages/Make/MakePageV2'
import produce from 'immer'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextAuto from './TextAuto'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: '1px solid rgba(0,0,0,0.2)',
    width:'90%',
    borderRadius:10,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, 0)',
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0.3),
}));

// 아래는 열고 닫히는 애니메이션 효과까지 적용
export const AccordionCustom = (props) => {
  return (
    <div className="centera">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <div>
                {props.title}
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <div>
                {props.children}
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const OpenCloseCustom = (props) => {
  /*
   * title, tooltip, preseen 설정 가능
  */
  const isopen = props.content.qna.shape
  const [open, setOpen] = useState(false)

  return (
    <div className="one-element" >
      <div className={props.type === 'card' ? 'accordion__card' : 'accordion__plain'}>
        <div className="accordion__header-qna" onClick={() => {setOpen(!open)}}>
          <div className="edit-element">
            <div className="accordion__title">
              <div className="title_text" style={{color:`${props.color}`, width:'100%', alignItems: 'start'}}>
                <div className="qna__word" style={{fontFamily:`${props.setting.smallFont}`}}>Q.</div>
                <div style={{width:'100%'}}>
                  <TextAuto 
                    disabled
                    small
                    value={props.title} 
                    color={props.color} align="start"
                    placeholder="여기를 클릭하여 자주 묻는 질문을 적어보세요."
                    />
                </div>
              </div> 
            </div>
            <div className="centera" style={{justifyContent: 'end', width:'20%'}}>
              { open ? <ExpandMoreIcon style={{transform:'rotate(180deg)'}} /> : <ExpandMoreIcon />}
            </div>
          </div>
        </div>
        {isopen === 'open' ? 
          (<div className="accordion__body" style={{display:'flex', flexDirection:'row', justifyContent:'start'}}>
          {props.children}
          </div>):
          (<div className="accordion__body" style={{display:`${open ? 'flex' : 'none'}`, flexDirection:'row', justifyContent:'start'}}>
          {props.children}
          </div>)
        }
      </div>
    </div>
  );
}

export default OpenCloseCustom


