import React from 'react'

function InputInfoPage() {
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    return (
        <div className="login-container">
            <div className="login__inner">
                <div>
                    회원가입 페이지에 오신 것을 환영합니다.
                </div>
                <form className="form-container" onSubmit={e => submit(e)}>
                    <input 
                        type="text" 
                        placeholder="이름을 입력해주세요." 
                        required
                        value={name}   
                        onChange={e => setName(e.currentTarget.value)}
                    />
                    <input  
                        type="text" 
                        placeholder="직업을 입력해주세요." 
                        required
                        value={job} 
                        onChange={e => setJob(e.currentTarget.value)}
                    />
                    <input type="submit" value="회원가입" />
                </form>
            </div>
        </div>
    )
}

export default InputInfoPage
