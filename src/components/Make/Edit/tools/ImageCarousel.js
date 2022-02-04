import React, {useRef} from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from 'styled-components'
import '../../SectionTypes/HeroSection.css'
import prevButton from '../../../../tools/img/prevButton.png'
import nextButton from '../../../../tools/img/nextButton.png'

import { base } from '../../SectionTypes/baseTypes'

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


function ImageCarousel({content}) {

    const imgRef = useRef(null)

    const PrevArrow=({currentSlide,slideCount,...props})=>(
        <Prev {...props} src={prevButton} className="slick-prev" /> 
    )

    const NextArrow=({currentSlide,slideCount,...props})=>(
        <Next {...props} src={nextButton} className="slick-next" /> 
    )

    const settings = {
        dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
        speed: 500, // 애미메이션의 속도, 단위는 milliseconds
        slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
        slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,	
      };

    return (
        <div className="slide-box">
            <Slider {...settings}> 
            <img className="image" ref={imgRef} src={`${content.slide_img.slide1}`}/>
            <img className="image" ref={imgRef} src={`${content.slide_img.slide2}`}/> 
            <img className="image" ref={imgRef} src={`${content.slide_img.slide3}`}/>
            </Slider>
        </div>
    )

}

export default ImageCarousel