import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import {Upload} from '@styled-icons/bootstrap';
import FeatureCard from './components/FeatureCard'

function GallerySection({content,setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnElementsCards = content.elements.map((item, index) => {
       if(index < content.numOfElements){
           return(
               <>
               {content.card.use && 
               <FeatureCard section="gallery" content={content} index={index}>
                       {content.element.use && 
                       <div style={{width:'100%', position:'relative', cursor:'pointer'}}>
                           { item.attachment ? 
                            <img 
                                className="uphover" 
                                src={item.attachment} 
                                style={{
                                    width:'100%',
                                    objectFit:'cover',
                                    height:`${state.isPhone ? content.element.size/1.5 : content.element.size}px`, 
                                    borderRadius:`${content.card.borderRadius}px ${content.card.borderRadius}px 0px 0px`
                                }}/> 
                               :
                            <div className="feature-upload-button uphover" 
                                style={{ 
                                    height:`${state.isPhone ? content.element.size/1.5 : content.element.size}px`, 
                                    backgroundColor:`${content.element.backgroundColor}`, 
                                    borderRadius:`${content.card.borderRadius}px ${content.card.borderRadius}px 0px 0px`
                                }}>
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
                                        if(oneFile.size > 3000000){
                                            alert("파일의 크기가 3MB를 초과합니다.")
                                            return;
                                        }
                                       const {currentTarget:{result}} = finishedEvent;
                                       action.setContents(produce(state.contents, draft=>{
                                           draft[state.secNum].elements[index].attachment = result;
                                       }))
                                   }
                                   if(oneFile){
                                       reader.readAsDataURL(oneFile);
                                   }
                               } }
                           />
                       </div> 
                       }
                       {
                           content.text.use && 
                           <div className="df-margin-big feature-title" style={{width:'100%', height:'100%', alignItems:'start', display: 'flex', margin:'0px', padding:`${state.isPhone ? 5 : 8}px`}}>
                                <TextAuto small className="text-input" 
                                    placeholder="여기를 클릭하여 이미지에 대한 설명을 적어보세요."
                                    value={item.text} 
                                    size={0.9}
                                    color = {content.text.color} 
                                    align = {state.isPhone ? content.mobile.align : content.align}
                                    onChange={e => action.setContents(produce(state.contents, draft => {
                                        draft[state.secNum].elements[index].text = e.currentTarget.value;
                                    }))}  
                                />
                           </div>
                       }
                   </FeatureCard>
               }
               </>
           )
       }
    })

    return (
        <motion.div className="template"
        data-aos-easing="ease-in-back"
        data-aos-delay="200"
        data-aos-offset="0" data-aos={content.animation} aos-duration="4000">
            <TitleDesc content={content} titlePlaceholder="제목을 적어보세요." descPlaceholder="여기를 클릭하여 내용을 적어보세요." />

            <div className="features__container" style={{flexWrap : `${state.isPhone ? 'wrap' : ''}`}}>
                {returnElementsCards}
            </div>

        </motion.div>
    )
}

export default GallerySection
