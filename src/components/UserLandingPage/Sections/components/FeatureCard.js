import React, {useContext} from 'react'
import { isMobile } from 'react-device-detect'

function FeatureCard({children, section, content, index}) {

    return (
        <div key={index} className="feature__card" 
            style={{
            alignItems: 'center',
            margin : `${ isMobile ? `5px 5px 5px 5px` : `0px ${!isMobile && index === content.numOfElements - 1 ? '0px' : '5px'} 0px ${!isMobile && index === 0 ? '0px' : '5px'}` }`,
            height : `${isMobile ? '' : '100%'}`,
            width : `${isMobile ? 
                content.mobile.layout === 1 ? '100%' 
                : content.mobile.layout === 2 ? '46%' 
                : '30%'
                : '46%'}`,
            boxShadow:`${section === 'gallery' && content.card.shadow ? '2px 2px 4px rgba(0,0,0,0.4)' : ''}`, 
            backgroundColor: `${section === 'gallery' && content.card.color}`, 
            borderRadius:`${section === 'gallery' &&content.card.borderRadius}px`}}>
            {children}
        </div>
    )
}

export default FeatureCard