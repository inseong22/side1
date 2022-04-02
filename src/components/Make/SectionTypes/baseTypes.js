import heroanimation from '../../../tools/img/heroanimation.gif'
import person1 from '../../../tools/img/person1.png'
import person2 from '../../../tools/img/person2.png'
import person3 from '../../../tools/img/person3.png'
import gal1 from '../../../tools/img/gal1.png'
import gal2 from '../../../tools/img/gal2.png'
import gal3 from '../../../tools/img/gal3.png'

const commons = {
    layout: 1,
    backgroundColor:'#ffffff',
    backgroundType:'color',
    backgroundImage:{
        attachment:'',
        overlay:false,
        fixed:false,
    },
    title:{
        use:true,
        text: '노코드 랜딩페이지 제작 툴',
        align: 'start',
        size: 36,
        color: '#000000'
    },
    desc:{
        use:true,
        text: 'Surfee에 오신 것을 환영합니다. 자유롭게 사용해 보세요!',
        align: 'start',
        size: 18,
        color: '#000000'
    },
    contents:{
        use: true,
        type: 'image', // image, mockup, video, slide
        align: 'space-between',
    },
    padding:{
        top:15,
        bottom:15,
    },
    animation: 'none',
    box:{
        use:false,
        backgroundColor:'#6C63ff1d',
        borderRadius:5,
        height: 1,
    },
    responsive:{
        mobile:true,
        pc:true,
    },
    mobile:{
        align:'center',
        layout:1,
        contentSize:50,
        cardSize: 100,
        buttonAlign:'center',
    }
}

const contents = {
    image:{
        use:true,
        attachment:'',
        width:70,
        border:0,
        size:60,
        shadow:false,
        shadowValue:'none',
        slide:false,
    },
    slide_img:{
        attachment1: '',
        attachment2: '',
        attachment3: '',
    },
    video:{
        use: false,
        youtube: false,
        type: 'base',
        attachment: '',
        link: '',
        auto: true,
        align: '',
        size: 300,
    },
    mockup: {
        use: false,
        type: 'mobile',
        size:200,
        attachment: '',
        attachment2: '',
        // mobile, desktop, mobile2 있음
    },
}

const element = {
    use:true,
    type:'image', // image or icon
    backgroundColor:'#6CCAD0',
    // borderRaidus:5,'    iconBorder:5,
    imageBorder:15,
    size:50,
    color:'#ffffff',
}

const button = {
    button:{
        use : true,
        ctaText:'CTA 버튼',
        textSize: 12,
        ghostText:'고스트 버튼',
        align:'start',
        ctaUse:true,
        ctaOption: 'link',
        ghostOption: 'link',
        ctaLink:'',
        ctaApply: '',
        ghostUseOrLink: true, 
        ghostUse:false,
        ghostLink:'',
        ghostApply: '',
        ctaCheck : false,
        ghostCheck : false,
    },
    appButton:{
        use: true,
        apple: '',
        google: '',
        align:'start'
    },
    ctaApplyInputs: [],
    ghostApplyInputs: [],
    caution:{
        use:true,
        color: '#000000',
        align: 'start',
        size: 14,
        text:'이 곳에서 유의사항이나 부가설명을 적을 수 있어요.',
    }
}

export const base = [
    {
        // 공통적으로 들어갈 확률이 높은 것들
        ...commons,
        ...contents,
        ...button,
        name:'메인',
        sectionTypeName:'HeroSection',
        title:{
            ...commons.title,
            text:'당신의 서비스를 Surfee로 소개해 보세요.',
            size:36
        },
        desc:{
            ...commons.desc,
            text:'Surfee에 오신 것을 환영합니다. 자유롭게 사용해보세요! \n여기를 클릭하여 서비스 및 상품에 대한 핵심설명을 적어보세요.'
        },
        button:{
            ...button.button,
            ctaText:'버튼 클릭을 유도할 문구를 적어보세요.'
        },
        appButton:{
            ...button.appButton,
            use: false,
        },
        image:{
            ...contents.image,
            attachment:heroanimation,
            size:100,
        }
    },
    {
        ...commons,
        ...contents,
        layout: 2,
        name:'디테일',
        sectionTypeName:'DetailSection',
        title:{
            ...commons.title,
            text:'핵심 특징에 대해서\n한 줄 설명을 적어보세요',
            size:36
        },
        desc:{
            ...commons.desc,
            text:'Surfee에 오신 것을 환영합니다. 자유롭게 사용해보세요! \n여기를 클릭하여 서비스 및 상품에 대한 핵심설명을 적어보세요.'
        },
        image:{
            ...contents.image,
            attachment:heroanimation,
            size:67,
        }
    },
    {
        ...commons,
        ...contents,
        ...button,
        align:'start',
        name:'CTA',
        sectionTypeName:'CtaSection',
        title:{
            ...commons.title,
            text:'잠재 유저의 행동을 유도해 보세요!',
            size:32,
            align:'center'
        },
        desc:{
            ...commons.desc,
            align:'center',
            text:'Surfee에 오신 것을 환영합니다. 자유롭게 사용해보세요! \n여기를 클릭하여 잠재유저의 행동을 유도할 수 있는 문구를 적어보세요.'
        },
        button:{
            ...button.button,
            align:'center',
        },
        caution:{
            ...button.caution,
            align:'center',
        },
        appButton:{
            ...button.appButton,
            align:'center',
            use: false
        }
    },
    {
        ...commons,
        ...button,
        name:'신청',
        align:'center',
        sectionTypeName:'ApplySection',
        title:{
            ...commons.title,
            text:'잠재 유저의 신청을 유도해 보세요!',
            size:32,
            align:'center'
        },
        desc:{
            ...commons.desc,
            align:'center',
            text:'Surfee에 오신 것을 환영합니다. 자유롭게 사용해보세요! \n여기를 클릭하여 잠재유저의 신청을 유도할 수 있는 문구를 적어보세요.'
        },
        button:{
            ...button.button,
            align:'center',
        },
        appButton:{
            ...button.appButton,
            use:false,
        },
        caution:{
            ...button.caution,
            align:'center',
        },
        appButton:{
            ...button.appButton,
            use: false,
        }
    },
    {
        ...commons,
        ...button,
        name:'앱 다운로드',
        align: 'center',
        sectionTypeName:'AppDownloadSection', 
        title:{
            ...commons.title,
            text:'잠재 유저의 앱 다운로드를 유도해 보세요!',
            size:42,
            align: 'center'
        },
        desc:{
            ...commons.desc,
            align: 'center',
            size:24,
            text:'Surfee에 오신 것을 환영합니다. 자유롭게 사용해보세요! \n여기를 클릭하여 잠재유저의 앱 다운로드를 유도할 수 있는 문구를 적어보세요.'
        },
        button:{
            ...button.button,
            use:false,
        },
        appButton:{
            use: true,
            apple: 'https://www.apple.com/kr/app-store/',
            google: 'https://play.google.com/store/',
            align:'center'
        },
        caution:{
            ...button.caution,
            align:'center'
        }
    },
    {
        ...commons,
        element:{
            use:true,
            type:'image', // image or icon
            backgroundColor:'#e6e6e6',
            // borderRaidus:5,'    iconBorder:5,
            imageBorder:5,
            iconBorder:5,
            size:75,
            color:'#ffffff',
        },
        name:'특징',
        sectionTypeName:'FeaturesSection',
        align:'justify',
        numOfElements:3,
        title:{
            ...commons.title,
            text:'특징을 간단하게 나타내 보세요!',
            align:'center',
            size:32
        },
        desc:{
            ...commons.desc,
            text:'여기를 클릭하여 서비스 및 제품의 특징을 간단히 적어보세요.',
            align:'center',
        },
        elementText:{
            use:true,
            titleUse:true,
            titleSize: 20,
            descUse:true,
            descSize: 16,
            titleColor:'#000000',
            descColor:'#000000',
            align: 'center'
        },
        elements:[
            {
                icon:'',
                attachment:'',
                title:'특징 1',
                desc:'여기를 클릭하여 서비스 및 제품의 특징 1을 설명해 주세요.',
            },
            {
                icon:'',
                attachment:'',
                title:'특징 2',
                desc:'여기를 클릭하여 서비스 및 제품의 특징 2를 설명해 주세요.',
            },
            {
                icon:'',
                attachment:'',
                title:'특징 3',
                desc:'여기를 클릭하여 서비스 및 제품의 특징 3을 설명해 주세요.',
            },
            {
                icon:'',
                attachment:'',
                title:'특징 4',
                desc:'여기를 클릭하여 서비스 및 제품의 특징 4를 설명해 주세요.',
            },
            {
                icon:'',
                attachment:'',
                title:'특징 5',
                desc:'여기를 클릭하여 서비스 및 제품의 특징 5를 설명해 주세요.',
            },
        ],
    },
    {
        ...commons,
        element:element,
        name:'리뷰/추천',
        sectionTypeName:'ReviewSection',
        element:{
            use:true,
            type:'image', // image or icon
            backgroundColor:'#e6e6e6',
            imageBorder:5,
            iconBorder:5,
            size:75,
            color:'#ffffff',
        },
        title:{
            ...commons.title,
            text:'서비스 및 제품에 대한 리뷰 혹은 추천사를 적어보세요.',
            size:32,
            align:'center'
        },
        desc:{
            ...commons.desc,
            text:'여기를 클릭하여 서비스 및 제품에 대한 리뷰 혹은 추천사를 적어보세요.',
            align:'center',
            size:16
        },
        align:'center',
        numOfElements:3,
        ratingColor:'red',
        reviewText: true,
        rating:{
            use:true,
            color: '#ffd23a',
            size: 25,
        },
        writer:{
            use:true,
            color: '#000000',
            size: 16,
        },
        elementTitle:{
            use:true,
            color: '#000000',
            size: 20,
        },
        elementText:{
            use:true,
            titleUse:true,
            titleSize: 28,
            descUse:true,
            descSize: 18,
            color:'#000000',
            align: 'center',
        },
        elements:[
            {
                icon:'',
                attachment:'',
                title:'"리뷰 / 추천사의 핵심을 적어보세요."',
                desc:'여기를 클릭하여 서비스 및 제품에 대한\n리뷰, 추천사를 적어\n잠재 유저에게 서비스 및 제품의 신뢰도를 높여보세요!',
                rating:4.5,
                writer:'ㅇㅇ회사, 대표 ㅇㅇㅇ',
            },
            {
                icon:'',
                attachment:'',
                title:'"리뷰 / 추천사의 핵심을 적어보세요."',
                desc:'여기를 클릭하여 서비스 및 제품에 대한\n리뷰, 추천사를 적어\n잠재 유저에게 서비스 및 제품의 신뢰도를 높여보세요!',
                rating:5,
                writer:'ㅇㅇ회사, 대표 ㅇㅇㅇ',
            },
            {
                icon:'',
                attachment:'',
                title:'"리뷰 / 추천사의 핵심을 적어보세요."',
                desc:'여기를 클릭하여 서비스 및 제품에 대한\n리뷰, 추천사를 적어\n잠재 유저에게 서비스 및 제품의 신뢰도를 높여보세요!',
                rating:4.5,
                writer:'ㅇㅇ회사, 대표 ㅇㅇㅇ',
            },
            {
                icon:'',
                attachment:'',
                title:'"리뷰 / 추천사의 핵심을 적어보세요."',
                desc:'여기를 클릭하여 서비스 및 제품에 대한\n리뷰, 추천사를 적어\n잠재 유저에게 서비스 및 제품의 신뢰도를 높여보세요!',
                rating:5,
                writer:'ㅇㅇ회사, 대표 ㅇㅇㅇ',
            },
            {
                icon:'',
                attachment:'',
                title:'"리뷰 / 추천사의 핵심을 적어보세요."',
                desc:'여기를 클릭하여 서비스 및 제품에 대한\n리뷰, 추천사를 적어\n잠재 유저에게 서비스 및 제품의 신뢰도를 높여보세요!',
                rating:5,
                writer:'ㅇㅇ회사, 대표 ㅇㅇㅇ',
            },
        ],
    },
    {
        ...commons,
        name:'자주 묻는 질문',
        sectionTypeName:'QnaSection',
        title:{
            ...commons.title,
            text:'자주 묻는 질문을 적어보세요',
            size:42
        },
        desc:{
            ...commons.desc,
            text:'여기를 클릭하여 자주 묻는 질문과 그 답변을 적어보세요.',
            size:24
        },
        layout: 'card',
        qna:{
            use:true,
            shape: 'close',
            question: '#000000',
            questionSize: 18,
            answer: '#000000',
            answerSize: 18,
        },
        qnas:[
            {
                question:'여기를 클릭하여 자주 묻는 질문을 적어보세요.',
                answer:'여기를 클릭하여 자주 묻는 질문의 답변을 적어보세요.',
            },
            {
                question:'여기를 클릭하여 자주 묻는 질문을 적어보세요.',
                answer:'여기를 클릭하여 자주 묻는 질문의 답변을 적어보세요.',
            },
            {
                question:'여기를 클릭하여 자주 묻는 질문을 적어보세요.',
                answer:'여기를 클릭하여 자주 묻는 질문의 답변을 적어보세요.',
            },
        ],
    },
    {
        ...commons,
        title:{
            ...commons.title,
            text:'글만 쓰고 싶을 때 \'글\' 섹션을 이용해 보세요.',
            size:32,
            align:'start',
        },
        desc:{
            ...commons.desc,
            text:'여기를 클릭하여 글을 적어보세요.',
            align:'start',
        },
        padding:{
            top:15,
            bottom:15,
        },
        responsive:{
            mobile:true,
            pc:true,
        },
        mobile:{
            align:'center',
            layout:3,
            contentSize:50,
        },
        box:{
            use:false,
            backgroundColor:'#6CCAD0',
            borderRadius:5,
            height: 1,
        },
        backgroundImage:{
            attachment:'',
            overlay:false,
        },
        name:'글',
        sectionTypeName:'TextSection',
    },
    {
        ...commons,
        element:element,
        numOfElements: 3,
        name:'갤러리',
        align:'justify',
        sectionTypeName:'GallerySection',
        title:{
            ...commons.title,
            text:'이미지를 강조하고 싶을 때 \'갤러리\'섹션을 이용해 보세요.',
            size:32
        },
        desc:{
            ...commons.desc,
            text:'여기를 클릭하여 이미지에 대해 적어보세요.'
        },
        element:{
            ...element,
            size:300,
        },
        card:{
            use:true,
            color:'#C4C4C4',
            shadow:false,
            borderRadius:0,
        },
        text:{
            use:true,
            color: '#000000',
            align: 'justify'
        },
        elementText:{
            color:'#000000'
        },
        elements:[
            {
                attachment:gal1,
                text:'여기를 클릭하여 이미지에 대한 설명을 적어보세요.',
            },
            {
                attachment:gal2,
                text:'여기를 클릭하여 이미지에 대한 설명을 적어보세요.',
            },
            {
                attachment:gal3,
                text:'여기를 클릭하여 이미지에 대한 설명을 적어보세요.',
            },
            {
                attachment:gal3,
                text:'여기를 클릭하여 이미지에 대한 설명을 적어보세요.',
            },
        ]
    },
    {
        ...commons,
        ...contents,
        contents:{
            use:true,
            type:'video',
            align:'space-between',
        },
        video:{
            ...contents.video,
            use: true,
            type:'base',
        },
        title:{
            ...commons.title,
            text:'동영상을 강조하고 싶을 때 \'동영상\'섹션을 이용해 보세요.',
            size:32
        },
        desc:{
            ...commons.desc,
            text:'좌측 메뉴에서 동영상을 삽입하고, 여기를 클릭하여 동영상에 대해 적어보세요.'
        },
        name:'동영상',
        sectionTypeName:'VideoSection',
        explanation:{
            use:true,
            size: 18,
            color: '#000000',
            align: 'center',
            text:'여기를 클릭하여 동영상에 대한 추가 설명을 적어 보세요.'
        },
    },
    {
        ...commons,
        ...contents,
        name:'목업',
        sectionTypeName:'MockupSection',
        title:{
            ...commons.title,
            text:'실제 서비스나 프로토타입이 있다면 \'목업\'섹션을 이용해보세요.',
            size:32
        },
        desc:{
            ...commons.desc,
            text:'좌측 메뉴에서 목업을 고르고, 여기를 클릭하여 서비스에 대해 적어보세요.'
        },
    },
    // {
    //     ...commons,
    //     padding:{
    //         top:1,
    //         bottom:1,
    //     },
    //     name:'구분선',
    //     sectionTypeName:'LineSection',
    //     title:{
    //         ...commons.title,
    //         text:'섹션을 구분짓기 위한 용도입니다.',
    //         size:32
    //     },
    //     desc:{
    //         ...commons.desc,
    //         text:'좌측 메뉴에서 선 종류를 고르세요. 여기를 클릭하여 서비스에 대해 적어보세요.'
    //     },
    //     line:{
    //         use:true,
    //         type:0,
    //         color:'#000000',
    //     }
    // },
]

export const defaults = {

    navi:{
        appButton:{
            link: "",
            use: true,
        },
        backgroundColor: "#ffffff",
        bottomBorder:{
            color: "#F0F0F0",
            use: false,
        },
        button:{
            align: "end",
            cta:{
                link: "",
                padding: 10,
                text: "CTA버튼",
                use: false,
            },
            ghost:{
                link: "",
                padding: 10,
                text: "고스트 버튼",
                use: false,
            },
            use: false,
        },
        fixed: false,
        height: 80,
        logo:{
            align: "start",
            image:{
                attachment: "",
                use: false,
                width: 60,
            },
            text:{
                color: "#000000",
                fontSize: 32,
                text: "",
                use: true,
            },
            use: true,
        },
        responsive:{
            mobile: true,
            pc: true,
        },
        sectionTemplateNumber: 1,
        sectionTypeName: "상단 바",
        title: "서비스 / 제품 명",
        use: true,
    },
    foot:{
        backgroundColor: "#f9f9f9",
        copyright:{
            color: "#ffffff",
            text: "앱 다운로드",
            use: true,
        },
        icon:{
            align: "justify",
            color: "#6c63ff",
            facebook: "페이스북 연결",
            instagram: "인스타그램",
            kakaotalk: "",
            linkedIn: "",
            notion: "",
            style: "circle",
            twitter: "",
            use: true,
            youtube: "",
        },
        layout: 3,
        padding: 10,
        paddingBottom: 8,
        paddingTop: "5",
        sectionTemplateNmber: 1,
        sectionTypeName: "푸터 바",
        text:{
            align: "start",
            color: "#000000",
            size: 18,
            text: "",
            use: true,
        },
        use: true
    },
    setting : {
        animation: "none",
        color: "#6c63ff",
        cta:{
            backgroundColor: "#6c63ff",
            border: false,
            borderColor: "#000000",
            borderRadius: 5,
            color: "#ffffff",
            padding: 10,
            shadow: true,
        },
        faviconAttachment: "",
        font: "yg-jalnan",
        fta:{
            backgroundColor: "#6c63ff",
            border: false,
            borderColor: "#000000",
            borderRadius: 5,
            color: "#000000",
            link: "",
            shadow: false,
            shape: 0,
            size: 50,
            text: "",
            use: false,
        },
        ghost:{
            backgroundColor: "#ffffff",
            border: true,
            borderColor: "#6c63ff",
            borderRadius: 5,
            color: "#6c63ff",
            padding: 10,
            shadow: false,
        },
        smallFont: "Pretendard-Regular",
        title: "기본템플릿",
        urlId: '',
    },
    feedback:{
        path: '',
        difficulty: '',
        inconvenience: '',
        satisfy: '',
        time: '',
        function: '',
        comment: '',
        recommend: '',
    }
}