import React, {useRef, useEffect} from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from 'styled-components'
import prevButton from '../../../../../tools/img/prevButton.png'
import nextButton from '../../../../../tools/img/nextButton.png'

const Prev = styled.img`
width: 50px;
height: 50px;
z-index: 5;
margin-left: -40px;
margin-top: -30px;
`

const Next = styled.img`
width: 50px;
height: 50px;
z-index: 5;
margin-right: -40px;
margin-top: -30px;
`


function FuncImageCarousel({content}) {

    const imgRef = useRef(null)

    // const PrevArrow=({currentSlide,slideCount,...props})=>(
    //     <Prev {...props} src={prevButton} className="slick-prev" /> 
    // )

    // const NextArrow=({currentSlide,slideCount,...props})=>(
    //     <Next {...props} src={nextButton} className="slick-next" /> 
    // )

    const settings = {
        dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
        speed: 500, // 애미메이션의 속도, 단위는 milliseconds
        slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
        slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
        autoplay: true,
        autoPlaySpeed: 5000,	
      };

    return (
        <div className="slide-box" style={{borderRadius: `${content.image.border}%`, width:`${content.image.size}px`,height:`${content.image.size}px`}}>
            <Slider {...settings}> 
            {
                (content.slide_img.slide1) &&
                    <img ref={imgRef} src={`${content.slide_img.slide1}`} style={{width:`${content.image.size}px`,height:`${content.image.size}px`,boxShadow: `${content.image.shadowValue}`}}/>
            }
            {
                (content.slide_img.slide2) &&
                    <img ref={imgRef} src={`${content.slide_img.slide2}`} style={{ width:`${content.image.size}px`,height:`${content.image.size}px`,boxShadow: `${content.image.shadowValue}`}}/>
            }
            {
                (content.slide_img.slide3) &&
                    <img ref={imgRef} src={`${content.slide_img.slide3}`} style={{ width:`${content.image.size}px`,height:`${content.image.size}px`,boxShadow: `${content.image.shadowValue}`}}/>
            }
            </Slider>
        </div>
    )

}

export default FuncImageCarousel