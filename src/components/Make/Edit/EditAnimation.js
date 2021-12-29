import React, {useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import {animations} from '../tools/animations'
import lodash from 'lodash'

const EditAnimation = ({content}) => {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const setAnimation = (num) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, animation:{...item.animation, type:num}} : item )
        action.setContents(newContents);
    }

    const onChangeAnimationUse = (e) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, animation:{...item.animation, use:!content.animation.use}} : item )
        action.setContents(newContents);
    }

    return (
        <div>
            <div>
                애니메이션
                <span>
                    <input type="checkbox" value={content.animation.use} onClick={(e) => {onChangeAnimationUse(e)}} />
                </span>
            </div>
            { content.animation.use && 
                <div className="animation-select__outer-container">
                    <div className="animation-select__container">
                        {
                            animations.map((item, index) => {
                                return(
                                    <span className="animation-select__card" key={index} onClick={() => {
                                        setAnimation(item.num); }}>
                                        애니메이션 {item.num}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default EditAnimation
