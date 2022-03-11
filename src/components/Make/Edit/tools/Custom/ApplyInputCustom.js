import React, {useState} from 'react'
import './ApplyInputCustom.css'

function ApplyInputCustom({func, disabled, made, value}) {
    const [addInput, setAddInput] = useState('');

    if(made){
        return (
            <div className="centera" style={{justifyContent:'start', marginTop:'12px', width:'95%'}}>
                <div className="maked">
                    {value}
                </div>
                <div className="content__button cb-delete" style={{zIndex:4, marginLeft:'-65px'}} onClick={() => {
                    func()
                }}>
                    삭제
                </div>
            </div>
        )
    }else if (disabled){
        return (
            <div className="centera" style={{justifyContent:'start', marginTop:'12px', width:'95%'}}>
                <input style={{border:'1px solid var(--main-gray)'}} className="apply-input" disabled type='text' placeholder="입력하신 정보는 플레이스 홀더로 적용됩니다.">
                </input>
                <input type="button" value="생성" style={{backgroundColor:'#C4CACF', color:'white'}} />
            </div>
        )
    }else{
        return (
                <div className="centera" style={{justifyContent:'start', flexDirection: 'column'}}>
                    <div style={{margin:'5px 0px 8px 0px', width:'93%', textAlign:'center', fontWeight:'700'}}>
                        받으실 고객 정보를 입력해주세요.
                    </div>
                    <div className="centera" style={{justifyContent:'start', width:'95%'}}>
                        <input className="apply-input" type='text' placeholder="입력하신 정보는 플레이스 홀더로 적용됩니다."  value={addInput} 
                            onKeyPress={e=> {
                                if (e.key === 'Enter'){
                                func(addInput); }}}
                            onChange={e => setAddInput(e.currentTarget.value)} >
                        </input>
                        <input type="button" value="생성" onClick={() => {
                            if(addInput.length > 0){
                                setAddInput('');
                                func(addInput);
                            }
                        }} />
                    </div>
                </div>
        )
    }
}

export default ApplyInputCustom
