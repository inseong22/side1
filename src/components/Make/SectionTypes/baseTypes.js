// 모든 섹션에 공통적으로 들어가야 하는 것들
// 
// name:'메인',
// sectionTypeName:'HeroSection',
// backgroundColor:'#ffffff',
// backgroundImage:{
//     use:false,
//     attachment:'',
// },
// title:{
//     text: '',
//     align: '',
//     size: 10,
//     color: '#000000'
// },
// desc:{
//     text: '',
//     align: '',
//     size: 10,
//     color: '#000000'
// },

export const base = [
    {
        // 공통적으로 들어갈 확률이 높은 것들
        name:'메인',
        sectionTypeName:'HeroSection',
        sectionTypeNumber:1,
        templateNumber:1,
        paddingSize:'',
        paddingLeft:'',
        paddingRight:'',
        paddingCustom: false,
        backgroundType:'color',
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        animation:{
            use: true,
            type:'none',
        },
        // 특정 섹션에 해당할 확률이 높은 것들
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
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
            type: 'base',
            file: '',
            youtube: false,
            link: '',
            auto: true
        },
        button:{
            title:'버튼입니다.',
            backgroundColor:'#ffffff',
            buttonTemplate:1,
            func:1,
            link:"https://surfee.co.kr",
            first:true,
            second:false,
            align:'0',
            ctaUse:true,
            ghostUse:false,
        },
    },
    {
        name:'디테일',
        sectionTypeName:'DetailSection',
        sectionTypeNumber:2,
        templateNumber:1,
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        titles:{
            title:'<p>여기서 타이틀을 입력rhrh</p>',
            font:'Pretendard-Regular',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        image:{
            attachment:'',
            width:70,
            shadow: true,
            shadowValue: "2px 4px 20px #E8F0F9"
        },
        animation:{
            use:true,
            type:'none',
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
        name:'CTA',
        sectionTypeName:'CtaSection',
        sectionTypeNumber:9,
        templateNumber:1,
        width:90,
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        title:'One Landing Page 제작 툴, 가장 먼저 이용해보세요.',
        desc:'사전 신청하신 분들에겐 오픈 시 사용가능한 일주일 무료 이용권을 드립니다.',
        attachment:'',
        button:{
            title:'버튼입니다.',
            backgroundColor:'#ffffff',
            buttonTemplate:1,
            func:1,
            link:"https://surfee.co.kr",
            first:true,
        },
        backgroundImage:{
            use:false,
            attachment:'',
        },
        animation:{
            use:true,
            type:'none',
        },
    },
    {
        name:'신청',
        sectionTypeName:'ApplySection',
        backgroundColor:'#ffffff',
        backgroundImage:{
            use:false,
            attachment:'',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
    },
    {
        name:'앱다운로드',
        sectionTypeName:'AppDownloadSection',
        backgroundColor:'#ffffff',
        backgroundImage:{
            use:false,
            attachment:'',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
    },
    {
        name:'특징',
        sectionTypeName:'FeaturesSection',
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundType:'color',
        backgroundImage:{
            use:false,
            attachment:'',
        },
        align:'start',
        title:{
            use:true,
            text: '제목',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            use:true,
            text: '본문',
            align: '',
            size: 10,
            color: '#000000'
        },
        padding:{
            top:10,
            bottom:10,
        },
        featureImage:{
            use:true,
        },
        featureDesc:{
            use:true,
        },
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
        },
        animation:{
            use:true,
            type:'none',
        },
    },
    {
        name:'리뷰/추천',
        sectionTypeName:'ReviewSection',
        sectionTypeNumber:3,
        templateNumber:1,
        numOfReviews:3,
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
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
        animation:{
            use:true,
            type:'none',
        },
    },
    {
        name:'자주 묻는 질문',
        sectionTypeName:'QnaSection',
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        animation:{
            use:true,
            type:'none',
        },
    },
    {
        name:'글',
        sectionTypeName:'TextSection',
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
    },
    {
        name:'갤러리',
        sectionTypeName:'GallerySection',
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
    },
    {
        name:'동영상',
        sectionTypeName:'VideoSection',
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
    },
    {
        name:'목업',
        sectionTypeName:'MockupSection',
        backgroundColor:'#ffffff',
        backgroundOpacity:1,
        backgroundImage:{
            use:false,
            attachment:'',
        },
        title:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
        desc:{
            text: '',
            align: '',
            size: 10,
            color: '#000000'
        },
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
        faviconAttachment:'',
        font:'',
        smallFont:'',
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