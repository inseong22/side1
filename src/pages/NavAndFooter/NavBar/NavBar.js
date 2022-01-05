import React, {useState, useEffect} from 'react'
import './utils/NavBar.css'
import {Link} from 'react-router-dom';


function NavBar({history}) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [back, setBack] = useState(0);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    
    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);
        if(scrollPosition < 50){
            setBack(scrollPosition*(1/50));
        }else{
            setBack(1);
        }
    });

    return (
        <>
        <div className={scrollPosition < 50 ? "nav-bar-container-top" : "nav-bar-container"} 
        style={{backgroundColor:`rgba(255,255,255,1)`, color:`rgba(${255-back*149},${255-back*156},${255-back*8},1)`
        }}>
            <span className="nav-bar-title" onClick={() => {history.push('/#/'); history.go();}} style={{cursor:'pointer'}}>
                Surfee
            </span>
            <span className="nav-on">
                <button className="nav-button" onClick={() => window.scrollTo(0,document.body.scrollHeight)}>사전신청 하기</button>
            </span>
        </div>
        </>
    )
}

export default NavBar
