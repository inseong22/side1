import { base } from './SectionTypes/baseTypes'
import {
    atom,
} from 'recoil';
import lodash from 'lodash'

export const contentsState = atom({
    key:'contentsState',
    default:[ lodash.cloneDeep(base[0]), lodash.cloneDeep(base[1]), lodash.cloneDeep(base[2]), lodash.cloneDeep(base[4]) ]
})

export const naviState = atom({
    key:'naviState',
    default:{
        sectionTemplateNumber:1,
        title:'Surfee',
        fixed:false,
        isLogo:'logo',
        logo:'',
        backgroundColor:'rgba(0,0,0,0)', 
        bottomBorder:false,
        button:{
            use:true,
            func:'link',
            templateNum:1,
            link:'www.naver.com',
            title:'신청하기',
            color:'rgba(0,0,0,0.4)',
        }
    }
})

export const footState = atom({
    key:'footState',
    default:{
        sectionTemplateNumber:1,
        footerOrNot:true,
        backgroundColor:'white', 
        padding:1,
        text:" <p style=\"text-align:center;\">About Us - Contact Us - 개인정보 처리방침 - 팀 소개</p><p style=\"text-align:center;\">E-mail : surfee.business@gmail.com</p><p style=\"text-align:center;\"><strong>2021 Copyright © , All rights reserved</strong></p>",
        iconUse:true,
        iconStyle:'circle',
        iconColor:'white',
        iconAlign:'start',
        icons:[
            
        ],
        second:{
            text:'<p>두번 째 단입니다.</p>'
        }
    }
})

export const settingState = atom({
    key:'settingState',
    default:{
        urlId:'',
        faviconAttachment:'',
        font:'',
        smallFont:'',
        color:'',
        fta:{
            use:false,
            backgroundColor:'rgba(150,150,0,1)',
            text:'fta 버튼'
        }
    }
})