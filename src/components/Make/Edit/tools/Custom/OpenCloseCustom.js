import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip, ChakraProvider } from '@chakra-ui/react'
import { InformationCircle } from '@styled-icons/ionicons-outline';
import './OpenCloseCustom.css'
// import Accordion from '@mui/material/Accordion';

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
  /**
   * title, tooltip, preseen 설정 가능
   */
  const [open, setOpen] = useState(false)

  return (
    props.use ? ( 
    <div className="one-element">
      <div className="accordion" style={{padding:`${open ? '10px 15px 20px 15px' : '10px 15px'}`}}>
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
            <div className="centera" style={{justifyContent: 'end'}}>
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
              <div style={{fontSize:'12px', width:'100%', textAlign:'left', paddingLeft:'10px'}}>
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
          <div className="centera" style={{justifyContent: 'end'}}>
             <ExpandMoreIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default OpenCloseCustom


