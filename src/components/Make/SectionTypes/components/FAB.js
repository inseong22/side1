// import React, {useContext} from 'react'
// import { MyContext } from '../../../pages/Make/MakePageV2'
// import produce from 'immer'
// import TextAuto from './TextAuto'

// function FAB({setting, setSetting}) {
//     const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
//     return(
//         <>
//         { 
//         ( setting.fta.use ) &&
//         <div className="fta__container">
//             <button className="fta-button" 
//                 style={{
//                     fontFamily: `${setting.font}`,
//                     backgroundColor:`${setting.fta.backgroundColor}`, 
//                     width:`${isPhone ? setting.fta.size/2 : setting.fta.size}%`, 
//                     borderRadius:`${setting.fta.shape}px`, 
//                     border:`${setting.fta.border ? `1px solid ${setting.fta.borderColor}` : 'none'}`,
//                     boxShadow:`${setting.fta.shadow ? '2px 2px 5px rgba(0,0,0,0.3)' : ''}`
//                 }}>
//                 <TextAuto 
//                     small
//                     value={setting.fta.text} 
//                     onChange={e => setSetting(produce(setting, draft => {
//                         draft.fta.text = e.currentTarget.value;
//                     }))}
//                     color={setting.fta.color} align="center" />
//             </button>
//         </div>
//         }
//         </>
//     )
// }

// export default FAB
