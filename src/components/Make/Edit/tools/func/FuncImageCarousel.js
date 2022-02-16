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

export const StyledSlider = styled(Slider)`
   height: 90%; //슬라이드 컨테이너 영역

  .slick-list {  //슬라이드 스크린
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    background: green;
  }

  .slick-slide div { //슬라이더  컨텐츠
    /* cursor: pointer; */
  }

  .slick-dots {  //슬라이드의 위치
    bottom: 20px;
    margin-top: 200px;
  }

  .slick-track { //이건 잘 모르겠음
    width: 100%;
  }
`;

function FuncImageCarousel({content}) {

    const imgRef2 = useRef(null)

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
        className: 's'
      };

    return (
        <div className="slide-box" ref={imgRef2} style={{position:'relative', borderRadius: `${content.image.border}%`, width:`${content.image.size}%`, height:`${imgRef2.current && imgRef2.current.scrollWidth * 0.56}px`, backgroundColor:'red'}}>    
            <Slider {...settings} style={{backgroundColor:'blue', width:'100%', height:`100%`}}>
                <div>
                    1
                </div>
                <div>
                    2
                </div>
            </Slider>
        </div>
    )

}

export default FuncImageCarousel