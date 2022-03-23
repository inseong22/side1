import React, {useContext, useState} from 'react';
import { MyContext } from '../../../../pages/Make/MakePageV2';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import produce from 'immer';
import AddingSection from '../../Modal/AddingSection';
import {sectionIcons} from './ContentsIcons';
import {CustomSwitch2} from '../tools/Custom/OnOffCustom'
import './EditContents.css';
import {DragHandle} from '@styled-icons/material-rounded'
// import PlusIcon from '../../../../tools/img/plusButton.png';

const BCOLOR = 'rgba(230,230,230,0)'

const getItemStyle = (isDragging, draggableStyle, backColor) => {
    return {
        userSelect: "none",
        textAlign: "right",

        // change background color if dragging
        background: isDragging ? "white" : BCOLOR,
        boxShadow: isDragging ? "2px 4px 20px #E8F0F9" : 'none',

        // styles we need to apply on draggables
        ...draggableStyle
    };
};

function EditContents({setting, navi, setNavi, foot, setFoot, elementsRef}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [deleteopen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const handleChange = result => {
        if (!result.destination) return;

        action.setContents(produce(state.contents, draft => {
            const [reorderedItem] = draft.splice(result.source.index, 1);
            draft.splice(result.destination.index, 0, reorderedItem);
        }));
    }

    const optionButton = (num) => {
        return(
            <div className="content__button"
                onClick={() => {
                    action.setSecNum(num)
                }}>
                설정
            </div>
        )
    }

    const deleteSection = (index) => {
        if(index === 0){
            action.setContents([
                ...state.contents.slice(1,state.contents.length)
            ])
        }if(index === state.contents.length){
            action.setContents([
                ...state.contents.slice(0,index-1),
            ])
        }else{
            action.setContents([
                ...state.contents.slice(0,index),
                ...state.contents.slice(index+1, state.contents.length)
            ])
        }
    }

    const pasteThisSection = (content, index) => {
        action.setContents([
            ...state.contents.slice(0,index),
            content,
            ...state.contents.slice(index, state.contents.length)
        ])
    }

    return (
        <div>
            <div className="back__container" />
            <div style={{width:'100%', display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection:'column'}}>
                <div className="one-contents-draggable" style={{backgroundColor:`${BCOLOR}`}}>
                    <div className="center-row hoverback one-contents__inner" style={{padding:'20px 10px'}}>
                        <div className="left">
                            <div className="content__name">
                                내비게이션 바
                            </div>
                            <div style={{paddingLeft:'7%'}}>
                                <CustomSwitch2 value={navi.use} onChange={e => setNavi(produce(navi, draft => {
                                    draft.use = !navi.use
                                })) }/>
                            </div>
                        </div>
                        <div className="right">
                            {optionButton(50)}
                        </div>
                    </div>   
                </div>
                <div className="comment">
                <span style={{fontWeight:'700', fontSize:'1em'}}>드래그 앤 드랍</span>으로 순서를 변경할 수 있습니다
                </div>
                <DragDropContext onDragEnd={handleChange}>
                    <Droppable droppableId="sectionsss">
                        {(provided) => 
                            (
                                <>
                            <div {...provided.droppableProps} ref={provided.innerRef} style={{width:'100%', display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection:'column'}}>
                                {state.contents.map((item, index) => {
                                    return(
                                        <Draggable draggableId={String(index)} key={index} index={index} style={{width:'100%'}}>
                                            {(provided, snapshot) => {
                                                if(index === 0){
                                                        return(
                                                            <>
                                                            <div style={{marginTop: '30px'}}></div>
                                                            {/* <img className="fixed-icon" src={PlusIcon} alt="아이콘"/> */}
                                                                <div
                                                                    className="one-contents-draggable"
                                                                    ref={provided.innerRef}
                                                                    {...provided.dragHandleProps}
                                                                    {...provided.draggableProps}
                                                                    onClick={() => {window.scrollTo({top:(elementsRef.current[index].current.offsetTop - window.innerHeight/5), left:0, behavior:'smooth'})}}
                                                                    style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style,
                                                                    )}>
                                                                        <div className="center-column hoverback one-contents__inner">
                                                                            <div className="center-row">
                                                                                <div className="left">
                                                                                    {
                                                                                        sectionIcons.filter(doc => doc.sectionTypeName === item.sectionTypeName)[0].icon
                                                                                    }
                                                                                    <div className="content__name">
                                                                                        {item.name}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="right">
                                                                                    {optionButton(index)}
                                                                                </div>
                                                                            </div>
                                                                            <div className="center-row">
                                                                                <div className="left" style={{width:'85%', textAlign:'left', color:'#555C67', display:'block', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                                                                    {item.title.text}
                                                                                </div>
                                                                                <div className="right">
                                                                                    <div className="content__button cb-delete"
                                                                                        onClick={() => {
                                                                                            const yes = window.confirm("정말 삭제하시겠습니까?");
                                                                                            if(yes){
                                                                                                deleteSection(index);
                                                                                            }
                                                                                        } }>
                                                                                        삭제
                                                                                    </div>
                                                                                    <div className="content__button cb-duplicate"
                                                                                        onClick={() => pasteThisSection(state.contents[index], index) }>
                                                                                        복제
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>   
                                                                </div>
                                                                {/* <div className="centera small-button__container">
                                                                    <span className="centera make-section-button__small">
                                                                        +
                                                                    </span>
                                                                </div> */}
                                                            </>
                                                        )}
                                                        else{
                                                            return(
                                                            <>
                                                            <div
                                                                className="one-contents-draggable"
                                                                ref={provided.innerRef}
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}
                                                                onClick={() => {window.scrollTo({top:(elementsRef.current[index] && elementsRef.current[index].current.offsetTop - window.innerHeight/5), left:0, behavior:'smooth'})}}
                                                                style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style,
                                                                )}>
                                                                    <div className="center-column hoverback one-contents__inner">
                                                                        <div className="center-row">
                                                                            <div className="left">
                                                                                {
                                                                                    sectionIcons.filter(doc => doc.sectionTypeName === item.sectionTypeName)[0].icon
                                                                                }
                                                                                <div className="content__name">
                                                                                    {item.name}
                                                                                </div>
                                                                            </div>
                                                                            <div className="right">
                                                                                {optionButton(index)}
                                                                            </div>
                                                                        </div>
                                                                        <div className="center-row">
                                                                            <div className="left" style={{width:'85%', textAlign:'left', color:'#555C67', display:'block', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                                                                {item.title.text}
                                                                            </div>
                                                                            <div className="right">
                                                                                <div className="content__button cb-delete"
                                                                                    onClick={() => {
                                                                                        const yes = window.confirm("정말 삭제하시겠습니까?");
                                                                                        if(yes){
                                                                                            deleteSection(index);
                                                                                        }
                                                                                    } }>
                                                                                    삭제
                                                                                </div>
                                                                                <div className="content__button cb-duplicate"
                                                                                    onClick={() => pasteThisSection(state.contents[index], index) }>
                                                                                    복제
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>   
                                                                </div>
                                                            </>
                                                        ) }}}
                                                </Draggable>
                                            )
                                        })}
                                {provided.placeholder}
                            </div>
                            </>
                            )
                        }
                    </Droppable>
                </DragDropContext>
                <div className="center-row">
                    <div className="section-add__button" onClick={() => { setAddOpen(true); }}
                        style={{margin:'15px'}} >
                        + 섹션 추가하기
                    </div>
                </div>
                <div className="one-contents-draggable">
                    <div className="center-row hoverback one-contents__inner" style={{padding:'20px 10px'}}>
                        <div className="left">
                            <div className="content__name">
                                푸터 바
                            </div>
                            <div style={{paddingLeft:'7%'}}>
                                <CustomSwitch2 value={foot.use} onChange={e => setFoot(produce(foot, draft => {
                                    draft.use = !foot.use
                                })) }/>
                            </div>
                        </div>
                        <div className="right">
                            {optionButton(51)}
                        </div>
                    </div>   
                </div>
            </div>
            <AddingSection setting={setting} open={addOpen} setOpen={setAddOpen} foot={foot}/>
        </div>
    )
}

export default EditContents
