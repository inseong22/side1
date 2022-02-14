import React, {useState} from 'react'
import UserSection from './Sections/UserSection'
import { isMobile } from 'react-device-detect'

function UserContents({contents, setting}) {
    const sectionsReturn = contents.map((item, index) => {
        return(
            <>
            {
                item.responsive.mobile && isMobile && 
                    <div style={{width:'100%'}}>
                        <UserSection content={item} setting={setting}/>
                    </div>
            }
            {
                item.responsive.pc && !isMobile && 
                    <div style={{width:'100%'}}>
                        <UserSection content={item} setting={setting}/>
                    </div>
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
