import React from 'react'
import './Template3.css'

function Template3({content}) {
    /*
    * 특징들 템플릿
    */

    const featuresTable = content.features.map((item, index) => {
        return(
            <div className="features__feature-card" key={index}>
                <div>
                    {item.title}
                </div>
                <div>
                    {item.desc}
                </div>
            </div>
        )
    })

    return (
        <div className="features-container">
            <div>
                {content.title}
            </div>
            <div className="features__features-card-container">
            {featuresTable}
            </div>
        </div>
    )
}

export default Template3
