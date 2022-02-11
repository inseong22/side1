const commons = {
    layout: 1,
    backgroundColor:'#ffffff',
    backgroundType:'color',
    backgroundImage:{
        use:false,
        attachment:'',
        overlay:false,
    },
    title:{
        use:true,
        text: '노코드 랜딩페이지 제작 툴',
        align: 'left',
        size: 32,
        color: '#000000'
    },
    desc:{
        use:true,
        text: 'Surfee에 오신 것을 환영합니다. 자유롭게 사용해보세요!',
        align: 'left',
        size: 16,
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
    box:{
        use:false,
        backgroundColor:'#6CCAD0',
        borderRadius:5,
    }
}

const contents = {
    image:{
        oneImg:true,
        type:'image',
        attachment:'',
        width:70,
        border:0,
        size:200,
        slide:false,
        
    },
    slide_img:{
        slide1: '',
        slide2: '',
        slide3: '',
    },
    video:{
        use: false,
        youtube: false,
        type: 'base',
        file: '',
        link: '',
        auto: true,
    },
    mockup: {
        use: false,
        type: 'mobile',
        // mobile, tablet, desktop, mobile2, desk+mob 있음
        file: '',
        file2: '',
    },
}

const element = {
    use:true,
    type:'image',
    backgroundColor:'#6CCAD0',
    borderRaidus:5,
    size:50,
}

export const base = [
    {
        // 공통적으로 들어갈 확률이 높은 것들
        ...commons,
        ...contents,
        name:'메인',
        sectionTypeName:'HeroSection',
        paddingSize:'',
        paddingLeft:'',
        paddingRight:'',
        paddingCustom: false,
        layout:1,
        button:{
            use : true,
            ctaText:'CTA 버튼',
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
        },
        appButton:{
            use: true,
            apple: '',
            google: ''
        },
        ctaApplyInputs: [],
        ghostApplyInputs: [],
    },
    {
        ...commons,
        ...contents,
        name:'디테일',
        sectionTypeName:'DetailSection',
        paddingSize:'',
        paddingLeft:'',
        paddingRight:'',
        paddingCustom: false,
        layout:1,
    },
    {
        ...commons,
        ...contents,
        name:'CTA',
        sectionTypeName:'CtaSection',
        button:{
            use : true,
            ctaText:'CTA 버튼',
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
        },
        appButton:{
            use: true,
            apple: '',
            google: ''
        },
        ctaApplyInputs: [],
        ghostApplyInputs: [],
    },
    {
        ...commons,
        name:'신청',
        sectionTypeName:'ApplySection',
        applyButton:{
            use:true,
            inputs:[],
        },
        caution:{
            use:true,
            color: '#000000',
            align: '',
            size: 10,
        }
    },
    {
        ...commons,
        name:'앱다운로드',
        sectionTypeName:'AppDownloadSection',    
        caution:{
            use:true,
            color: '#000000',
            align: '',
            size: 10,
        },
    },
    {
        ...commons,
        element:element,
        name:'특징',
        sectionTypeName:'FeaturesSection',
        align:'start',
        featureText:{
            use:true,
            titleUse:true,
            descUse:true,
            color:'#000000',
        },
        elements:[
            {
                icon:'',
                attachment:'',
                title:'Respect privacy',
                desc:'Set up cookie banners that help you respect your visitor\'s privacy. \n This is especially important for Europe.',
            },
            {
                icon:'',
                attachment:'',
                title:'Translate your website',
                desc:'Easily manage your website in multiple languages. \n With this feature you can \n offer your site to everyone.',
            },
            {
                icon:'',
                attachment:'',
                title:'Protect your content',
                desc:'Secure your entire website or \n single pages with passwords to protect it from unwanted eyes.',
            },
        ],
    },
    {
        ...commons,
        element:element,
        name:'리뷰/추천',
        sectionTypeName:'ReviewSection',
        align:'start',
        numOfReviews:3,
        ratingColor:'red',
        rating:{
            use:true,
            color: '#ffd23a',
            size: 15,
        },
        writer:{
            use:true,
            color: '#000000',
        },
        reviewText:{
            use:true,
            color:'#000000',
        },
        elements:[
            {
                icon:'',
                attachment:'',
                title:'1의 타이틀',
                desc:'전에 어떤 분이 저희 웹사이트 디자이너 고용해서 만들었냐고 물어보시더라구요.(웃음) 우리가 필요한 기능들을 커스터마이징 할 수 있는 아임웹 디자인 모드가 정말 좋았어요. 해외 브랜드 사이트 같은 느낌도 많이 들고요.',
                rating:4.8,
                writer:'NOT OURS, 신하나 마케터 인터뷰',
            },
            {
                icon:'',
                attachment:'',
                title:'2의 타이틀',
                desc:'기술과 전자제품을 개발하는 회사답게 신뢰감가고 정돈된 모습을 보여주고자 했어요. 배경과 폰트 등 톤앤매너를 디테일한 부분까지 클릭 한번으로 원하는 디자인을 구현할 수 있어 좋았던 것 같아요.',
                rating:5,
                writer:'duit, 아혜진 브랜드 매니저 인터뷰',
            },
            {
                icon:'',
                attachment:'',
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
        layout: 'card',
        qna:{
            use:true,
            shape: 'close',
            question: '#000000',
            answer: '#000000',
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
        element:element,
        name:'갤러리',
        sectionTypeName:'GallerySection',
        galleryImg:{
            use:true,
            border:0,
            size:30,
        },
        card:{
            use:true,
        },
        text:{
            use:true,
            color: '#000000',
            align: ''
        },
        elements:[
            {
                attachment:'',
                text:'1의 타이틀',
            },
            {
                attachment:'',
                text:'2의 타이틀',
            },
            {
                attachment:'',
                text:'3의 타이틀',
            }
        ]
    },
    {
        ...commons,
        ...contents,
        contents:{
            use:true,
            type:'video',
        },
        video:{
            ...contents.video,
            type:'base',
        },
        name:'동영상',
        sectionTypeName:'VideoSection',
        explanation:{
            use:true,
            color: '#000000',
            align: '',
            text:'비디오에 대한 추가 설명을 작성해보세요.'
        },
    },
    {
        ...commons,
        ...contents,

        name:'목업',
        sectionTypeName:'MockupSection',
    },
]

export const defaults = {
    navi:{
        sectionTypeName:'상단 바',
        sectionTemplateNumber:1,
        height:80,
        use:true,
        title:'Surfee',
        logo:{
            use:true,
            align:'start',
            image:{
                use:false,
                attachment:'',
                width:60,
            },
            text:{
                use:false,
                text:'',
                fontSize:12,
                color:'#000000'
            },
        },
        fixed:false,
        backgroundColor:'#ffffff', 
        bottomBorder:{
            use:false,
            color:'#F0F0F0',
        },
        button:{
            use:true,
            align:'end',
            cta:{
                use:true,
                text:'CTA버튼',
                link:''
            },
            ghost:{
                use:true,
                text:'고스트 버튼',
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