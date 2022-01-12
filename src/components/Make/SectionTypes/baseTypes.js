export const base = [
    {
        // 공통적으로 들어갈 확률이 높은 것들
        sectionTypeName:'HeroSection',
        sectionTypeNumber:1,
        templateNumber:1,
        paddingSize:0,
        backgroundColor:'white',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        animation:{
            use:false,
            type:0,
        },
        // 특정 섹션에 해당할 확률이 높은 것들
        titles:{
            title:'<p>여기서 타이틀을 입력rhrh</p>',
            font:'Pretendard-Regular',
        },
        image:{
            type:'image',
            attachment:'',
            width:70,
            border:0,
            size:150,
        },
        button:{
            title:'버튼입니다.',
            backgroundColor:'rgba(255,255,255,1)',
            buttonTemplate:1,
            func:1,
            link:"https://surfee.co.kr",
            first:true,
            second:false,
        },
    },
    {
        sectionTypeName:'DetailSection',
        sectionTypeNumber:2,
        templateNumber:1,
        backgroundColor:'white',
        backgroundOpacity:1,
        titles:{
            title:'<p>여기서 타이틀을 입력rhrh</p>',
            font:'Pretendard-Regular',
        },
        design:{

        },
        image:{
            attachment:'',
            width:70,
        },
        animation:{
            use:false,
            type:0,
        },
        button:{
            title:'버튼입니다.',
            backgroundColor:'rgba(255,255,255,1)',
            buttonTemplate:1,
            func:1,
            link:"https://surfee.co.kr"
        },
        backgroundImage:{
            use:false,
            attachment:'',
        }
    },
    {
        sectionTypeName:'ReviewSection',
        sectionTypeNumber:3,
        templateNumber:1,
        numOfFeatures:3,
        title:"Surfee의 자랑",
        backgroundColor:'white',
        backgroundOpacity:1,
        features:[
            {
                title:'1의 타이틀',
                desc:'1의 부가설명'
            },
            {
                title:'2의 타이틀',
                desc:'2의 부가설명'
            },
            {
                title:'3의 타이틀',
                desc:'3의 부가설명'
            },
        ],
        backgroundImage:{
            use:false,
            attachment:'',
        }
    },
    {
        sectionTypeName:'FeaturesSection',
        sectionTypeNumber:4,
        templateNumber:1,
        backgroundColor:'white',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        }
    },
    {
        sectionTypeName:'PriceSection',
        sectionTypeNumber:8,
        templateNumber:1,
        width:90,
        backgroundColor:'white',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        }
    },
    {
        sectionTypeName:'CtaSection',
        sectionTypeNumber:9,
        templateNumber:1,
        width:90,
        backgroundColor:'white',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        }
    },
    {
        sectionTypeName:'ETCetraSection',
        sectionTypeNumber:10,
        templateNumber:1,
        backgroundColor:'white',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        etcSections:[
            {
                sectionTypeName:'EmptySection',
                sectionTypeNumber:7,
                templateNumber:1,
            },
            {
                sectionTypeName:'HorizontalSection',
                sectionTypeNumber:8,
                templateNumber:1,
                width:90,
            },
            {
                sectionTypeName:'TextSection',
            },
            {
                sectionTypeName:'ImageSection',
            }
        ]
    }
]