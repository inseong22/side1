import React, {useState, useEffect} from 'react'
import './utils/CustomerPage.css'
import '../NavBar/utils/NavBarV2.css'
import NavBarV2 from '../NavBar/NavBarV2';
import Footer from '../NavBar/Footer';

function QuestionsPage() {
    const [cnum, setCnum] = useState(1);
    const [cnums, setCnums] = useState([1,2,3]);
    const [scrollPosition, setScrollPosition] = useState(0);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }

    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);
    });

    const tabsTable = cnums.map((item, index) => {
        let fw = '500';
        let bb = '0px';
        let fb = 'gray';
        if(cnum == item){
            fw = '700'; 
            bb = '2px solid black';
            fb = 'black';
        }

        switch(item){
            case 1:
                return(
                   <span className="tab-one" index={index} style={{color:`${fb}`, fontWeight:`${fw}`, borderBottom:`${bb}`}} onClick={e => setCnum(item)}>자주묻는질문(FAQ)</span>
                )
            case 2:
                return(
                    <span className="tab-one" index={index} style={{color:`${fb}`, fontWeight:`${fw}`, borderBottom:`${bb}`}} onClick={e => setCnum(item)}>이용약관</span>
                )

            case 3:
                return(
                    <span className="tab-one" index={index} style={{color:`${fb}`, fontWeight:`${fw}`, borderBottom:`${bb}`}} onClick={e => setCnum(item)}>개인정보처리방침</span>
                )

        }
    })

    const contentTable = () => {
        switch(cnum){
            case 1:
                return(
                    <div>
                        <div className="q-content-ask">
                            랜딩페이지 제작 비용은 얼마인가요?
                        </div>
                        <div className="q-content-answer">
                            0원 입니다! 현재 Surfee의 랜딩페이지 제작 툴 서비스는 MVP 버전으로, beta 기간 동안의 Surfee가 제공하는 서비스는 모두 무료로 제공됩니다.
                        </div>
                        <div className="q-content-ask">
                            제작한 랜딩페이지의 유효기간은 얼마인가요?
                        </div>
                        <div className="q-content-answer">
                            beta기간 동안 제공되는 랜딩페이지 제작 툴을 통해 무료로 제작한 랜딩페이지의 경우 2주의 유효기간이 주어지고, 2주 후 희망 여부에 따라 연장하실 수 있습니다! 
                        </div>
                        <div className="q-content-ask">
                            도메인을 변경할 수 있나요?
                        </div>
                        <div className="q-content-answer">
                            네 가능합니다! 따로 도메인을 소유하고 계신다면, 제작하신 랜딩페이지와 도메인을 연결할 수 있습니다!
                        </div>
                        <div className="q-content-ask">
                            유효기간이 끝나면 랜딩페이지 정보는 모두 삭제되나요?
                        </div>
                        <div className="q-content-answer">
                            유효기간 종료일로부터 최대 1주 동안 랜딩페이지 정보가 유지됩니다. 개인 정보 보호를 위해, 서비스 이용기한 종료일이 1주일 이상 지난 모든 유저 정보는 삭제합니다.
                        </div>
                        <div className="q-content-ask">
                            랜딩페이지 제작 기간은 어느정도 걸리나요?
                        </div>
                        <div className="q-content-answer">
                            Surfee는 유저가 코딩 없이 직접 ‘타이핑’과 ‘이미지’만으로 랜딩페이지를 제작할 수 있도록 하는 것을 지향합니다! 그러나 현재 Surfee의 MVP로 이루어지는 beta 버전에서의 랜딩페이지 제작은 12시간 이내에 유저의 메일을 통해 제작하신 ‘랜딩페이지 링크’가 전달됩니다. 빠르게 프로덕트를 발전시켜 더 나은 서비스를 제공드릴 수 있도록 노력하겠습니다!
                        </div>
                    </div>
                )
            case 2:
                return(
                    <div>
                        <div className="q-content-ask">
                        제1 조 (목적) 
                        </div>
                        <div className="q-content-answer">
                        이 약관은 "Surfee"가 제공하는 유료서비스의 이용과 관련하여 회사("Surfee")와 회원과의 권리, 의무 및 책임사항 기타 필요한 사항을 규정함을 목적으로 합니다. 
                        </div>
                        <div className="q-content-ask">
                        제2 조 (약관의 게시 및 변경) 
                        </div>
                        <div className="q-content-answer">
                        ①본 약관의 내용은 회사 홈페이지 또는 개별 서비스의 화면에 게시하거나 기타의 방법으로 공지하고, 본 약관에 동의한 여러분 모두에게 그 효력이 발생합니다. 
                        <br/>②회사는 필요한 경우 관련법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 본 약관이 변경되는 경우 회사는 변경사항을 시행일자 15일 전부터 여러분에게 서비스 공지사항에서 공지 또는 통지하는 것을 원칙으로 하며, 피치 못하게 여러분에게 불리한 내용으로 변경할 경우에는 그 시행일자 30일 전부터 이메일 주소로 이메일 발송 방법으로 개별적으로 알려 드리겠습니다. 
                        <br/>③회사가 전항에 따라 공지 또는 통지를 하면서 공지 또는 통지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 여러분의 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로 봅니다. 여러분이 개정약관에 동의하지 않을 경우 여러분은 이용계약을 해지할 수 있습니다. 
                        </div>
                        <div className="q-content-ask">
 제3 조 (약관의 해석) 
                        </div>
                        <div className="q-content-answer">
                        이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 ‘콘텐츠진흥법’, ‘전자상거래등에서의소비자보호에관한법률’, ‘약관의규제에관한법률’, 문화체육관광부장관이 정하는 ‘콘텐츠이용자보호지침’, 기타 관계법령, 상관례에 따릅니다. 
                        </div>
                        <div className="q-content-ask">
 제4 조 (용어의 정의) 
                        </div>
                        <div className="q-content-answer">
                        본 약관에서 사용하는 용어의 정의는 다음과 같습니다. 
                        <br/>1. "Surfee" 서비스: "Surfee"와 계약 후에 사용할 수 있는 일체의 기능들을 말합니다. 예를 들어 랜딩페이지 제작이 "Surfee" 서비스를 이루는 요소 중 하나 입니다. 
                        <br/>2. "Surfee" 관리자 페이지: "Surfee" 서비스를 사용 및 관리하기 위해 접속하는 페이지를 의미합니다. https://Surfee.co.kr 에서 확인할 수 있습니다. 
                        <br/>3. "Surfee" 구독: "Surfee" 서비스를 정해진 기간 동안 사용할 수 있도록 "Surfee"와 체결하는 계약을 의미합니다.
                        </div>
                        <div className="q-content-ask">
 제5 조 (계약의 성립)
                        </div>
                        <div className="q-content-answer">
                        "Surfee" 서비스는 기본적으로 랜딩페이지 제작과 1주일 간의 사용 기간을 제공합니다. 이후 추가적인 서비스 사용 기간에 대해서는 1일 단위로 비용이 추가됩니다. 사용 기간 중, "Surfee" 서비스를 구독하기 위해서 본 약관에 동의하고 구독 정기 결제에 필요한 일체의 정보를 입력함으로써 계약이 성립됩니다. "Surfee" 서비스의 환불 금액은 사용 기간에 비례해서 결정합니다. 만약 원치 않은 결제가 발생했을 시 서비스 관리자에게 문의해 주시기 바랍니다. 유저가 사용 중인 "Surfee" 서비스와 관련된 일체 정보들, 즉 랜딩페이지와 그 랜딩페이지와 관련된 모든 설정들은 구독이 종료된 후 1주일 뒤 일괄적으로 삭제됩니다. 
                        </div>
                        <div className="q-content-ask">
 제6 조 (유료서비스의 중단 및 변경)
                        </div>
                        <div className="q-content-answer">
                        ① 회사는 사업 종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 회사는 이 약관에서 정한 방법으로 회원에게 통지하고 당초 회사에서 제시한 조건 또는 ‘콘텐츠이용자보호지침’ 및 관련 법령 규정에서 정한 바에 따라 회원에게 보상합니다. 
                        <br/>② 회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부의 서비스를 변경할 수 있고, 변경 전 해당 서비스 초기 화면에 관련 사항을 게시합니다. 다만, 변경된 내용이 중대하거나 회원에게 불리한 경우에는 이 약관에서 정한 방법으로 통지하고, 중대하거나 회원에게 불리한 변경 내용에 동의하지 않는 회원은 하기에서 정한 바에 따라 서비스 이용계약을 해지할 수 있습니다.
                        </div>
                        <div className="q-content-ask">
 제7 조 (회원의 청약철회 및 계약해지)
                        </div>
                        <div className="q-content-answer">
                        회원은 본 약관에 동의 및 결 제수단을 추가하는 방식으로 계약을 맺은 뒤 아래와 같은 방식으로 계약을 해지할 수 있습니다. 
                        <br/>① 결제수단을 제거함으로써 구독을 연장하지 않을 수 있습니다. 
                        <br/>② "Surfee" 서비스에 추가한 모든 랜딩페이지와 그 랜딩페이지와 관련된 모든 정보를 제거함으로써 "Surfee" 서비스 사용에 대한 금액을 지불하지 않습니다. 
                        <br/>③ 관리자와 협의 후에 자신의 계정과 "Surfee"에게 제공한 개인정보를 모두 제거합니다. 
                        </div>
                        <div className="q-content-ask">
 제8 조 (회사의 계약해제, 해지 및 이용제한)
                        </div>
                        <div className="q-content-answer">
                        ① 회사는 회원이 이용약관에서 정한 금지행위를 하였을 경우 해당 조항에 따라 사전통지 없이 계약을 해제, 해지하거나 또는 기간을 정하여 서비스이용을 제한할 수 있습니다. 
                        <br/>② 제1항의 사유로 환불이 필요할 경우 회사는 환불합니다.
                        </div>
                        <div className="q-content-ask">
 제9 조 (구독기간 등)
                        </div>
                        <div className="q-content-answer">
                        구독은 계약이 성립일 기준으로 1주 동안 제공됩니다. 
                        <br/>예- 12월 1일 12시에 계약 성립 시 12월 8일 12시까지 서비스가 제공됩니다. 서비스 사용 기간이 만료되면 등록된 결제정보로 자동으로 결제가 이루어지고 사용 기간이 갱신됩니다. 계약 해지를 위하여 유저는
                        <br/>제7조를 참고하여 필요한 작업을 해야할 의무가 있으며 이를 지키지 않아 연장된 구독에 대해서 "Surfee"는 법적 책임을 지지 않습니다.
                        </div>
                        <div className="q-content-ask">
 제10 조 (유료서비스 하자 등에 의한 회원피해보상)
                        </div>
                        <div className="q-content-answer">
                        회사는 서비스의 하자 등에 의한 회원의 피해보상 기준, 범위, 방법 및 절차에 관한 사항을 ‘콘텐츠이용자보호지침’에 따라 처리합니다.
                        </div>
                        <div className="q-content-ask">
 제11 조 (책임 제한)
                        </div>
                        <div className="q-content-answer">
                        ① 회사는 관계법령의 변경, 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다. 
                        <br/>②회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 회사의 귀책사유가 없는 한 책임을 지지 않습니다. 
                        <br/>③회사는 회원 상호간 또는 회원과 제3자간에 서비스를 매개로 하여 발생한 분쟁 등에 대하여 회사의 귀책사유가 없는 한 책임을 지지 않습니다.
                        </div>
                    </div>
                )
            case 3:
                return(
                    <div>
                            ('https://www.surfee.co.kr'이하 '"Surfee"')은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다. 
                            <br/><br/>
                            ('"Surfee"') 은(는) 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다. 
                            <br/><br/>
                            ○ 본 방침은부터 2021년 12월 1일부터 시행됩니다. <br/><br/>
                            1. 개인정보의 처리 목적 ('https://www.surfee.co.kr'이하 '"Surfee"')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다. 
                            <br/><br/>
                            가. 홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지 등을 목적으로 개인정보를 처리합니다. 
                            <br/><br/>
                            나. 재화 또는 서비스 제공 서비스 제공, 본인인증, 요금결제·정산 등을 목적으로 개인정보를 처리합니다. 
                            <br/><br/>
                            다. 마케팅 및 광고에의 활용 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다. 
                            <br/><br/>
                            1. 개인정보 파일 현황 
                            <br/><br/>
                            2. 개인정보의 처리 및 보유 기간
                            <br/><br/>
                            ① ('"Surfee"')은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유,이용기간 내에서 개인정보를 처리,보유합니다.
                            <br/><br/>
                            ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다. 
                            <br/><br/>
                            1.홈페이지 회원가입 및 관리 홈페이지 회원가입 및 관리와 관련한 개인정보는 수집.이용에 관한 동의일로부터 지체없이 파기까지 위 이용목적을 위하여 보유.이용됩니다. 
                            <br/><br/>
                            관련법령 : <br/><br/>
                            
                            1)신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년<br/><br/>
                            
                            2) 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년<br/><br/>
                            
                            3) 대금결제 및 재화 등의 공급에 관한 기록 : 5년<br/><br/>
                            
                            4) 계약 또는 청약철회 등에 관한 기록 : 5년 <br/><br/>
                            
                            1. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다. <br/><br/>
                            
                            ① 정보주체는 "Surfee"에 대해 언제든지 개인정보 열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다. <br/><br/>
                            <br/><br/>
                            ② 제1항에 따른 권리 행사는 "Surfee"에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 "Surfee"은(는) 이에 대해 지체 없이 조치하겠습니다. 
                            <br/><br/>③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다. 
                            <br/><br/>④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다. 
                            <br/><br/>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다. 
                            <br/><br/>⑥ "Surfee"은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다. 
                            
                            <br/><br/>1. 처리하는 개인정보의 항목 작성① ('https://www.surfee.co.kr'이하 '"Surfee"')은(는) 다음의 개인정보 항목을 처리하고 있습니다. 
                            <br/><br/>1 홈페이지 회원가입 및 관리 필수항목 : 이메일, 비밀번호, 서비스 이용 기록, 접속 로그, 접속 IP 정보, 결제기록 
                            <br/><br/>1. 개인정보의 파기('"Surfee"')은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다. 파기절차이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다. 파기기한 이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다. 파기방법 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다 
                            
                            <br/><br/>1. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항 "Surfee" 은 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키’를 사용하지 않습니다. 
                            
                            <br/><br/>1. 개인정보 보호책임자 작성 ① "Surfee"(‘https://www.surfee.co.kr’이하 ‘"Surfee") 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다. 
                            <br/><br/>개인정보 보호책임자 성명 :김호진 직책 :대표 직급 :대표 연락처 :010-4690-5086, support.surfee@gmail.com 
                            <br/><br/>② 정보주체께서는 "Surfee"(‘https://www.surfee.co.kr’이하 ‘"Surfee") 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. "Surfee"(‘https://www.surfee.co.kr’이하 ‘"Surfee") 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다. 
                            <br/><br/>1. 개인정보 처리방침 변경 ①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                    </div>
                )
        }
    }

    return (
        <>
        <div className="questionspage-container">
            <NavBarV2 />
            <div className="q-inner">
                <div className="q-info-top">
                    <div className="q-title-top" style={{fontWeight: 'bold'}}>
                        Surfee에 관심을 가져주셔서 감사합니다.
                    </div>
                    <div className="q-title-top" style={{marginTop:'3%'}}>
                        안녕하세요!<br/>
                        무엇을 도와드릴까요?
                    </div>
                    <div>
                        <span className="q-button">
                            직접 문의하기
                        </span>
                    </div>
                </div>
                <div className="quetions-content-bottom">
                    <div className="q-tabs">
                        {tabsTable}
                    </div>
                    <div className="q-content">
                        <div className="q-one-content">
                        {contentTable()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default QuestionsPage
