import React, {useState} from 'react'
import RadioCustom from '../tools/Custom/RadioCustom'
import ColorCustom from '../tools/Custom/ColorCustom'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import OnOffCustom from '../tools/Custom/OnOffCustom'
import InputCustom from '../tools/Custom/InputCustom'
import ResponsiveCustom from '../tools/Custom/ResponsiveCustom'
import CheckBoxContainer from '../tools/Custom/CheckBoxCustom'
import ElementsTable from '../EditTemplates/tools/ElementsTable'
import SliderCustom from '../tools/Custom/SliderCustom'
import TextSizeCustom from '../tools/func/TextSizeCustom'
import BoxCustom from '../tools/Custom/BoxCustom'
import produce from 'immer';

import { AlignCenter, AlignEnd, AlignStart } from '@styled-icons/bootstrap';

const iconsList = [
    { value: 'facebook', label: `페이스북` , link:''},
    { value: 'instagram', label: "인스타그램" , link:''},
    { value: 'website', label: "웹사이트" , link:''},
    { value: 'mail', label: "메일", link:''},
    { value: 'youtube', label: "유튜브", link:''},
    { value: 'twitter', label: "트위터" , link:''},
    { value: 'appstore', label: "카카오톡" , link:''},
    { value: 'playstore', label: "플레이스토어" , link:''},
    { value: 'notion', label: "노션" , link:''},
    { value: 'naver', label: "네이버" , link:''},
]

const layoutOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
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

function EditFooterSection({foot, setFoot, category}) {

    const elements = [
        {
            title:'회사 / 팀 정보',
            use:foot.text.use,
            func:() => setFoot(produce(foot, draft => {
                draft.text.use = !foot.text.use;
            }))
        },
        {
            title:'소셜 아이콘',
            use:foot.icon.use,
            func:() => setFoot(produce(foot, draft => {
                draft.icon.use = !foot.icon.use;
            }))
        },
        {
            title:'저작권 표시',
            use:foot.copyright.use,
            func:() => setFoot(produce(foot, draft => {
                draft.copyright.use = !foot.copyright.use;
            }))
        },
    ]

    // const returnIconLinkSetting = foot.icon.icons.map((item, index) => {
    //     return(
    //         <div className="edit-element">
    //             <div className="edit-element__one">
    //                 <div className="edit-element__left">{item.label}</div>
    //                 <div className="edit-element__right">
    //                     <input type="text" value={foot.icons.filter(doc => doc.value === item.value)[0].link} 
    //                         onChange={e => setFoot({...foot, icons:[...foot.icons.map((it, index) => it.value === item.value ? {...it, link:e.currentTarget.value} : it )]}) } />
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })

    return (
        <div>
            { category === 0 ? 
            <>
                <div>
                    <OpenCloseCustom title="레이아웃">
                        <RadioCustom value={foot.layout} options={layoutOptions} func={e => {setFoot(produce(foot, draft => {
                            draft.layout = e;
                        }))}} />
                    </OpenCloseCustom>
                    <OpenCloseCustom title="회사 / 팀 정보">
                    </OpenCloseCustom>
                    <OpenCloseCustom title="저작권표시">
                        <OnOffCustom text="저작권표시" value={foot.copyright.use} func={e => setFoot(produce(foot, draft => {
                            draft.copyright.use = !foot.copyright.use;
                        }))} />
                        <div className="center-column">
                            <div className="edit-element center-row" style={{fontSize:'13px', justifyContent:'start'}}>
                                <div>
                                    2022 Copyright ©
                                </div>
                                <div style={{width:'180px'}}>
                                    <InputCustom value={foot.copyright.text} placeholder="surfee" func={(e) => setFoot(produce(foot, draft => {
                                        draft.copyright.text = e;
                                    }))}/>
                                </div>
                                {/* <div>
                                    , All rights reserved
                                </div> */}
                            </div>
                        </div>
                    </OpenCloseCustom>
                    <OpenCloseCustom title="소셜 아이콘">
                        <OnOffCustom text="소셜 아이콘" value={foot.icon.use} func={e => setFoot(produce(foot, draft => {
                            draft.icon.use = !foot.icon.use;
                        }))} />
                        <ColorCustom text="색상" value={foot.icon.color} func={e => {setFoot(produce(foot, draft => {
                            draft.icon.color = e;
                        }))}} />
                        {
                            iconsList.map((item, index) => {
                                return(
                                    <InputCustom text={item.label} value={"w"} func={e => {}} placeholder="링크를 입력해주세요." />
                                )
                            })
                        }
                    </OpenCloseCustom>
                </div>
            </>
            : 
            <div>
                <OpenCloseCustom title="배경">
                    <ColorCustom text="색상" value={foot.backgroundColor} func={e => {setFoot(produce(foot, draft => {
                        draft.backgroundColor = e;
                    }))}} />
                </OpenCloseCustom>
                <OpenCloseCustom title="여백">
                    <SliderCustom text="상단여백" value={foot.padding} func={e => {setFoot(produce(foot, draft => {
                        draft.padding = e;
                    }))}} />
                </OpenCloseCustom>
            </div>
            }
        </div>
    )
}

export default EditFooterSection

// {
//     foot.iconUse && 
//     <>
//         <div className="edit-element">
//             <div className="edit-element__one">
//                 <div className="edit-element__left">아이콘 색상</div>
//                 <div className="edit-element__right">
//                     <RadioCustom 
//                         options={iconColorOptions}
//                         onChange={(e) => setFoot({...foot, iconColor:e})}
//                         value={foot.iconColor}
//                     />
//                 </div>
//             </div>
//         </div>
//         <div className="edit-element">
//             <div className="edit-element__one">
//                 <div className="edit-element__left">아이콘 정렬</div>
//                 <div className="edit-element__right">
//                     <RadioCustom 
//                         options={alignOptions}
//                         onChange={(e) => setFoot({...foot, iconAlign:e})}
//                         value={foot.iconAlign}
//                     />
//                 </div>
//             </div>
//         </div>
//         <div className="edit-element">
//             <div className="edit-element__one" style={{height:'500px'}}>
//                 <div className="edit-element__left">추가할 아이콘</div>
//                 <div className="edit-element__right">
//                     {/* <Select options={iconsList} onChange={e => {console.log(e.label)}} style={{color:'black'}}/> */}
//                     <Select
//                         closeMenuOnSelect={false}
//                         components={animatedComponents}
//                         isMulti
//                         options={iconsList}
//                         onChange={e => {setFoot({...foot, icons:e})}}
//                     />
//                 </div>
//             </div>
//         </div>
//         {
//             returnIconLinkSetting
//         }
//     </>
// }