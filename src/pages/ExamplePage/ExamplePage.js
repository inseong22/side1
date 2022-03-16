import React, {useState} from 'react'
import ex1 from '../../tools/img/main/ex1.png'
import ex2 from '../../tools/img/main/ex2.png'
import ex3 from '../../tools/img/main/ex3.png'
import ex4 from '../../tools/img/main/ex4.png'
import ex5 from '../../tools/img/main/ex5.png'
import ex6 from '../../tools/img/main/ex6.png'
import styled from 'styled-components'
import Footer from '../NavAndFooter/Footer'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import TemplateModal from './TemplateModal'
import {Link} from 'react-router-dom'
import {isMobile} from 'react-device-detect'
import './ExamplePage.css'

const exs = [
    {
        img : ex1,
        title:"Surfee 랜딩페이지",
        url:''
    },
    {
        img : ex2,
        title:"Template 2",
        url:'template1'
    },
    {
        img : ex3,
        title:"Template 3",
        url:'template2'
    },
    {
        img : ex4,
        title:"Template 4",
        url:'template3'
    },
    {
        img : ex5,
        title:"Template 5",
        url:'template5'
    },
    {
        img : ex6,
        title:"Template 6",
        url:'template4'
    },
]

const ExampleCard = ({img, title, url}) => {

    return(
        <div className="excard uphover2" style={{cursor:'pointer'}} onClick={()=>{
                window.open(
                        'https://surfee.co.kr/' + url,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }}>
            <div className="back-image-fit excard-image"
                style={{backgroundImage:`url(${img})`}}>
                {/* <div className="excard-black">
                    <Link className="excard-button-1" to={{
                        pathname:`/make`,
                        state:{
                            template:true,
                            templateNum:url,
                        }}}>
                        템플릿 사용하기
                    </Link>
                    <div className="excard-button-2" onClick={()=>{
                        window.open(
                                'https://surfee.co.kr/' + url,
                                '_blank' // <- This is what makes it open in a new window.
                            );
                        }}>
                        페이지 보기
                    </div>
                </div> */}
            </div>
            <div className="excard-title">
                {title}
            </div>
        </div>
    )
}

export const LandingPageExamples = () => {
    return(
        <div style={{ boxSizing:'border-box', flexWrap: 'wrap', marginTop:'15px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent: 'center', width:'100%'}}>
            {exs.map((item, index) => {
                return(
                    <ExampleCard key={index} img={item.img} title={item.title} url={item.url}/>
                )
            })}
        </div>
    )
}

function ExamplePage({isLoggedIn, history}) {
    const [makeModal, setMakeModal] = useState(false)
    const [url, setUrl] = useState('')

    const LandingPageTemplates = () => {
        return(
            <div style={{ boxSizing:'border-box', flexWrap: 'wrap', marginTop:'15px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent: 'center', width:'100%'}}>
                {exs.map((item, index) => {
                    return(
                        <ExampleCardInTemplate key={index} img={item.img} title={item.title} url={item.url}/>
                    )
                })}
            </div>
        )
    }
    
    const ExampleCardInTemplate = ({img, title, url}) => {

        return(
            <div className="excard uphover2">
                <div className="back-image-fit excard-image"
                    style={{backgroundImage:`url(${img})`}}>
                    <div className="excard-black">
                        {
                            url.length > 1 && 
                            <div className="section-add__button" style={{width:'130px', fontSize:'14px'}} onClick={() => {
                                if(!isMobile){
                                    alert("죄송합니다. 현재 제작은 PC 환경에서만 가능합니다!")
                                }else{
                                    setMakeModal(true);
                                    setUrl(url)
                                }
                                }}>
                                템플릿 사용하기
                            </div>
                        }
                        {/* <Link className="excard-button-1" to={{
                            pathname:`/make`,
                            state:{
                                template:true,
                                templateNum:url,
                            }}}>
                            템플릿 사용하기
                        </Link> */}
                        <div className="excard-button-2" onClick={()=>{
                            window.open(
                                    'https://surfee.co.kr/' + url,
                                    '_blank' // <- This is what makes it open in a new window.
                                );
                            }}>
                            페이지 보기
                        </div>
                    </div>
                </div>
                <div className="excard-title">
                    {title}
                </div>
            </div>
        )
    }

    return (
        <>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn} buttonOpen />
        <div style={{fontSize: '28px'}}>
            <div className="main-page-section1" style={{flexDirection:'column'}}>
                <div className="main-section-left-topbottom back-gradient" style={{color:'white', marginTop:'-80px', padding:'150px 0px 40px 0px'}}>
                    <span className="one-section-big osb2" style={{textAlign: 'center'}}>
                        Surfee 활용 예시
                    </span>
                    <span className="one-section-small" style={{textAlign: 'center'}}>
                        Surfee를 사용한 페이지 디자인 예시를 참고해보세요!<br/>
                        마음에 드는 템플릿📄&nbsp;으로 바로 제작할 수도 있습니다.
                    </span>
                </div>
                <LandingPageTemplates />
            </div>
            <Footer />
        </div>
        <TemplateModal url={url} open={makeModal} setOpen={setMakeModal} />
        </>
    )
}

export default ExamplePage
