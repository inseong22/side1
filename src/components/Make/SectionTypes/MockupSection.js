import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import Phone from '../../../tools/img/mockup/mobile.png'
import Desktop from '../../../tools/img/mockup/desktop.png'
import ourA from '../../../tools/img/005.png'

function MockupSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef=useRef(null)
    const [imageShow, setImageShow] = useState(null);
    const returnMockup = () => {
        // 목업 - 모바일
        if(content.mobile.use)
            return(
                <div className="mobile-container">
                    <img className="mobile-ex" src={Phone} alt="목업틀"
                        style={{width: `${content.mobile.size}px`}}
                    />
                    {content.mobile.file === '' ?  
                        <></>
                        : 
                        <img 
                        className="upload-mobile" 
                        ref={imgRef} 
                        src={`${content.mobile.file}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        style={{ width:`${content.mobile.size}px`}}
                        />
                    }
                </div>
            )
        // 목업 - 태블릿
        if(content.tablet.use)
            return(
                <div className="mobile-container">
                   tablet
                </div>
            )
        // 목업 - 데스크탑
        if(content.desktop.use)
            return(
                <div className="desk-container">
                    <img className="mobile-ex" src={Desktop} alt="목업틀"
                        style={{width: `${content.desktop.size}px`}}
                    />
                    {content.desktop.file === '' ?  
                        <></>
                        : 
                        <img 
                        className="upload-desk" 
                        ref={imgRef} 
                        src={`${content.desktop.file}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        // style={{ width:`${content.desktop.size}px`}}
                        />
                    }
                </div>
            )
        // 목업 - 모바일 2개
        if(content.mobile2.use)
        return(
            <>
            <div className="desk-container">
                    <img className="mobile-ex" src={Phone} alt="목업틀"
                        style={{width: `${content.mobile2.size}px`}}
                    />
                    {content.mobile2.file1 === '' ?  
                        <></>
                        : 
                        <img 
                        className="upload-mobile" 
                        ref={imgRef} 
                        src={`${content.mobile2.file1}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        style={{ width:`${content.mobile2.size}px`}}
                        />
                    }
            </div>
            <div className="desk-container">
                    <img className="mobile-ex" src={Phone} alt="목업틀"
                        style={{width: `${content.mobile2.size}px`}}
                    />
                    {content.mobile2.file2 === '' ?  
                        <></>
                        : 
                        <img 
                        className="upload-mobile" 
                        ref={imgRef} 
                        src={`${content.mobile2.file2}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        style={{ width:`${content.mobile2.size}px`}}
                        />
                    }
            </div>
            </>
        )
        // 목업 - desk + mobile
        if(content.deskMobile.use)
        return(
            <>
            <div className="mobile-container">
                    <img className="mobile-ex" src={Phone} alt="목업틀"
                        style={{width: `${content.deskMobile.size1}px`}}
                    />
                    {content.deskMobile.file1 === '' ?  
                        <></>
                        : 
                        <img 
                        className="upload-mobile" 
                        ref={imgRef} 
                        src={`${content.deskMobile.file1}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        style={{ width:`${content.deskMobile.size1}px`}}
                        />
                    }
            </div>
            <div className="desk-container">
                    <img className="mobile-ex" src={Desktop} alt="목업틀"
                        style={{width: `${content.deskMobile.size2}px`}}
                    />
                    {content.deskMobile.file2 === '' ?  
                        <></>
                        : 
                        <img 
                        className="upload-desk" 
                        ref={imgRef} 
                        src={`${content.deskMobile.file2}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        />
                    }
            </div>
            </>
        )
    }
    return (
        <motion.div className="template"
            data-aos={setting.animation} aos-duration="2000">

            <TitleDesc content={content} />
            <div className="image__container" style={{marginTop: '30px'}}>
             {returnMockup()}
            </div>
        </motion.div>
    )
}

export default MockupSection
