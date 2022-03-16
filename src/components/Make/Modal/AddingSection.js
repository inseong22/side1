import React, {useState, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {base} from '../SectionTypes/baseTypes'
import { MyContext } from '../../../pages/Make/MakePageV2'
import { Close } from '@styled-icons/evaicons-solid';
import {dbService} from '../../../tools/fbase'
import './AddingSection.css'

import hero from '../../../tools/img/addSection/01hero.png'
import detail from '../../../tools/img/addSection/02detail.png'
import cta from '../../../tools/img/addSection/03cta.png'
import apply from '../../../tools/img/addSection/04apply.png'
import appDownload from '../../../tools/img/addSection/05appDownload.png'
import feature from '../../../tools/img/addSection/06feature.png'
import review from '../../../tools/img/addSection/07review.png'
import qna from '../../../tools/img/addSection/08qna.png'
import text from '../../../tools/img/addSection/09text.png'
import gallery from '../../../tools/img/addSection/10gallery.png'
import video from '../../../tools/img/addSection/11video.png'
import mockup from '../../../tools/img/addSection/12mockup.png'

const IMGS = [
    hero, detail, cta, apply, appDownload, feature, review, qna, text, gallery, video, mockup
]

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 800,
  height: 600,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:2,
  p: 2,
  px: 4,
  pb: 3,
};

function AddingSection({setting, open, setOpen, foot}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const addSection = async (typeName) => {
        // 아래는 state.contents에 섹션 하나를 추가하는 것.

        let tempBody;
        
        if(typeName === 'LineSection'){
            tempBody = base[11]
        }else{
            const ee = await dbService.collection('saved-page').where("urlId", '==', '0').get()

            let eee = ee.docs.map(doc => {
                return({...doc.data(), id:doc.id})
            });

            tempBody = eee[0].contents.filter(doc => doc.sectionTypeName === typeName)[0]

            if(typeName === 'CtaSection'){
                tempBody = base[2]
            }
        }

        tempBody['animation'] = setting.animation

        if(tempBody['sectionTypeName'] === 'CtaSection' || tempBody['sectionTypeName'] === 'ApplySection' || tempBody['sectionTypeName'] === 'AppDownloadSection')
            {
                tempBody['backgroundColor'] = setting.color
            }

        let body = JSON.parse(JSON.stringify(tempBody))

        action.setContents([
            ...state.contents.slice(0, state.contents.length),
            body,
        ])
        window.scrollTo({top:(document.body.scrollHeight - 150), left:0, behavior:'smooth'})
        setOpen(false)
        action.setSecNum(state.contents.length)
    }

    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={() => setOpen(!open)}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <div className="modal-top__title">
                        <div className="centera" style={{width:"95%", fontSize:'0.8em', fontWeight:'700'}}>
                            원하는 섹션을 추가하세요
                        </div>
                        <div className="modal-close-button" onClick={() => setOpen(false)}>
                            <Close size="25" />
                        </div>
                    </div>
                    <div className="section-modal__container">
                        {base.map((item,index) => {
                            return(
                                <div className="section-modal__button uphover" key={index} onClick={() => 
                                {addSection(item.sectionTypeName); 
                                    // isScroll(true);
                                }}>
                                    <img src={IMGS[index]} width={90} />
                                    {item.name}
                                </div>
                            )
                        })} 
                    </div>
                    <div className="modal-top__title" style={{marginTop:'25px', flexDirection:'column', justifyContent:'center'}}>
                        <div className="centera" style={{width:"95%", height:'0%', fontSize:'0.8em'}}>
                            추가되었으면 하는 기능이 있으신가요?
                        </div>
                        <div className="section-add__button" onClick={() => { 
                                window.open(
                                    'https://tally.so/r/wMZ4Yn',
                                    '_blank'
                                )
                         }} style={{width:'50%', padding:'5px',marginTop:'20px', fontSize:'0.8em'}} >
                            의견 전달하기
                        </div>
                    </div>
                </Box>
            </StyledModal>
        </div>
    )
}

export default AddingSection
