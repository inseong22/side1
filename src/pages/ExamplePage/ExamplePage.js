import React from 'react'
import ex1 from '../../tools/img/main/ex1.png'
import ex2 from '../../tools/img/main/ex2.png'
import ex3 from '../../tools/img/main/ex3.png'
import ex4 from '../../tools/img/main/ex4.png'
import ex5 from '../../tools/img/main/ex5.png'
import ex6 from '../../tools/img/main/ex6.png'
import styled from 'styled-components'
import Footer from '../NavAndFooter/Footer'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import './ExamplePage.css'

const exs = [
    {
        img : ex1,
        title:"Surfee 랜딩페이지",
        url:'https://surfee.co.kr/'
    },
    {
        img : ex2,
        title:"Template 2",
        url:'https://surfee.co.kr/template1'
    },
    {
        img : ex3,
        title:"Template 3",
        url:'https://surfee.co.kr/template2'
    },
    {
        img : ex4,
        title:"Template 4",
        url:'https://surfee.co.kr/template3'
    },
    {
        img : ex5,
        title:"Template 5",
        url:'https://surfee.co.kr/template5'
    },
    {
        img : ex6,
        title:"Template 6",
        url:'https://surfee.co.kr/template4'
    },
]

const Title = styled('div')`
    display:flex;
    align-items:center;
    justify-content:start;
    padding:5px 20px;
    width:100%;
    height:15%;
    background-color:white;
    font-size:16px;
    box-sizing:border-box;
    border-radius:0px 0px 30px 30px;
    font-weight:700;
`;

const ExampleCard = ({img, title, url}) => {
    return(
        <div className="excard uphover2" onClick={()=>{
            window.open(
                url,
                '_blank' // <- This is what makes it open in a new window.
            );
        }}>
            <div className="back-image-fit" style={{backgroundImage:`url(${img})`, height:'85%', width:'100%', borderRadius:'30px 30px 0px 0px'}}>
            </div>
            <Title>
                {title}
            </Title>
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
    return (
        <>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn} buttonOpen />
        <div style={{fontSize: '28px', paddingTop:'60px'}}>
            <div className="main-page-section1" style={{flexDirection:'column'}}>
                <div className="main-section-left-topbottom" style={{color:'black', marginTop:'10px'}}>
                    <span className="one-section-big osb2" style={{textAlign: 'center'}}>
                        <span style={{color:'#6c63ff'}}>Surfee</span> 활용 예시
                    </span>
                    <span className="one-section-small" style={{textAlign: 'center'}}>
                        Surfee를 사용한 페이지 디자인 예시를 참고해보세요!<br/>
                    </span>
                </div>
                <LandingPageExamples />
            </div>
            <Footer />
        </div>
        </>
    )
}

export default ExamplePage
