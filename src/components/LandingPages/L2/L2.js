import React, { useState, useEffect } from 'react';
import { dbService } from '../../tools/fbase';
import fp from '../utils/images.png';
import Section from '../../MakePage/utils/Section/Section'
import LastSection from '../../MakePage/utils/Section/LastSection'
import MakeFooter from '../../MakePage/utils/NavBar/MakeFooter'
import ReactGa from 'react-ga'

const LANDINGID = "REDE";

const USEREMAIL = "직접 입력하기"

const smallfont = `28px`;
const bigfont = '50px';

const L2 = (props) => {
    const [ item, setItem ] = useState();
    const [ loading, setLoading ] = useState(false);

    const favicon = document.getElementById("favicon");

    const urltitle = document.getElementById("urltitle");

    const loadData = async () => {
        const userOrder = await dbService
            .collection("apply-landing-data")
            .where("urlId", "==", props.match.params.id)
            .get(); // uid를 creatorId로 줬었으니까.

        let orderData = userOrder.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        favicon.href = orderData[0].faviconAttachment;   
        urltitle.innerText = orderData[0].urlTitle;
        setItem( orderData[0] );
        setLoading(true);
    }

    useEffect(() => {
        console.log(props.match.params.id)
        loadData()
        ReactGa.initialize('UA-213792742-1');
        // to report page view
        ReactGa.pageview(`/${props.match.params.id}`);
    }, [loading])

    return (
        <>
        {loading ? <>
            <div className="scroll-container" style={{ width:`100%`, height:`100vh`, marginTop:'-60px', border:'none'}}>
                <div className="make-main-page-container" style={{fontSize:`${bigfont}`, backgroundColor:`${item.s1backgroundColor}`}}>  
                    <div className="make-navigation" style={{width:`100%`, backgroundColor:`${item.naviColor}`}}>
                        <span className="make-nav-bar-title" onClick={() => {props.history.push(`/${item.urlId}`); props.history.go();}} style={{fontFamily:`${item.font}`, cursor:'pointer', color:`${item.naviTitleColor}`}}>
                            {item.naviTitle}
                        </span>
                        <span className="make-nav-on">
                            <button className="make-nav-button" style={{color:`${item.naviButtonColor}`,fontFamily:`${item.descFont}`, cursor:'pointer'}} onClick={() => window.scrollTo(0,document.body.scrollHeight)}>{item.naviButtonTitle}</button>
                        </span>
                    </div>
                    { item.secNums.length > 1 && 
                        <Section device={item.device}
                            sectionNumber={1}
                            title={item.s1title} desc={item.s1desc} attachment={item.attachment1} full={true} bigfont={item.bigfont} smallfont={item.smallfont}
                            templateNum={item.s1template} font={item.font} backgroundColor={item.s1backgroundColor}
                            titleColor={item.s1titleColor} titleSize={item.s1titleSize} descColor={item.s1descColor} descSize={item.s1descSize}
                            applyButtonUse={item.s1applyButtonUse} applyButtonText={item.s1applyButton} applyButtonColor={item.s1applyButtonColor}
                            targets={item.targets} sectionHeight={item.sectionHeight1} rate={1}
                            descFont={item.descFont} imageWidth={item.imageWidth1} backgroundImage={item.backgroundImage1}
                        />
                    }
                    { item.secNums.length > 2 && 
                        <Section device={item.device}
                            sectionNumber={2}
                            title={item.s2title} desc={item.s2desc} attachment={item.attachment2} full={true} bigfont={item.bigfont} smallfont={item.smallfont}
                            templateNum={item.s2template} font={item.font} backgroundColor={item.s2backgroundColor}
                            titleColor={item.s2titleColor} titleSize={item.s2titleSize} descColor={item.s2descColor} descSize={item.s2descSize}
                            applyButtonUse={item.s2applyButtonUse} applyButtonText={item.s2applyButton} applyButtonColor={item.s2applyButtonColor}
                            targets={item.targets} sectionHeight={item.sectionHeight2} rate={1}
                            descFont={item.descFont} imageWidth={item.imageWidth2} backgroundImage={item.backgroundImage2}
                        />
                    }
                    { item.secNums.length > 3 && 
                        <Section device={item.device}
                            sectionNumber={3}
                            title={item.s3title} desc={item.s3desc} attachment={item.attachment3} full={true} bigfont={item.bigfont} smallfont={item.smallfont}
                            templateNum={item.s3template} font={item.font} backgroundColor={item.s3backgroundColor}
                            titleColor={item.s3titleColor} titleSize={item.s3titleSize} descColor={item.s3descColor} descSize={item.s3descSize}
                            applyButtonUse={item.s3applyButtonUse} applyButtonText={item.s3applyButton} applyButtonColor={item.s3applyButtonColor}
                            targets={item.targets} sectionHeight={item.sectionHeight3} rate={1}
                            descFont={item.descFont} imageWidth={item.imageWidth3} backgroundImage={item.backgroundImage3}
                        />
                    }
                    { item.secNums.length > 4 && 
                        <Section device={item.device}
                            sectionNumber={4}
                            title={item.s4title} desc={item.s4desc} attachment={item.attachment4} full={true} bigfont={item.bigfont} smallfont={item.smallfont}
                            templateNum={item.s4template} font={item.font} backgroundColor={item.s4backgroundColor}
                            titleColor={item.s4titleColor} titleSize={item.s4titleSize} descColor={item.s4descColor} descSize={item.s4descSize}
                            applyButtonUse={item.s4applyButtonUse} applyButtonText={item.s4applyButton} applyButtonColor={item.s4applyButtonColor}
                            targets={item.targets} sectionHeight={item.sectionHeight4} rate={1}
                            descFont={item.descFont} imageWidth={item.imageWidth4} backgroundImage={item.backgroundImage4}
                        />
                    }

                    { item.useLastSection !== 0 && 
                        <LastSection 
                            urlId={item.urlId}
                            targets={item.targets} lasttitleColor={item.lasttitleColor} full={true} rate={item.rate}
                            title={item.lasttitle} desc={item.lastdesc} sectionHeight={item.lastSectionHeight}
                            font={item.font} backgroundColor={item.lastbackgroundColor} descSize={item.lastDescSize}
                            titleColor={item.lasttitleColor} titleSize={item.lasttitleSize} font={item.font} descFont={item.descFont}
                            applyButtonText={item.lastapplyButton} answers={item.answers} lastdescColor={item.lastdescColor}
                            bigfont={bigfont} smallfont={smallfont} inf={item.inf}
                        />
                    }
                    {item.footerOrNot ?  <></> : 
                    <MakeFooter 
                        userPhoneNumber={item.userPhoneNumber}
                        userEmail={item.userEmail}
                        naviTitle={item.naviTitle}
                        footerColor={item.footerColor}
                        full={true} bigfont={bigfont} smallfont={smallfont}
                        rate={item.rate}
                    />
                    } 
                </div> 
                </div>
        </> : <></>}
        </>
    )
    
}

export default L2
