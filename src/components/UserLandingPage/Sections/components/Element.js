import React from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import IconTable from '../../../../components/Make/SectionTypes/components/IconTable'
import {icons} from '../../../../components/Make/SectionTypes/components/IconTable'
import {Upload} from '@styled-icons/bootstrap';

function Element({content, item}) {

    const returnIcon = (name) => {
        return icons.filter(doc => doc.name === name)[0].icon
    }

    return (
    <>
    {
        content.element.use && 
        <div className="centera" style={{justifyContent: `${content.elementText.align}`}}>
            <div style={{width:`${content.element.size}px`, height:`${content.element.size}px`, position:'relative', cursor:'pointer'}}>
            {
            content.element.type === 'image' ? 
            <div className="feature-upload-button" style={{cursor:'default'}}>
            { item.attachment ? 
                <img src={item.attachment} style={{width:`${content.element.size}px`, height:`${content.element.size}px`, borderRadius:`${content.element.imageBorder}px`, objectFit:'cover'}}/> 
                :
                <div className="feature-upload-button" style={{borderRadius:`${content.element.imageBorder}px`, backgroundColor:`${content.element.backgroundColor}`}}>
                    <Upload size="25" />
                </div>
            }
            </div> 
            : 
            <div className="feature-upload-button" style={{cursor:'default', borderRadius:`${content.element.iconBorder}px`, backgroundColor:`${content.element.backgroundColor}`}}>
                {item.icon ? 
                    <>{returnIcon(item.icon)}</> 
                    :
                    <Upload size="25" />
                }
            </div>
            }
        </div> 
    </div>
    }
</>
    )
}

export default Element