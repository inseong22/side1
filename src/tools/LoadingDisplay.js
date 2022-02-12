import React from 'react'
import "@lottiefiles/lottie-player";

function LoadingDisplay() {
    return (
        <div className="centera" style={{width:'100vw', height:'100vh'}}>
            <lottie-player
                autoplay
                loop
                mode="normal"
                src="https://assets7.lottiefiles.com/packages/lf20_8y9IYf.json"
                style={{width:'320px'}}
            >
            </lottie-player>
        </div>
    )
}

export default LoadingDisplay
