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
import Layout from '../EditTemplates/tools/Layout'

import { AlignCenter, AlignEnd, AlignStart } from '@styled-icons/bootstrap';

const alignOptions = [
    { label: '왼쪽', value: 'start' },
    { label: '중앙', value: 'center' },
]

const sizeOptions = [
    { label: 'Small', value: 10 },
    { label: 'Medium', value: 15 },
    { label: 'Large', value: 20 },   
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

// const alignOptions = [
//     { label: <AlignStart width={30} />, value: 'start' },
//     { label: <AlignCenter width={30} />, value: 'center' },
//     { label: <AlignEnd width={30} />, value: 'end' },
// ]

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
                <ElementsTable elements={elements} />
                    <Layout foot={foot} setFoot={setFoot} version='footer'/>
                    {/* <RadioCustom value={foot.layout} options={layoutOptions} func={e => {setFoot(produce(foot, draft => {
                        draft.layout = e;
                    }))}} /> */}
                    <OpenCloseCustom title="회사 / 팀 정보" use={foot.text.use}>
                        <ColorCustom text="색상" value={foot.text.color} func={e => setFoot(produce(foot, draft => {
                            draft.text.color = e;
                        }))} />
                        <RadioCustom text="정렬" options={alignOptions} value={foot.text.align} func={e => setFoot(produce(foot, draft => {
                            draft.text.align = e;
                        }))} />
                        <TextSizeCustom text="크기" options={sizeOptions} value={foot.text.size} func={e => setFoot(produce(foot, draft => {
                            draft.text.size = e;
                        }))} />
                    </OpenCloseCustom>
                    <OpenCloseCustom title="소셜 아이콘" use={foot.icon.use}>
                        <ColorCustom text="색상" value={foot.icon.color} func={e => {setFoot(produce(foot, draft => {
                            draft.icon.color = e;
                        }))}} />
                        <InputCustom text='페이스북' value={foot.icon.facebook} func={e=>{setFoot(produce(foot, draft => {
                            draft.icon.facebook = e;
                        }))}} placeholder='링크를 입력해 주세요.'/>
                       <InputCustom text='인스타그램' value={foot.icon.instagram} func={e=>{setFoot(produce(foot, draft => {
                            draft.icon.instagram = e;
                        }))}} placeholder='링크를 입력해 주세요.'/>
                        <InputCustom text='트위터' value={foot.icon.twitter} func={e=>{setFoot(produce(foot, draft => {
                            draft.icon.twitter = e;
                        }))}} placeholder='링크를 입력해 주세요.'/>
                        <InputCustom text='카카오톡' value={foot.icon.kakaotalk} func={e=>{setFoot(produce(foot, draft => {
                            draft.icon.kakaotalk = e;
                        }))}} placeholder='링크를 입력해 주세요.'/>
                        <InputCustom text='유튜브' value={foot.icon.youtube} func={e=>{setFoot(produce(foot, draft => {
                            draft.icon.youtube = e;
                        }))}} placeholder='링크를 입력해 주세요.'/>
                        <InputCustom text='노션' value={foot.icon.notion} func={e=>{setFoot(produce(foot, draft => {
                            draft.icon.notion = e;
                        }))}} placeholder='링크를 입력해 주세요.'/>
                        <InputCustom text='링크드인' value={foot.icon.linkedIn} func={e=>{setFoot(produce(foot, draft => {
                            draft.icon.linkedIn = e;
                        }))}} placeholder='링크를 입력해 주세요.'/>
                    </OpenCloseCustom>
                    <OpenCloseCustom title="저작권 표시" use={foot.copyright.use}>
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
                </div>
            </>
            : 
            <div>
                <OpenCloseCustom title="배경" use={true}>
                    <ColorCustom text="색상" value={foot.backgroundColor} func={e => {setFoot(produce(foot, draft => {
                        draft.backgroundColor = e;
                    }))}} />
                </OpenCloseCustom>
                <OpenCloseCustom title="여백" use={true}>
                    <SliderCustom top="상단 여백" max={100} value={foot.paddingTop} func={e => {setFoot(produce(foot, draft => {
                        draft.paddingTop = e;
                    }))}} />
                    <SliderCustom top="상단 여백" max={100} value={foot.paddingBottom} func={e => {setFoot(produce(foot, draft => {
                        draft.paddingBottom = e;
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