import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import ElementsTable from './tools/ElementsTable'
import produce from 'immer';
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import ColorCustom from '../tools/Custom/ColorCustom'

function EditLineSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const elements = [
        {
            title: '구분선',
            use:content.line.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].line.use = !content.line.use;
            }))
        },
    ]

    const Lines = () => {
        return(
            <div className="center-column">
                <div className="opacity-hover hr__container" onClick={() => {
                    action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].line.type = 0;
                    }))
                }}>
                    <hr className="hr_style1" style={{borderTop:`1px solid ${content.line.color}`}} />
                </div>
                <div className="opacity-hover hr__container" onClick={() => {
                    action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].line.type = 1;
                    }))
                }}>
                    <hr className="hr_style2" style={{borderTop:`1px solid ${content.line.color}`}} />
                </div>
                <div className="opacity-hover hr__container" onClick={() => {
                    action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].line.type = 2;
                    }))
                }}>
                    <hr className="hr_style3"/>
                    <hr className="hr_style3"/>
                </div>
                <div className="opacity-hover hr__container" onClick={() => {
                    action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].line.type = 3;
                    }))
                }}>
                    <hr className="hr_style4" style={{borderTop:`1px solid ${content.line.color}`}} />
                </div>
                <div className="opacity-hover hr__container" onClick={() => {
                    action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].line.type = 4;
                    }))
                }}>
                    <hr className="hr_style5" style={{borderTop:`1px solid ${content.line.color}`}} />
                </div>
            </div>
        )
    }
    
    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <>
                    <ElementsTable elements={elements} />
                    <OpenCloseCustom title="선" use={content.line.use} open={state.focus === 'line'}>
                        <ColorCustom text="색상" value={content.line.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].line.color = e;
                            }))} />
                        <Lines />
                    </OpenCloseCustom>
                    </>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <>
                        <EditDesign content={content} />
                    </>
                )

            default:
                <></>
        }
    }

    return(
        <>
            {returnTable()}
        </>
    )
}

export default EditLineSection
