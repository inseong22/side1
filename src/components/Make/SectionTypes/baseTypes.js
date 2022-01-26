export const base = [
    {
        // 공통적으로 들어갈 확률이 높은 것들
        sectionTypeName:'HeroSection',
        sectionTypeNumber:1,
        templateNumber:1,
        paddingSize:'',
        paddingLeft:'',
        paddingRight:'',
        paddingCustom: false,
        backgroundType:'color',
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
        title:{
            text: '',
            align: '',
            size: 10
        },
        desc:{
            text: '',
            align: '',
            size: 10
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
        ratingColor:'red',
        reviews:[
            {
                title:'1의 타이틀',
                desc:'리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.',
                rating:5,
                writer:'김호진',
            },
            {
                title:'2의 타이틀',
                desc:'2의 부가설명',
                rating:5,
                writer:'백인성',
            },
            {
                title:'3의 타이틀',
                desc:'3의 부가설명',
                rating:5,
                writer:'이유진',
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
        align:'start',
        features:[
            {
                icon:'',
                attachment:'',
                title:'1의 타이틀',
                desc:'리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.',
            },
            {
                attachment:'',
                title:'1의 타이틀',
                desc:'리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.',
            },
            {
                attachment:'',
                title:'1의 타이틀',
                desc:'리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.리뷰를 쓰는 창입니다.',
            },
        ],
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
        title:'One Landing Page 제작 툴, 가장 먼저 이용해보세요.',
        desc:'사전 신청하신 분들에겐 오픈 시 사용가능한 일주일 무료 이용권을 드립니다.',
        attachment:'',
        button:{
            title:'버튼입니다.',
            backgroundColor:'rgba(255,255,255,1)',
            buttonTemplate:1,
            func:1,
            link:"https://surfee.co.kr",
            first:true,
        },
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