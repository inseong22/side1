import React, {useState} from 'react'
import './ApplyInputCustom.css'

function ApplyInputCustom({func, disabled, made, value}) {
    const [addInput, setAddInput] = useState('');

    if(made){
        return (
                <div className="centera" style={{justifyContent:'start', marginTop:'12px', marginRight:'18px'}}>
                    <div className="maked">
                    {value}를 입력해주세요
                    </div>
                    <div className="delete-button" onClick={() => {
                        func()
                    }}>삭제</div>
                </div>
        )
    }else if (disabled){
        return (
            <div className="centera" style={{justifyContent:'start', marginTop:'12px'}}>
                <input disabled type='text' placeholder="입력받을 정보를 입력해주세요.">
                </input>
                <input type="button" value="생성" style={{backgroundColor:'#C4CACF', color:'white'}} />
            </div>
        )
    }else{
        return (
                <div className="centera" style={{justifyContent:'start', marginTop:'12px'}}>
                    <input  type='text' placeholder="입력받을 정보를 입력해주세요."  value={addInput} 
                        onKeyPress={e=> {
                            if (e.key === 'Enter'){
                            func(addInput); }}}
                        onChange={e => setAddInput(e.currentTarget.value)} >
                    </input>
                    <input type="button" value="생성" onClick={() => {
                        if(addInput.length > 0){
                            func(addInput);
                            setAddInput('');
                        }
                    }} />
                </div>
        )
    }
}

export default ApplyInputCustom
