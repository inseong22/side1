import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'

function FeatureCard({children, align, section, content, index}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <div key={index} className="feature__card" 
            style={{
            alignItems: `${align}`,
            margin : `${ state.isPhone ? `5px 5px 5px 5px` : `0px ${!state.isPhone && index === content.numOfElements - 1 ? '0px' : '5px'} 0px ${!state.isPhone && index === 0 ? '0px' : '5px'}` }`,
            height : `${state.isPhone ? '' : '100%'}`,
            width : `${state.isPhone ? 
                content.mobile.layout === 1 ? '100%' 
                : content.mobile.layout === 2 ? '46%' 
                : '30%'
                : '46%'}`,
            boxShadow:`${content.card !== undefined  && content.card.shadow ? '2px 2px 4px rgba(0,0,0,0.4)' : ''}`, 
            backgroundColor: `${content.card !== undefined && content.card.color}`, 
            borderRadius:`${content.card !== undefined  &&content.card.borderRadius}px`}}>
            {children}
        </div>
    )
}

export default FeatureCard
