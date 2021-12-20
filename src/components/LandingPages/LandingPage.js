import React, { useState, useEffect } from 'react';
import { dbService } from '../tools/fbase';
import fp from './utils/images.png';

const LANDINGID = "REDE";

const USEREMAIL = "직접 입력하기"


const LandingPage = () => {
    const [ item, setItem ] = useState();
    const [ loading, setLoading ] = useState(false);

    const favicon = document.getElementById("favicon");
    const urltitle = document.getElementById("urltitle");

    const loadData = async () => {
        const userOrder = await dbService
            .collection("order")
            .where("urlId", "==", USEREMAIL)
            .get(); // uid를 creatorId로 줬었으니까.
        let orderData = userOrder.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setItem( orderData[0] );
        setLoading(true);
    }

    useEffect(() => {
        loadData()
        favicon.href = fp;   
        urltitle.innerText = "make";
    }, [loading])

    return (
        <div>

        </div>
    )
}

export default LandingPage
