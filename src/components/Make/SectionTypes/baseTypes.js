import { TreasureMap } from "@styled-icons/remix-fill"

const commons = {
    backgroundColor:'#ffffff',
    backgroundOpacity:1,
    backgroundType:'color',
    backgroundImage:{
        use:false,
        attachment:'',
    },
    title:{
        use:true,
        text: '노코드 랜딩페이지 제작 툴',
        align: 'start',
        size: 38,
        color: '#000000'
    },
    desc:{
        use:true,
        text: 'Surfee에 오신 것을 환영합니다. 자유롭게 사용해보세요!',
        align: 'start',
        size: 21,
        color: '#000000'
    },
    contents:{
        use: false,
        type: 'image',
    },
    padding:{
        top:15,
        bottom:15,
    },
    animation:{
        use:true,
        type:'none',
    },
    appButton:{
        use: true,
        apple: '',
        google: ''
    }
}

export const base = [
    {
        // 공통적으로 들어갈 확률이 높은 것들
        ...commons,
        name:'메인',
        sectionTypeName:'HeroSection',
        paddingSize:'',
        paddingLeft:'',
        paddingRight:'',
        paddingCustom: false,
        image:{
            oneImg:true,
            type:'image',
            attachment:'',
            width:70,
            border:0,
            size:70,
            slide:false,
            
        },
        slide_img:{
            slide1: '',
            slide2: '',
            slide3: '',
        },
        video:{
            use: false,
            type: 'base',
            file: '',
            youtube: false,
            link: '',
            auto: true,
        },
        mockup: {
            use: false,
            type: 'mobile',
            file: '',
            file2: '',
            size: 200,
        },
        button:{
            use : true,
            ctaText:'CTA 버튼',
            ghostText:'고스트 버튼',
            backgroundColor:'#ffffff',
            buttonTemplate:1,
            func:1,
            link:"https://surfee.co.kr",
            first:true,
            second:false,
            align:'0',
            ctaUse:true,
            ctaOption: 'link',
            ghostOption: 'link',
            ctaLink:'',
            ctaApply: '',
            ghostUseOrLink: true, 
            ghostLink:'',
            ghostApply: '',
            ghostUse:false,
        },
        contents:{
            use:true,
        },
        appDownloadButton:{
            use:true,
        }
    },
    {
        ...commons,
        name:'디테일',
        sectionTypeName:'DetailSection',
        sectionTypeNumber:2,
        templateNumber:1,
        contents:{
            use:true,
        },
        titles:{
            title:'<p>여기서 타이틀을 입력rhrh</p>',
            font:'Pretendard-Regular',
        },
        image:{
            attachment:'',
            width:70,
            shadow: true,
            shadowValue: "2px 4px 20px #E8F0F9"
        },
        button:{
            title:'버튼입니다.',
            backgroundColor:'#ffffff',
            buttonTemplate:1,
            func:1,
            link:"https://surfee.co.kr"
        },
    },
    {
        ...commons,
        name:'CTA',
        sectionTypeName:'CtaSection',
        sectionTypeNumber:9,
        templateNumber:1,
        width:90,
        attachment:'',
        button:{
            title:'버튼입니다.',
            backgroundColor:'#ffffff',
            buttonTemplate:1,
            func:1,
            link:"https://surfee.co.kr",
            first:true,
            use:true,
        },
        backgroundImage:{
            use:false,
            attachment:'',
        },
        appDownloadButton:{
            use:true,
        },
        button:{
            use:true,
        },
        inputs:[],
    },
    {
        ...commons,
        name:'신청',
        sectionTypeName:'ApplySection',
        applyButton:{
            use:true,
        },
        caution:{
            use:true,
        }
    },
    {
        ...commons,
        name:'앱다운로드',
        sectionTypeName:'AppDownloadSection',
        
        caution:{
            use:true,
        },
        appDownloadButton:{
            use:true,
        }
    },
    {
        ...commons,
        name:'특징',
        sectionTypeName:'FeaturesSection',
        align:'start',
        featureImage:{
            use:true,
            borderRaidus:0,
            size:50,
        },
        featureText:{
            use:true,
            titleUse:true,
            descUse:true,
            color:'#000000',
        },
        features:[
            {
                icon:'',
                attachment:'',
                title:'Respect privacy',
                desc:'Set up cookie banners that help you respect your visitor\'s privacy. \n This is especially important for Europe.',
            },
            {
                attachment:'',
                title:'Translate your website',
                desc:'Easily manage your website in multiple languages. \n With this feature you can \n offer your site to everyone.',
            },
            {
                attachment:'',
                title:'Protect your content',
                desc:'Secure your entire website or \n single pages with passwords to protect it from unwanted eyes.',
            },
        ],
    },
    {
        ...commons,
        name:'리뷰/추천',
        sectionTypeName:'ReviewSection',
        sectionTypeNumber:3,
        templateNumber:1,
        numOfReviews:3,
        ratingColor:'red',
        image:{
            use:true,
        },
        rating:{
            use:true,
        },
        writer:{
            use:true,
        },
        reviewText:{
            use:true,
        },
        reviews:[
            {
                title:'1의 타이틀',
                desc:'전에 어떤 분이 저희 웹사이트 디자이너 고용해서 만들었냐고 물어보시더라구요.(웃음) 우리가 필요한 기능들을 커스터마이징 할 수 있는 아임웹 디자인 모드가 정말 좋았어요. 해외 브랜드 사이트 같은 느낌도 많이 들고요.',
                rating:4.8,
                writer:'NOT OURS, 신하나 마케터 인터뷰',
            },
            {
                title:'2의 타이틀',
                desc:'기술과 전자제품을 개발하는 회사답게 신뢰감가고 정돈된 모습을 보여주고자 했어요. 배경과 폰트 등 톤앤매너를 디테일한 부분가지 클릭 한번으로 원하는 디자인을 구현할 수 있어 좋았던 것 같아요.',
                rating:5,
                writer:'duit, 아혜진 브랜드 매니저 인터뷰',
            },
            {
                title:'3의 타이틀',
                desc:'실제로 주변에 아임웹을 많이 소개했는데요. 요즘에는 누구나 개인 홈페이지를 만들고 싶어하는 것 같아요. 블로그나 텀블러 등의 소셜 프로그램은 완벽한 웹사이트가 될 순 없고 결국 차별화된 나만의 웹사이트를 원하게 되죠.',
                rating:4.6,
                writer:'Achim, 윤진 대표 인터뷰',
            },
        ],
    },
    {
        ...commons,
        name:'자주 묻는 질문',
        sectionTypeName:'QnaSection',
        qna:{
            use:true,
        },
        qnas:[
            {
                question:'1의 타이틀',
                answer:'리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.',
            },
            {
                question:'2의 타이틀',
                answer:'2의 부가설명',
            },
            {
                question:'3의 타이틀',
                answer:'3의 부가설명',
            },
        ],
    },
    {
        ...commons,
        name:'글',
        sectionTypeName:'TextSection',
    },
    {
        ...commons,
        name:'갤러리',
        sectionTypeName:'GallerySection',
        image:{
            use:true,
        },
        card:{
            use:true,
        },
        text:{
            use:true,
        },
    },
    {
        ...commons,
        name:'동영상',
        sectionTypeName:'VideoSection',
        video:{
            use:true,
        },
        explanation:{
            use:true,
        }
    },
    {
        ...commons,
        name:'목업',
        sectionTypeName:'MockupSection',
    },
]

export const defaults = {
    navi:{
        sectionTypeName:'상단 바',
        sectionTemplateNumber:1,
        height:60,
        use:true,
        title:'Surfee',
        logoUse:true,
        logoAlign:'left',
        logoImage:{
            use:false,
            attachment:'',
            width:20,
        },
        logoText:{
            use:false,
            text:'',
            fontSize:12,
            color:'#000000'
        },
        fixed:false,
        backgroundColor:'#ffffff', 
        bottomBorder:{
            use:false,
            color:'#F0F0F0',
        },
        button:{
            use:true,
            align:'left',
            cta:{
                use:true,
                link:''
            },
            ghost:{
                use:true,
                link:''
            },
        },
        appButton:{
            use:true,
            link:'',
        }
    },
    foot:{
        sectionTypeName:'푸터 바',
        sectionTemplateNumber:1,
        use:true,
        layout:1,
        backgroundColor:'#ffffff', 
        text:"copyright 2022",
        padding:10,
        text:{
            use:true,
            text:'',
            color:'#ffffff',
        },
        icon:{
            use:true,
            style:'circle',
            color:'#ffffff',
            align:'start',
            icons:[
                
            ],
        },
        copyright:{
            use:true,
            text:'',
            color:'#ffffff',
        },
        second:{
            text:'<p>두번 째 단입니다.</p>'
        }
    },
    setting:{
        urlId:'',
        title:'Surfee : 노코드 랜딩페이지 제작 툴',
        faviconAttachment:'',
        font:'Noto Sans KR',
        smallFont:'Noto Sans KR',
        color:'#63B3F7',
        fta:{
            width:50,
            borderRadius:5,
            use:false,
            backgroundColor:'#ffffff',
            text:'fta 버튼',
            link:'',
        },
        cta:{
            borderRadius:5,
            backgroundColor:'#ffffff',
            color:'#000000',
            shadow:true,
            borderColor:'#000000',
            border:false,
        },
        ghost:{
            borderRadius:5,
            backgroundColor:'#ffffff',
            color:'#000000',
            shadow:true,
            borderColor:'#000000',
            border:false,
        },
        animation:{
            use:true,
            type:'none',
        }
    }
}