import React from 'react'
import "@lottiefiles/lottie-player";

function LoadingDisplay() {
    return (
        <div className="centera" style={{width:'100vw', height:'100vh'}}>
            <lottie-player
                autoplay
                loop
                mode="normal"
                src="https://assets2.lottiefiles.com/packages/lf20_tiuij39a.json"
                style={{width:'200px'}}
            >
            </lottie-player>
        </div>
    )
}

export default LoadingDisplay
