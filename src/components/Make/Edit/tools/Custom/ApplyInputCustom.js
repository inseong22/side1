import React, {useState} from 'react'
import './ApplyInputCustom.css'

function ApplyInputCustom({func, disabled, made, value}) {
    const [addInput, setAddInput] = useState('');

    if(made){
        return (
                <div className="centera" style={{justifyContent:'start', marginTop:'12px'}}>
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
            <div className="centera" style={{justifyContent:'start', marginTop:'12px'}}>
                <input className="apply-input" disabled type='text' placeholder="입력받을 정보를 입력해 주세요.">
                </input>
                <input type="button" value="생성" style={{backgroundColor:'#C4CACF', color:'white'}} />
            </div>
        )
    }else{
        return (
                <div className="centera" style={{justifyContent:'start', marginTop:'12px'}}>
                    <input className="apply-input" type='text' placeholder="입력받을 정보를 입력해 주세요."  value={addInput} 
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
        )
    }
}

export default ApplyInputCustom
