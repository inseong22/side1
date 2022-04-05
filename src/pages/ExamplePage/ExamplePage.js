import React, {useState} from 'react'
import ex1 from '../../tools/img/main/ex1.png'
import ex2 from '../../tools/img/main/ex2.png'
import ex3 from '../../tools/img/main/ex3.png'
import ex4 from '../../tools/img/main/ex4.png'
import ex5 from '../../tools/img/main/ex5.png'
import ex6 from '../../tools/img/main/ex6.png'
import b1 from '../../tools/img/main/b1.png'
import b2 from '../../tools/img/main/b2.png'
import o1 from '../../tools/img/main/o1.png'
import m1 from '../../tools/img/example/m1.webp'
import m2 from '../../tools/img/example/m2.webp'
import s1 from '../../tools/img/example/s1.webp'
import s2 from '../../tools/img/example/s2.webp'
import p1 from '../../tools/img/example/p1.webp'
import p2 from '../../tools/img/example/p2.webp'
import c1 from '../../tools/img/example/c1.webp'
import c2 from '../../tools/img/example/c2.webp'
import clofos from '../../tools/img/example/clofos.png'
import Footer from '../NavAndFooter/Footer'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import TemplateModal from './TemplateModal'
import {Link} from 'react-router-dom'
import {isMobile} from 'react-device-detect'
import './ExamplePage.css'

const exs = [
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
    {
        img : m1,
        title:"Mercury",
        url:'mercurysurfeeex'
    },
    {
        img : m2,
        title:"Data",
        url:'datasurfeeex'
    },
    {
        img : s1,
        title:"Code Note",
        url:'codenotesurfeeex'
    },
    {
        img : s2,
        title:"Cakehouse",
        url:'cakehousesurfeeex'
    },
    {
        img : c1,
        title:"Home Bar",
        url:'homebarsurfeeex'
    },
    {
        img : c2,
        title:"Fillom",
        url:'fillomsurfeeex'
    },
    {
        img : clofos,
        title:"Clofos",
        url:'clofossurfeeex'
    },
    {
        img : p1,
        title:"포트폴리오 1",
        url:'port1surfeeex'
    },
    {
        img : p2,
        title:"포트폴리오 2",
        url:'port3surfeeex'
    },
]

const examples = [
    {
        img:b1,
        title:<span>버블리 컴퍼니 - 내 일을 위한 워크로그<br/>by. 퍼블리(PUBLY)</span>,
        url:'bubblyworksurfeeex'
    },
    {
        img:b2,
        title:<span>버블리 컴퍼니 - 마케터의 한 문장 북클럽<br/>by. 퍼블리(PUBLY)</span>,
        url:'bubblywork2surfeeex'
    },
    {
        img:o1,
        title:<span>OhJandi 🍀<br/>by. OhJandi (@ohjandi_official)</span>,
        url:'ohjandi'
    },
]

export const ExampleCard = ({img, title, url}) => {
    return(
        <div className="excard uphover2" style={{cursor:'pointer'}} onClick={()=>{
                window.open(
                        'https://surfee.co.kr/' + url,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }}>
            <div className="back-image-fit excard-image"
                style={{backgroundImage:`url(${img})`}}>
            </div>
            <div className="excard-title" style={{backgroundColor:'white', borderRadius:'0px 0px 6px 6px'}}>
                {title}
            </div>
        </div>
    )
}

export const LandingPageExamples = () => {
    return(
        <div style={{ boxSizing:'border-box', flexWrap: 'wrap', marginTop:'15px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent: 'center', width:'100%'}}>
            {examples.map((item, index) => {
                return(
                    <ExampleCard key={index} img={item.img} title={item.title} url={item.url}/>
                )
            })}
        </div>
    )
}

export const UserExamples = () => {
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

export const ExampleCardInTemplate = ({img, title, url, setUrl, setMakeModal}) => {

    return(
        <div className="excard uphover2">
            <div className="back-image-fit excard-image"
                style={{backgroundImage:`url(${img})`}}>
                <div className="excard-black">
                    {
                        url.length > 1 && 
                        <div className="section-add__button" style={{width:'130px', fontSize:'14px'}} onClick={() => {
                            if(isMobile){
                                alert("죄송합니다. 현재 제작은 PC 환경에서만 가능합니다!")
                            }else{
                                setMakeModal(true);
                                setUrl(url)
                            }
                            }}>
                            템플릿 사용하기
                        </div>
                    }
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

export const TemplatesList = ({exList, setUrl, setMakeModal}) => {
    return(
        <div style={{ boxSizing:'border-box', flexWrap: 'wrap', marginTop:'15px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent: 'center', width:'100%'}}>
            {exList.map((item, index) => {
                return(
                    <ExampleCardInTemplate key={index} img={item.img} title={item.title} url={item.url} setUrl={setUrl} setMakeModal={setMakeModal}/>
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
                                if(isMobile){
                                    alert("죄송합니다. 현재 제작은 PC 환경에서만 가능합니다!")
                                }else{
                                    setMakeModal(true);
                                    setUrl(url)
                                }
                                }}>
                                템플릿 사용하기
                            </div>
                        }
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
