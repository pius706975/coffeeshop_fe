import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './signin.css'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from '../../utils/api'
import { login } from "../../store/reducer/user";

function SignIn() {
    const navigate = useNavigate()
    const {isAuth} = useSelector((state)=>state.users)
    const dispatch = useDispatch()
    const api = Api()
    const [users, setUsers] = useState({
        username: '',
        password: ''
    })

    const inputHandler = (event)=>{
        event.preventDefault()
        const data = {...users}
        data[event.target.name] = event.target.value
        setUsers(data)
    }

    const signUpHandler = async (event)=>{
        event.preventDefault()

        try {
            await api.requests({
                method: 'POST',
                url: '/auth/login',
                data: users
            }).then((res)=>{
                const data = res.data.accessToken
                // console.log(data);
                dispatch(login(data))
                navigate('/')
            })
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(()=>{
        if (isAuth) {
            navigate('/')
        }
        document.title = 'Sign In'
    }, [isAuth])

    const toSignUpPage = ()=>{
        navigate('/signup')
    }
    return (
        <div className="signin-app">
            <div className="signin-banner">
                <div className="signin-container">
                    <div className="signin-content">
                        <div className="signin-left-side">
                            <h1 className="signin-title">More Than <span className="span-signin-title">Coffee</span>, Elevated Experiences.</h1>

                            <p style={{visibility: "hidden"}}>m</p>

                            <p className="text-light">Don't have an account?</p>

                            <button onClick={toSignUpPage} className="signup-btn1">Sign Up</button>
                        </div>

                        <div className="box">
                            <div className="row">
                                <form className="signin-form">
                                    <div className="signin-form-group">
                                        <input type="text" name="username" placeholder="Your username" onChange={inputHandler} required/>
                                    </div>

                                    <div className="signin-form-group">
                                        <input type="password" name="password" placeholder="Password" onChange={inputHandler} required/>
                                    </div>

                                    <p className="text-light">Forgot password?</p>

                                    <div className="signin-form-group">
                                        <button className="signin-btn-REG usual-signin-btn" onClick={signUpHandler}>Sign In</button>
                                    </div>

                                    <p className="text-center text-light">Or</p>

                                    <div className="signin-form-group">
                                        <button className="signin-btn-REG google-signin-btn"><FcGoogle style={{background: "none", fontSize: "20px"}}/> Sign In with Google</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn