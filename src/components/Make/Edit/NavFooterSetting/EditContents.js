import React, {useContext, useState} from 'react';
import { MyContext } from '../../../../pages/Make/MakePageV2';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import produce from 'immer';
import ConfirmCustom from '../../../../tools/ConfirmCustom';
import AddingSection from '../../Modal/AddingSection';
import './EditContents.css';

const BCOLOR = 'rgba(230,230,230,0.8)'

const getItemStyle = (isDragging, draggableStyle, backColor) => {
    return {
        userSelect: "none",
        textAlign: "right",

        // change background color if dragging
        background: isDragging ? "white" : BCOLOR,
        boxShadow: isDragging ? "2px 2px 3px rgba(0,0,0,0.2)" : 'none',

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
        console.log("index", index);
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
            <div className="edit-element">
                컨텐츠 수정
            </div>
            <div>
                <div className="one-contents-draggable" style={{backgroundColor:`${BCOLOR}`}}>
                    <div className="center-row hoverback one-contents__inner">
                        <div className="left">
                            <div className="content__name">
                                네비 바
                            </div>
                            <div>
                                <input type="checkbox" checked={navi.use} value={navi.use} onChange={e => setNavi(produce(navi, draft => {
                                    draft.use = !navi.use
                                })) } />
                            </div>
                        </div>
                        <div className="right">
                            {optionButton(50)}
                        </div>
                    </div>   
                </div>
                <hr className="hr" />
                <DragDropContext onDragEnd={handleChange}>
                    <Droppable droppableId="sectionsss">
                        {(provided) => 
                            (
                            <div className="sectionsss"
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                {state.contents.map((item, index) => {
                                    return(
                                        <Draggable draggableId={String(index)} key={index} index={index} style={{width:'100%'}}>
                                            {(provided, snapshot) => {
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
                                                                <div className="center-row hoverback one-contents__inner">
                                                                    <div className="left">
                                                                        <div className="content__name">
                                                                            {item.sectionTypeName}
                                                                        </div>
                                                                    </div>
                                                                    <div className="right">
                                                                        {optionButton(index)}
                                                                        <div className="content__button delete"
                                                                            onClick={() => {
                                                                                const yes = window.confirm("정말 삭제하시겠습니까?");
                                                                                if(yes){
                                                                                    deleteSection(index);
                                                                                }
                                                                            } }>
                                                                            삭제
                                                                        </div>
                                                                        <div className="content__button"
                                                                            onClick={() => pasteThisSection(state.contents[index], index) }>
                                                                            복제
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
                                                )}}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
                <div className="center-row">
                    <div className="make-section-button" onClick={() => {
                        setAddOpen(true);
                        // action.setAddingSectionAt(state.contents.length - 1);
                    }}>
                        + 섹션 추가하기
                    </div>
                </div>
                <hr className="hr" />
                <div className="one-contents-draggable" style={{backgroundColor:`${BCOLOR}`}}>
                    <div className="center-row hoverback one-contents__inner">
                        <div className="left">
                            <div className="content__name">
                                푸터 바
                            </div>
                            <div>
                                <input type="checkbox" checked={foot.use} value={foot.use} onChange={e => setFoot(produce(foot, draft => {
                                    draft.use = !foot.use
                                })) } />
                            </div>
                        </div>
                        <div className="right">
                            {optionButton(51)}
                        </div>
                    </div>   
                </div>

                {/* <span className="make-section-button" style={{display:`${isHover}`}} onClick={() => {
                    if(state.addingSectionAt === index){
                        action.setAddingSectionAt(1000);
                    }else{
                        action.setAddingSectionAt(index)
                    }
                }}>
                {parseInt(state.addingSectionAt) === parseInt(index) ? <>- 섹션 제거하기</> : <>+ 섹션 추가하기</>}
                </span> */}
            </div>
            <AddingSection open={addOpen} setOpen={setAddOpen} />
        </div>
    )
}

export default EditContents
