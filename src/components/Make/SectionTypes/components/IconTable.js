import * as bi from '@styled-icons/boxicons-logos'
import * as bs from '@styled-icons/bootstrap'
import * as hs from '@styled-icons/heroicons-solid'
import * as ho from '@styled-icons/heroicons-outline'
import * as fd from '@styled-icons/foundation'
import * as fs from '@styled-icons/fluentui-system-regular'
import {Email} from '@styled-icons/entypo'
import {EmailOutline} from '@styled-icons/evaicons-outline'
import {KakaoTalk} from '@styled-icons/remix-fill'
import OverflowScrolling from 'react-overflow-scrolling';

import React, {useState} from 'react'

const ICONSIZE = 30;

export const icons = [
    {
        icon:<fd.Link size={ICONSIZE}/>,
        name:'Link'
    },
    {
        icon:<fd.Laptop size={ICONSIZE}/>,
        name:'Laptop'
    },
    
    {
        icon:<fd.GraphBar size={ICONSIZE}/>,
        name:'GraphBar'
    },
    
    {
        icon:<fd.Crop size={ICONSIZE}/>,
        name:'Crop'
    },
    {
        icon:<bi.Mastercard size={ICONSIZE} />,
        name:'Mastercard'
    },
    {
        icon:<bi.Periscope size={ICONSIZE} />,
        name:'Periscope'
    },
    {
        icon:<bi.PlayStore size={ICONSIZE} />,
        name:'PlayStore'
    },
    {
        icon:<bi.Slack size={ICONSIZE} />,
        name:'Slack'
    },
    {
        icon:<bi.Soundcloud size={ICONSIZE} />,
        name:'Soundcloud'
    },
    {
        icon:<fs.VideoClip size={ICONSIZE} />,
        name:'VideoClip'
    },
    {
        icon:<fs.Wand size={ICONSIZE} />,
        name:'Wand'
    },
    {
        icon:<fs.WebAsset size={ICONSIZE} />,
        name:'WebAsset'
    },
    {
        icon:<fd.ArrowsOut size={ICONSIZE} />,
        name:'ArrowsOut'
    },
    {
        icon:<fd.Checkbox size={ICONSIZE} />,
        name:'Checkbox'
    },
    {
        icon:<ho.Annotation size={ICONSIZE} />,
        name:'Annotation'
    },
    {
        icon:<ho.CurrencyDollar size={ICONSIZE} />,
        name:'CurrencyDollar'
    },
    {
        icon:<ho.Database size={ICONSIZE} />,
        name:'Database'
    },
    {
        icon:<ho.Star size={ICONSIZE} />,
        name:'Star'
    },
    {
        icon:<ho.TrendingUp size={ICONSIZE} />,
        name:'TrendingUp'
    },
    {
        icon:<hs.Fire size={ICONSIZE} />,
        name:'Fire'
    },
    {
        icon:<bs.StarFill size={ICONSIZE} />,
        name: "StarFill"
    },
    {
        icon:<bs.BookmarkStarFill size={ICONSIZE} />,
        name: "BookmarkStarFill"
    },
    {
        icon:<bs.BookFill size={ICONSIZE} />,
        name: "BookFill"
    },
    {
        icon:<bs.CardImage size={ICONSIZE}/>,
        name:'CardImage'
    },
    {
        icon:<bs.AlarmFill size={ICONSIZE}/>,
        name:'AlarmFill'
    },
    {
        icon:<bs.BagFill size={ICONSIZE}/>,
        name:'BagFill'
    },
    {
        icon:<bs.BasketFill size={ICONSIZE}/>,
        name:'BasketFill'
    },
    {
        icon:<bs.Basket3Fill size={ICONSIZE}/>,
        name:'Basket3Fill'
    },
    {
        icon:<bs.BellFill size={ICONSIZE}/>,
        name:'BellFill'
    },
    {
        icon:<bs.BoxSeam size={ICONSIZE}/>,
        name:'BoxSeam'
    },
    {
        icon:<bs.CalculatorFill size={ICONSIZE}/>,
        name:'CalculatorFill'
    },
    {
        icon:<bs.CalendarEventFill size={ICONSIZE}/>,
        name:'CalendarEventFill'
    },
    {
        icon:<bs.CameraFill size={ICONSIZE}/>,
        name:'CameraFill'
    },
    {
        icon:<bs.CameraVideoFill size={ICONSIZE}/>,
        name:'CameraVideoFill'
    },
    {
        icon:<bs.CapslockFill size={ICONSIZE}/>,
        name:'CapslockFill'
    },
    {
        icon:<bs.CartFill size={ICONSIZE}/>,
        name:'CartFill'
    },
    {
        icon:<bs.ChatLeftTextFill size={ICONSIZE}/>,
        name:'ChatLeftTextFill'
    },
    {
        icon:<bs.ChatDotsFill size={ICONSIZE}/>,
        name:'ChatDotsFill'
    },
    {
        icon:<bs.Check2All size={ICONSIZE}/>,
        name:'Check2All'
    },
    {
        icon:<bs.Check2Circle size={ICONSIZE}/>,
        name:'Check2Circle'
    },
    {
        icon:<bs.Dice5Fill size={ICONSIZE}/>,
        name:'Dice5Fill'
    },
    {
        icon:<bs.DisplayFill size={ICONSIZE}/>,
        name:'DisplayFill'
    },
    {
        icon:<bs.EmojiSmileFill size={ICONSIZE}/>,
        name:'EmojiSmileFill'
    },
    {
        icon:<bs.FileEarmarkArrowDownFill size={ICONSIZE}/>,
        name:'FileEarmarkArrowDownFill'
    },
    {
        icon:<bs.FlagFill size={ICONSIZE}/>,
        name:'FlagFill'
    },
    {
        icon:<bs.Front size={ICONSIZE}/>,
        name:'Front'
    },
    {
        icon:<bs.GearFill size={ICONSIZE}/>,
        name:'GearFill'
    },
    {
        icon:<bs.GeoAltFill size={ICONSIZE}/>,
        name:'GeoAltFill'
    },
    {
        icon:<bs.GiftFill size={ICONSIZE}/>,
        name:'GiftFill'
    },
    {
        icon:<bs.HandThumbsUpFill size={ICONSIZE}/>,
        name:'HandThumbsUpFill'
    },
    {
        icon:<bs.HeartFill size={ICONSIZE}/>,
        name:'HeartFill'
    },
    {
        icon:<bs.HouseDoorFill size={ICONSIZE}/>,
        name:'HouseDoorFill'
    },
    {
        icon:<bs.InfoCircleFill size={ICONSIZE}/>,
        name:'InfoCircleFill'
    },
    {
        icon:<bs.LayersFill size={ICONSIZE}/>,
        name:'LayersFill'
    },
    {
        icon:<bs.PlayBtnFill size={ICONSIZE}/>,
        name:'PlayBtnFill'
    },
    {
        icon:<bs.Printer size={ICONSIZE}/>,
        name:'Printer siz'
    },
    {
        icon:<bs.TelephoneFill size={ICONSIZE}/>,
        name:'TelephoneFill'
    },
    {
        icon:<bs.TrashFill size={ICONSIZE}/>,
        name:'TrashFill'
    },
    {
        icon:<bs.VolumeUpFill size={ICONSIZE}/>,
        name:'VolumeUpFill'
    },
    {
        icon:<bi.Android size={ICONSIZE} />,
        name:'Android',
    },
    {
        icon:<bi.Apple size={ICONSIZE} />,
        name:'Apple',
    },
    {
        icon:<bi.Airbnb size={ICONSIZE} />,
        name:'Airbnb',
    },
    {
        icon:<bi.FacebookCircle size={ICONSIZE} />,
        name:'FacebookCircle',
    },
    {
        icon:<bi.PlayStore size={ICONSIZE} />,
        name:'PlayStore',
    },
    {
        icon:<Email size={ICONSIZE} />,
        name:'Email',
    },
    {
        icon:<EmailOutline size={ICONSIZE} />,
        name:'EmailOutline',
    },
    {
        icon:<KakaoTalk size={ICONSIZE} />,
        name:'KakaoTalk',
    },
]

function IconTable({func, handleClose}) {

    return(
        <OverflowScrolling className='overflow-scrolling3'>
            {
                icons.map((item, i) => {
                    return(
                        <div className="one-icon-select" onClick={() => {
                            func(item.name)
                            handleClose()
                        }} key={i}>
                            {item.icon}
                        </div>
                    )
                })
            }
        </OverflowScrolling>
    )
}

export default IconTable
