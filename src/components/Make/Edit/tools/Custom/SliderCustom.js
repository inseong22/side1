import React, {useState, useEffect} from 'react'
import './SliderCustom.css'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  SliderMark,
  ChakraProvider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { RamenDiningOutlined } from '@mui/icons-material';

function SliderCustom({top, text, func, value, max}) {
    const [range, setRange] = useState(value);

    useEffect(() => {
      setRange(value)
    }, [value])

    return (
      <div className="edit-element slider__container">
        <div className="edit-element__one" style={{flexDirection: 'column'}}>
          <div stlye={{display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent:'start'}}>
          {
            top && <div className="slider-medium-command">{top}</div>
          }
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems: 'center', width:'100%', height:'100%'}}>
            <ChakraProvider>
                <Slider
                  step={1}
                  focusThumbOnChange={false}
                  min={0}
                  max={max ? max : 100}
                  value={range}
                  onChange={e => {func(e); setRange(e)}}
                >
                  <SliderTrack bg='white'>
                    <Box position='relative' right={10} />
                    <SliderFilledTrack bg='#A89AFF' />
                  </SliderTrack>
                  <SliderThumb bg='linear-gradient(180deg, #9281FF 0%, #6C63FF 100%)' fontSize='sm' boxSize='26px' style={{boxShadow: '4px 4px 15px #D0CDFF'}}/>
                </Slider>
                {/* <NumberInput className="number-input" size='md' maxW='50px' step={1} max={max ? max : 100} value={range} onChange={e => {func(e); setRange(e)}}> */}
                <input className="number-input" type="number" value={range} min={1} max={max ? max : 100} onChange={e => {
                  func(e.currentTarget.value);
                // if(range <= max){
                //   //   // setRange(e.currentTarget.value);
                //   } else{
                //     func(max)
                //   }
                  }}/>
            </ChakraProvider>
          </div>
            {/* {
            text && <div className="slider-small-command" style={{marginLeft:'65px'}}>{text}??? ?????? ????????? ????????? ?????????.</div>
            }  */}
        </div>
      </div>
    )
}

export default SliderCustom
