import React from 'react';
import { motion } from 'framer-motion';

const AnimationDiv = ({content, children, returnLayout, setting}) => {
    if(!content.animation.use)
    return(
    <>
        <div style={{display:'flex', ...returnLayout}}
            // style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}
            >
            {children}
        </div>
    </>
    )
    else 
        return(
            <>
            <motion.div
                style={{display:'flex', ...returnLayout}} 
                data-aos-easing="ease-in-back"
                data-aos-delay="200"
                data-aos-offset="0"
                data-aos={setting.animation} 
                aos-duration="4000" >
                {children}
            </motion.div>
            </>
        )
}

export default AnimationDiv;