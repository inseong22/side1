import React, {useRef, useEffect, useContext} from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { MyContext } from '../../../../pages/Make/MakePageV2'
import styled from 'styled-components'
import {NavigateBefore, NavigateNext} from '@styled-icons/material'

const IFPHONE = 100/24;
const IFUPDOWN = 100/70;
const IFSIDE = 100/32;

function FuncImageCarousel({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

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
        nextArrow: <NavigateNext size="20" />,
        prevArrow: <NavigateBefore size="20" />,
        autoplay: true,
        autoPlaySpeed: 5000,	
      };


    const numReturn = () => {
        if(state.isPhone){
            return (content.image.size/IFPHONE)/2.7 + 16
        }else if(content.layout === 3 || content.layout === 4){
            return content.image.size/IFUPDOWN
        }else{
            return content.image.size/IFSIDE
        }
    }
    
    const Slide = ({im}) => {
          return(
              <div className="centera" style={{width:`${numReturn()}vw`, height:`${imgRef.current && imgRef.current.scrollWidth * 0.56}px`}}>
                  <img src={`${im}`} style={{width:'100%'}}/>
              </div>
          )
      }

    return (
        <div ref={imgRef} className="slide-box" style={{
            borderRadius: `${content.image.border}%`, 
            width:`${numReturn()}vw`, 
            height:`${imgRef.current && imgRef.current.scrollWidth * 0.56}px`,
            boxShadow: `${content.image.shadowValue}`
        }} >
            <Slider {...settings}> 
            {
                (content.slide_img.attachment1) && <Slide im={content.slide_img.attachment1} />
            }
            {
                (content.slide_img.attachment2) && <Slide im={content.slide_img.attachment2} />
            }
            {
                (content.slide_img.attachment3) && <Slide im={content.slide_img.attachment3} />
            }
            </Slider>
        </div>
    )

}

export default FuncImageCarousel