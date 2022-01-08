import React, {useState} from 'react'
import EditTopBar from '../tools/EditTopBar'
import Checkbox from '@mui/material/Checkbox';
import RadioCustom from '../tools/RadioCustom'
import EditButtonTable from '../tools/EditButtonTable'
import EditColor from '../tools/EditColor'
import { Radio } from 'antd';

const logoOptions = [
    { label: '로고 이미지', value: 'logo' },
    { label: '텍스트', value: 'text' },
]
const buttonOptions = [
    { label: '링크', value: 'link' },
    { label: '스크롤', value: 'scroll' },
    { label: '팝업', value: 'popup' },
]

function EditNaviSection({navi, setNavi}) {
    const [category, setCategory] = useState(0);
    const [logo, setLogo] = useState("logo")
    const [buttonUse, setButtonUse] = useState(true)
    const [buttonFunc, setButtonFunc] = useState("link")
    const [buttonTemplate, setButtonTemplate] = useState(1)

    const changeNaviTemplate = num => {
        let newNavi = JSON.parse(JSON.stringify(navi))
        newNavi.sectionTemplateNumber = num
        setNavi(newNavi);
    }

    const returnFuncEdit = () => {
        switch(buttonFunc){
            case "link":
                return(
                    <div className="edit-element">
                        링크 수정
                    </div>
                )
            case "scroll":
                return(
                    <div className="edit-element">
                        스크롤 수정
                    </div>
                )
            case "popup":
                return(
                    <div className="edit-element">
                        팝업 수정
                    </div>
                )
        }
    }

    const returnButtonTemplates = () => {

    }

    return (
        <div>
            <EditTopBar category={category} setCategory={setCategory} />
            { category === 0 ? 
            <>
                <div>
                    <div className="edit-element">
                        네비게이션 수정
                    </div>
                    <div className="edit-element">
                        <div className="edit-element__left">배경색</div>
                        <div className="edit-element__right">
                            <EditColor onChange={(e) => setNavi({...navi, backgroundColor:e.currentTarget.value})} />
                        </div>
                    </div>
                    <div className="edit-element">
                        <div className="edit-element__one">
                            <div className="edit-element__left">상단에 고정</div>
                            <div className="edit-element__right">
                                <Checkbox
                                    checked={false}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </div>
                        <div className="edit-element__more">
                            <div className="edit-element__left">아래선 적용</div>
                            <div className="edit-element__right">
                                <Checkbox
                                    value={navi.bottomBorder}
                                    onChange={e => setNavi({...navi, bottomBorder:!navi.bottomBorder})}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="edit-element">
                        <div className="edit-element__left">메인 로고</div>
                        <div className="edit-element__right">
                            <RadioCustom 
                                options={logoOptions}
                                onChange={setLogo}
                                value={logo}
                            />
                        </div>
                    </div>
                    <div className="edit-element">
                        <div className="edit-element__left">버튼 사용</div>
                        <div className="edit-element__right">
                            <Checkbox
                                value={navi.button.use}
                                onChange={() => setNavi({...navi, button:{...navi.button, use:!navi.button.use}})}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                    </div>
                    { navi.button.use && <>
                        <div className="edit-element" style={{border:'none'}}>
                            <div className="edit-element__left">버튼 기능</div>
                            <div className="edit-element__right">
                                <RadioCustom 
                                    options={buttonOptions}
                                    onChange={setButtonFunc}
                                    value={buttonFunc}
                                />
                            </div>
                        </div>
                        {returnFuncEdit()}
                        <div className="edit-element">
                            <div className="edit-element__left">버튼 색</div>
                            <div className="edit-element__right">
                                <input type="color" />
                            </div>
                        </div>
                        <EditButtonTable value={buttonTemplate} onChange={setButtonTemplate} />
                    </> }
                </div>
            </>
            : 
            <>
            <div className="templates__inner-container">
                <span className="templates-radio" onClick={() => changeNaviTemplate(1)}>
                    템플릿 1
                </span>
                <span className="templates-radio" onClick={() => changeNaviTemplate(2)}>
                    템플릿 2
                </span>
                <span className="templates-radio" onClick={() => changeNaviTemplate(3)}>
                    템플릿 3
                </span>
            </div>
            </>
            }
        </div>
    )
}

export default EditNaviSection
