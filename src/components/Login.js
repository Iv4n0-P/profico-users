import React from 'react'
import reqres from '../apis/reqres'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const navigate = useNavigate()

    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [err, setErr] = React.useState(false)

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const loginDetails = {
            "email": user,
            "password": pass
        }

        try {
            const data = await reqres.post('/login', loginDetails)
            if (data.status === 200 && 'token' in data.data) {
                navigate('users')
            }
        } catch {
            setUser('')
            setPass('')
            setErr(true)
        }
    }
    return (
        <div className="login-wrap">

            <div className="sidebar sidebar-login">
                
            <div className="titlebar">
                    <h1 className="users-title">Login</h1>
                    <p className="subtitle">Login page</p>
                </div>

                <div className="sidebar-content sidebar-content-login">
                    <p className="login-details"><strong>Username:</strong> eve.holt@reqres.in</p>
                    <p className="login-details"><strong>Password:</strong> cityslicka</p>
                    <form  className="login-form" onSubmit={handleOnSubmit}>
                        <input autoFocus type="text" placeholder="Username" value={user} onChange={(e) => { setUser(e.target.value) }} />
                        <input type="password" placeholder="Password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                        <button className="button-alt login-btn">Login</button>
                    </form>
                    {err && <p>The username or password is incorrect</p>}

                </div>

                <div className="sidebar-footer">
                    <p className="lnk-alt">Help & support</p>
                </div>

            </div>

        </div>
    )
}

export default Login
