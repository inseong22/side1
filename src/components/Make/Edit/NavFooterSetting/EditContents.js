import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import produce from 'immer';
import './EditContents.css'

const grid = 6;
const getItemStyle = (isDragging, draggableStyle, backColor) => {
    return {
        userSelect: "none",
        textAlign: "right",

        // change background color if dragging
        background: isDragging ? "lightgreen" : 'rgba(200,200,200,0.6)',

        // styles we need to apply on draggables
        ...draggableStyle
    };
};

function EditContents() {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const handleChange = result => {
        if (!result.destination) return;

        action.setContents(produce(state.contents, draft => {
            const [reorderedItem] = draft.splice(result.source.index, 1);
            draft.splice(result.destination.index, 0, reorderedItem);
        }));
    }

    return (
        <div>
            <div className="edit-element">
                컨텐츠 수정
            </div>
            <div>
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
                                                    <div
                                                        className="one-contents-draggable"
                                                        ref={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}

                                                        onClick={() => {
                                                            action.setSecNum(index)
                                                        }}

                                                        style={getItemStyle(
                                                          snapshot.isDragging,
                                                          provided.draggableProps.style,
                                                        )}>
                                                            <div className="center-row hoverback one-contents__inner">
                                                                {item.sectionTypeName}
                                                            </div>   
                                                    </div>
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

            </div>
        </div>
    )
}

export default EditContents
