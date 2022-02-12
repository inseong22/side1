import React from 'react';
import { motion } from 'framer-motion';

const AnimationDiv = ({content, children, returnLayout}) => {
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
                data-aos={content.animation.type} aos-duration="4000" >
                {children}
            </motion.div>
            </>
        )
}

export default AnimationDiv;