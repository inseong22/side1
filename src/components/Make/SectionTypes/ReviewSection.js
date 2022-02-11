import React, {useContext, useState} from 'react'
import './ReviewSection.css'
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2';
import IconTable from './components/IconTable';
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
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


function ReviewSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
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

    const returnReviewCards = content.reviews.map((item, index) => {
        return(
            <div key={index} className="feature__card" style={{boxShadow:'', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.reviews.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                <div className="centeras" style={{justifyContent: `${content.align}`}}>
                    {content.reviewImage.use && <div style={{width:`${content.reviewImage.size}px`, height:`${content.reviewImage.size}px`, position:'relative', cursor:'pointer'}}>
                        {
                        content.reviewImage.type === 'image' ? <>
                        { item.attachment ? 
                        <img src={item.attachment} style={{width:`${content.reviewImage.size}px`, height:`${content.reviewImage.size}px`, borderRadius:`${content.reviewImage.borderRadius}px`}}/> 
                          :
                        <div className="feature-upload-button" style={{borderRadius:`${content.reviewImage.borderRadius}px`, backgroundColor:`${content.reviewImage.backgroundColor}`}}>
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
                                        draft[state.secNum].reviews[index].attachment = result;
                                    }))
                                }
                                if(oneFile){
                                    reader.readAsDataURL(oneFile);
                                }
                            } }
                        /> </> : 
                        <ChakraProvider>
                        <Popover
                            placement='top'
                            closeOnBlur={false}
                            isOpen={open[index]}
                            onClose={() => handleClose(index)}>
                        <PopoverTrigger>
                                <div className="feature-upload-button" style={{borderRadius:`${content.reviewImage.borderRadius}px`, backgroundColor:`${content.reviewImage.backgroundColor}`}} onClick={() => handleClick(index)}>
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
                                    draft[state.secNum].reviews[index].icon = e;
                                })) } handleClose={() => handleClose(index)}/>
                            </PopoverBody>
                        </PopoverContent>
                        </Popover>
                            
                        </ChakraProvider>
                        }
                    </div> }
                </div>
                <div className="df-margin-big feature-title" style={{width:'100%'}}>
                    <TextareaAutosize 
                        className="text-input"  
                        style={{
                            width:'100%',
                            resize:'none',
                            textAlign:`${content.align}`,
                            fontFamily:`${state.setting.smallFont}`,
                            color:`${content.reviewText.color}`,
                        }}
                        value={item.title} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].reviews[index].title = e.currentTarget.value;
                        }))} 
                        />
                </div>
                {
                    content.rating.use && 
                    <div className="df-margin">
                        <div style={{width:'100%', textAlign:`${content.align}`}}>
                        <Rating
                            value={item.rating} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviews[index].rating = e.currentTarget.value;
                            }))}  
                            precision={0.1}
                            style={{ fontSize: `${content.rating.size}`, color:`${content.rating.color}` }}
                            // size={content.rating.size}
                            // color={content.rating.color}
                        />
                        </div>
                    </div>
                }
                {
                    content.reviewText.use && 
                        <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                        <TextareaAutosize 
                            className="text-input" 
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                                fontFamily:`${state.setting.smallFont}`,
                                color:`${content.reviewText.color}`,
                            }}
                            value={item.desc} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviews[index].desc = e.currentTarget.value;
                            }))}  
                            />
                    </div>
                }
                {
                    content.writer.use && 
                    <div className="df-margin-big feature-writer" style={{width:'100%'}}>
                        <TextareaAutosize 
                            className="text-input" 
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                                color:`${content.writer.color}`,
                            }}
                            value={item.writer} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviews[index].writer = e.currentTarget.value;
                            }))}  
                            />
                    </div>
                }
            </div>
        )
    })

    return (
        <>
            <motion.div className="template"
                data-aos={content.animation.type} aos-duration="2000">
                
                <TitleDesc content={content} />

                <div className="features__container"> 
                    {returnReviewCards}
                </div>

            </motion.div>
        </>
    )
}
export default ReviewSection
