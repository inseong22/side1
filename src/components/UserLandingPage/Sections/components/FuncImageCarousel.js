import React, {useRef} from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {NavigateBefore, NavigateNext} from '@styled-icons/material'
import { isMobile } from 'react-device-detect'

const IFPHONE = 100/24;
const IFUPDOWN = 100/70;
const IFSIDE = 100/32;

function FuncImageCarousel({content}) {

    const imgRef = useRef(null)

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
        if(isMobile){
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
        }}
            >

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