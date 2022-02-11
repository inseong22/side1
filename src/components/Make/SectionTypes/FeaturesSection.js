import React, {useContext, useEffect, useState, useRef} from 'react'
import Editor from '../tools/Editor'
import Icon from '../tools/Icon'
import './FeaturesSection.css'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import IconTable from './components/IconTable'
import { MyContext } from '../../../pages/Make/MakePageV2'
import produce from 'immer'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Upload} from '@styled-icons/bootstrap';
import {
    ChakraProvider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
  } from '@chakra-ui/react'

function FeaturesSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const heightRef = useRef(null)
    const [open, setOpen] = useState([false, false, false]);
    const handleClick = (index) => {
        setOpen(produce(open, draft => {
            draft[index] = !open[index];
        }));
    };
  
    const handleClose = (index) => {
        setOpen(produce(open, draft => {
            draft[index] = false;
        }));
    };

    const returnFeatureCards = content.features.map((item, index) => {
        // '1px 1px 3px rgba(0,0,0,0.2)'
        return(
            <div key={index} className="feature__card" style={{boxShadow:'', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.features.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                <div className="centeras" style={{justifyContent: `${content.align}`}}>
                    <div style={{width:`${content.featureImage.size}px`, height:`${content.featureImage.size}px`, position:'relative', cursor:'pointer'}}>
                        {
                        content.featureImage.type === 'image' ? <>
                        { item.attachment ? 
                        <img src={item.attachment} style={{width:`${content.featureImage.size}px`, height:`${content.featureImage.size}px`, borderRadius:`${content.featureImage.borderRadius}px`}}/> 
                          :
                        <div className="feature-upload-button" style={{borderRadius:`${content.featureImage.borderRadius}px`, backgroundColor:`${content.featureImage.backgroundColor}`}}>
                            <Upload size="25" />
                        </div>
                        
                        }
                        <input
                            className="feature-upload-file"
                            type="file" 
                            accept="image/*" 
                            id="file" 
                            onChange={ e => {
                                const {target:{files},} = e;
                                const oneFile = files[0];
                                const reader = new FileReader();
                                reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
                                    const {currentTarget:{result}} = finishedEvent;
                                    action.setContents(produce(state.contents, draft=>{
                                        draft[state.secNum].features[index].attachment = result;
                                    }))
                                }
                                if(oneFile){
                                    reader.readAsDataURL(oneFile);
                                }
                            } }
                        /> </> : 
                        <>
                        <Popover
                            placement='top'
                            closeOnBlur={false}
                            isOpen={open[index]}
                            onClose={() => handleClose(index)}>
                        <PopoverTrigger>
                                <div className="feature-upload-button" style={{borderRadius:`${content.featureImage.borderRadius}px`, backgroundColor:`${content.featureImage.backgroundColor}`}} onClick={() => handleClick(index)}>
                                    {item.icon ? 
                                        <>{item.icon}</> 
                                        :
                                        <Upload size="25" />
                                    }
                                </div>
                        </PopoverTrigger>
                        <PopoverContent style={{zIndex:1900}}>
                            <PopoverArrow />
                            <PopoverHeader>아이콘을 선택하세요.</PopoverHeader>
                            <PopoverBody>
                                <IconTable func={ e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].features[index].icon = e;
                                })) } handleClose={() => handleClose(index)}/>
                            </PopoverBody>
                        </PopoverContent>
                        </Popover>
                            
                        </>
                        }
                    </div> 
                </div>
                {
                    content.featureText.titleUse && 
                    <div className="df-margin-big feature-title" style={{width:'100%'}}>
                        <TextareaAutosize 
                            className="text-input" 
                            value={item.title} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].features[index].title = e.currentTarget.value;
                            }))} 
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                                color:`${content.featureText.color}`,
                                fontFamily:`${state.setting.smallFont}`,
                            }}
                            />
                    </div>
                }
                {
                    content.featureText.descUse && 
                    <div className="df-margin feature-desc">
                        <TextareaAutosize 
                            className="text-input" 
                            value={item.desc} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].features[index].desc = e.currentTarget.value;
                            }))}  
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                                color:`${content.featureText.color}`,
                                fontFamily:`${state.setting.smallFont}`,
                            }}
                            />
                    </div>
                }
            </div>
        )
    })

    return (
        <ChakraProvider>
            <motion.div className="template"
                data-aos={content.animation.type} aos-duration="2000" >
                <TitleDesc content={content} />

                <div className="features__container" ref={heightRef} >
                    {returnFeatureCards}
                </div>

            </motion.div>
        </ChakraProvider>
    )
}

export default FeaturesSection
