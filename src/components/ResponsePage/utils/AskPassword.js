import React from 'react'
import { Input } from 'antd';
import {Link} from 'react-router-dom'

function AskPassword({password, setPassword, getByPassWord}) {
    return (
        <div style={{width:'100vw', height:'100vh', display: 'flex', justifyContent:'center', alignItems: 'center', backgroundColor:'white', marginTop:'-10vh'}}>
            <Link to="/" className="arrow-hover" style={{position:'absolute', top:'10px', left:'20px', fontSize:'30px', border:'none', backgroundColor:'#ffffffff', cursor:'pointer', color:'black'}}>←</Link>
            <form onSubmit={() => getByPassWord()} style={{justifyContent:'start', alignItems:'start', display: 'flex', flexDirection: 'column'}}>
                <span style={{marginTop:'3%',fontSize:'30px', fontFamily:'Pretendard-ExtraBold'}}>
                확인할 데이터의 비밀번호를 입력하세요.
                </span>
                <Input style={{marginTop:'3%',height:'50px', fontSize:'20px'}} type="password" placeholder="지급받은 비밀번호를 입력하세요." value={password} onChange={e => setPassword(e.target.value)} />
                <button onSubmit={() => getByPassWord()} style={{marginTop:'3%',backgroundColor:'black', color:'white', border:'none', borderRadius:'3px', padding:'10px 40px'}}>입력</button>
            </form>
        </div>
    )
}

export default AskPassword
