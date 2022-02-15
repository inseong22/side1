import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import {Upload} from '@styled-icons/bootstrap';
import Element from './components/Element'

function GallerySection({content,setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const heightRef = useRef(null)

    const returnElementsCards = content.elements.map((item, index) => {
       if(index < content.numOfElements){
           return(
               <>
               {content.card.use && 
               <div key={index} className="feature__card" style={{alignItems: 'center', boxShadow:`${content.card.shadow ? '2px 2px 4px rgba(0,0,0,0.4)' : ''}`, margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.elements.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`, backgroundColor: `${content.card.color}`, padding:'8px 5px'}}>
                       {content.element.use && 
                       <div style={{width:`${content.element.size}px`, position:'relative', cursor:'pointer'}}>
                           { item.attachment ? 
                               <img src={item.attachment} style={{width:`${content.element.size}px`, borderRadius:`${content.element.borderRadius}px`}}/> 
                               :
                               <div className="feature-upload-button" style={{borderRadius:`${content.element.borderRadius}px`, backgroundColor:`${content.element.backgroundColor}`}}>
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
                           <div className="df-margin-big feature-title" style={{width:'100%'}}>
                                   <TextAuto small className="text-input" value={item.text} color = {content.text.color} align = {content.text.align}
                                       onChange={e => action.setContents(produce(state.contents, draft => {
                                           draft[state.secNum].elements[index].text = e.currentTarget.value;
                                       }))}  
                                   />
                           </div>
                       }
                   </div>
               }
               </>
           )
       }
    })

    return (
        <motion.div className="template"
            data-aos={setting.animation} aos-duration="2000">

            <TitleDesc content={content} />

            <div className="features__container" ref={heightRef} >
                {returnElementsCards}
            </div>

        </motion.div>
    )
}

export default GallerySection
