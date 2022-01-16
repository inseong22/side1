import * as bi from '@styled-icons/boxicons-logos'

import React, {useState} from 'react'

const icons = [
    {
        icon:<bi.Adobe size={30} />,
        name: "adobe"
    },
    {
        icon:<bi.Airbnb size={30} />,
        name: "Airbnb"
    },
    {
        icon:<bi.Android size={30} />,
        name: "Android"
    },
]

function Icons() {
    const [ia, setIa] = useState('')

    return(
        <>
        {
            icons.map((item, i) => {
                return(
                    <span onClick={() => {
                        setIa(item)
                    }}>
                    {item.icon}
                    </span>
                )
            })
        }
        {
            ia.icon
        }
        </>
    )
}

export default Icons
