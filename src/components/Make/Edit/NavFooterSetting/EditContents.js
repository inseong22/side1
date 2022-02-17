import React, {useContext, useState} from 'react';
import { MyContext } from '../../../../pages/Make/MakePageV2';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import produce from 'immer';
import ConfirmCustom from '../../../../tools/ConfirmCustom';
import AddingSection from '../../Modal/AddingSection';
import {CustomSwitch2} from '../tools/Custom/OnOffCustom'
import './EditContents.css';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import {DragIndicator} from '@styled-icons/material-outlined'
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

function EditContents({navi, setNavi, foot, setFoot}) {
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
                드래그 앤 드랍으로 순서를 바꿀 수 있습니다
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

                                                                    style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style,
                                                                    )}>
                                                                        <div className="center-column hoverback one-contents__inner">
                                                                            {/* <div className="centera" style={{width:'5%'}}>
                                                                                <DragIndicator size="30" />
                                                                            </div> */}
                                                                                <div className="center-row">
                                                                                    <div className="left">
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

                                                                    style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style,
                                                                    )}>
                                                                        <div className="center-column hoverback one-contents__inner">
                                                                            <div className="center-row">
                                                                                <div className="left">
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
                    <div className="content__button" onClick={() => {
                        setAddOpen(true);
                        // action.setAddingSectionAt(state.contents.length - 1);
                    }}
                    style={{margin:'15px', borderRadius:'3px'}} >
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
            <AddingSection open={addOpen} setOpen={setAddOpen} />
        </div>
    )
}

export default EditContents
