import React from 'react'
import {icons} from './Icons'

function Icon({name}) {

    const returnIcon = () => {
        const ia = icons.filter(doc => doc.name === name )[0]

        return(
            <>
                {ia.icon}
            </>
        )
    }

    return (
        <div>
            {returnIcon()}
        </div>
    )
}

export default Icon
