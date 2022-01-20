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

        // change background colour if dragging
        background: isDragging ? "lightgreen" : backColor,

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
                                    
                                    let backColor = 'grey'
                                    return(
                                        <Draggable draggableId={String(index)} key={index} index={index} style={{width:'100%'}}>
                                            {(provided, snapshot) => {
                                                return(
                                                    <div
                                                        className="one-contents-draggable"
                                                        onMouseEnter={() => {
                                                            backColor='red';
                                                        }}
                                                        onMouseLeave={() => {
                                                            backColor = 'grey';
                                                        }}
                                                        ref={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                        style={getItemStyle(
                                                          snapshot.isDragging,
                                                          provided.draggableProps.style,
                                                          backColor,
                                                        )}>
                                                            {item.sectionTypeName}
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
