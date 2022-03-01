import React, {useState} from 'react'
import UserSection from './UserSection'
import { isMobile } from 'react-device-detect'

function UserContents({contents, setting}) {
    const sectionsReturn = contents.map((item, index) => {
        return(
            <>
            {
                item.responsive.mobile && isMobile && 
                    <UserSection content={item} setting={setting}/>
            }
            {
                item.responsive.pc && !isMobile && 
                    <UserSection content={item} setting={setting}/>
            }
            </>
        )
    })
    
    return (
        <>
            {sectionsReturn}
        </>
    )
}

export default UserContents
