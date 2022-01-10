import React from 'react'
import Editor from '../../tools/Editor'

function NaviTemplate1({navi, setNavi}) {

    const returnButton = () => {
        switch(navi.button.num){
            case 1:
                return(
                    <button className="make-nav-button b-one" style={{backgroundColor:`${navi.button.color}`}}>
                        <Editor 
                            data={navi.button.title} 
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                setNavi({...navi, button:{...navi.button, title:data}});
                            }} />
                    </button>
                )

            case 2:
                return(
                    <button className="make-nav-button b-two" style={{backgroundColor:`${navi.button.color}`}}>
                        <Editor 
                            data={navi.button.title} 
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                setNavi({...navi, button:{...navi.button, title:data}});
                            }} />
                    </button>
                )

            case 3:
                return(
                    <button className="make-nav-button b-three" style={{backgroundColor:`${navi.button.color}`}}>
                        <Editor 
                            data={navi.button.title} 
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                setNavi({...navi, button:{...navi.button, title:data}});
                            }} />
                    </button>
                )

            case 4:
                return(
                    <button className="make-nav-button b-four" style={{backgroundColor:`${navi.button.color}`}}>                        
                        <Editor 
                            data={navi.button.title} 
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                setNavi({...navi, button:{...navi.button, title:data}});
                            }} />
                    </button>
                )

            defualt:
                return(
                    <button className="make-nav-button" style={{backgroundColor:`${navi.button.color}`}}>{navi.button.title}</button>
                )
        }
    }

    return (
        <>
            <span className="make-nav-logoc centera">
                {navi.isLogo === "logo" && 
                    <div className="centera" style={{width:'80px'}}><img className="hover" src={navi.logo} height={30} /></div>}
                {navi.isLogo === "text" && 
                <Editor 
                    data={navi.title} 
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        setNavi({...navi, title:data});
                    }}
                    />}
            </span>
            <span className="make-nav-buttonc centera">
                { navi.button.use && returnButton() }
            </span>
        </>
    )
}

export default NaviTemplate1
