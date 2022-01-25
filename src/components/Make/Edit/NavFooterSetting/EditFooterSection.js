import React, {useState} from 'react'
import EditTopBar from '../tools/EditTopBar'
import Checkbox from '@mui/material/Checkbox';
import RadioCustom from '../tools/RadioCustom'
import EditButtonTable from '../tools/EditButtonTable'
import EditColor from '../tools/ColorCustom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import { AlignCenter, AlignEnd, AlignStart } from '@styled-icons/bootstrap';

const animatedComponents = makeAnimated();

const iconsList = [
    { value: 'facebook', label: `페이스북` , link:''},
    { value: 'instagram', label: "🗿 인스타그램" , link:''},
    { value: 'website', label: "💽 웹사이트" , link:''},
    { value: 'mail', label: "🏟 메일", link:''},
    { value: 'youtube', label: "👟 유튜브", link:''},
    { value: 'twitter', label: "🗽 트위터" , link:''},
    { value: 'appstore', label: "🦁 카카오톡" , link:''},
    { value: 'playstore', label: "플레이스토어" , link:''},
    { value: 'notion', label: "노션" , link:''},
    { value: 'naver', label: "네이버" , link:''},
]

const oneOrTwoOptions = [
    { label: '1단', value: 'one' },
    { label: '2단', value: 'two' },
]

const iconColorOptions = [
    { label: '흰색', value: 'white' },
    { label: '검은색', value: 'black' },
]
const paddingOptions = [
    { label: '좁게', value: 1 },
    { label: '보통', value: 3 },
    { label: '넓게', value: 5 },
]
const alignOptions = [
    { label: <AlignStart width={30} />, value: 'start' },
    { label: <AlignCenter width={30} />, value: 'center' },
    { label: <AlignEnd width={30} />, value: 'end' },
]

function EditFooterSection({foot, setFoot}) {
    const [category, setCategory] = useState(0);

    const changeFooterTemplate = num => {
        let newNavi = JSON.parse(JSON.stringify(foot))
        newNavi.sectionTemplateNumber = num
        setFoot(newNavi);
    }

    const returnIconLinkSetting = foot.icons.map((item, index) => {
        return(
            <div className="edit-element">
                <div className="edit-element__one">
                    <div className="edit-element__left">{item.label}</div>
                    <div className="edit-element__right">
                        <input type="text" value={foot.icons.filter(doc => doc.value === item.value)[0].link} 
                        onChange={e => setFoot({...foot, icons:[...foot.icons.map((it, index) => it.value === item.value ? {...it, link:e.currentTarget.value} : it )]}) } />
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <EditTopBar category={category} setCategory={setCategory} />
            { category === 0 ? 
            <>
                <div>
                    <div className="edit-element">
                        <div className="edit-element__one">
                            푸터 수정
                        </div>
                    </div>
                    <div className="edit-element">
                        <div className="edit-element__one">
                            <div className="edit-element__left">배경 색상</div>
                            <div className="edit-element__right">
                                <RadioCustom 
                                    options={iconColorOptions}
                                    onChange={(e) => setFoot({...foot, backgroundColor:e})}
                                    value={foot.backgroundColor}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="edit-element no-border">
                        <div className="edit-element__one">
                            <div className="edit-element__left">아이콘 사용</div>
                            <div className="edit-element__right">
                                <Checkbox
                                    checked={foot.iconUse}
                                    value={foot.iconUse}
                                    onChange={() => setFoot({...foot, iconUse:!foot.iconUse})}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        foot.iconUse && 
                        <>
                            <div className="edit-element">
                                <div className="edit-element__one">
                                    <div className="edit-element__left">아이콘 색상</div>
                                    <div className="edit-element__right">
                                        <RadioCustom 
                                            options={iconColorOptions}
                                            onChange={(e) => setFoot({...foot, iconColor:e})}
                                            value={foot.iconColor}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="edit-element">
                                <div className="edit-element__one">
                                    <div className="edit-element__left">아이콘 정렬</div>
                                    <div className="edit-element__right">
                                        <RadioCustom 
                                            options={alignOptions}
                                            onChange={(e) => setFoot({...foot, iconAlign:e})}
                                            value={foot.iconAlign}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="edit-element">
                                <div className="edit-element__one" style={{height:'500px'}}>
                                    <div className="edit-element__left">추가할 아이콘</div>
                                    <div className="edit-element__right">
                                        {/* <Select options={iconsList} onChange={e => {console.log(e.label)}} style={{color:'black'}}/> */}
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={iconsList}
                                            onChange={e => {setFoot({...foot, icons:e})}}
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                returnIconLinkSetting
                            }
                        </>
                    }
                </div>
            </>
            : 
            <>
            <div className="templates__inner-container">
                <span className="templates-radio" onClick={() => changeFooterTemplate(1)}>
                    템플릿 1
                </span>
                <span className="templates-radio" onClick={() => changeFooterTemplate(2)}>
                    템플릿 2
                </span>
            </div>
            </>
            }
        </div>
    )
}

export default EditFooterSection
