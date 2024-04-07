import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './signup.css'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Api from "../../utils/api";
import { addUsers } from "../../store/reducer/user";

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = Api()
    const [users, setUsers] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })
    const [otp, setOtp] = useState('')
    const [isOtpSent, setIsOtpSend] = useState(false)

    const onChangeInput = (event)=>{
        event.preventDefault()
        const data = {...users}
        data[event.target.name] = event.target.value
        setUsers(data)
    }

    const mainFunc = {
        signInHandler: async (event)=>{
            event.preventDefault()
    
            try {
                await api.requests({
                    method: 'POST',
                    url: '/auth/register',
                    data: users
                }).then((res)=>{
                    const data = res
                    dispatch(addUsers(data))
                    // console.log(data);
                    setIsOtpSend(true)
                })
                alert('We have sent otp code to your email')
            } catch (error) {
                alert(error.message);
            }
        },

        otpHandler: async (event)=>{
            event.preventDefault()

            try {
                const res = await api.requests({
                    method: 'POST',
                    url: '/auth/verify',
                    data: {email: users.email, otp}
                })

                const data = res.data
                console.log(data);
                if (data.message === 'Email is verified') {
                    alert('Your email is verified')
                    window.location.reload(navigate('/'))
                }
            } catch (error) {
                alert(error.message)
            }
        },

        resendOtpHandler: async (event)=>{
            event.preventDefault()

            try {
                await api.requests({
                    method: 'POST',
                    url: '/auth/resend_otp',
                    data: {email: users.email}
                })
                alert('We have resent you the OTP code')
            } catch (error) {
                alert(error.message)
            }
        }
    }

    useEffect(()=>{
        document.title = 'Sign Up'
    })

    const toSignInPage = ()=>{
        navigate('/signin')
    }
    return (
        <div className="signup-app">
            <div className="signup-banner">
                {isOtpSent ? (
                    <div className="verification-container">
                        <form onSubmit={mainFunc.otpHandler} className="signup-form">
                            <div className="signup-form-group">
                                <p className="text-light">We have sent the <b>OTP</b> code. <br/>Check your email to get the <b>OTP</b> code.</p>
                            </div>
                            
                            <div className="signup-form-group">
                                <input type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Your OTP code"/>
                            </div>

                            <div className="signup-form-group">
                                <button type="submit" className="signup-btn-REG usual-signup-btn">Verify OTP</button>
                            </div>

                            <p style={{visibility: 'hidden'}}>m</p>

                            <p className="text-light">Click Resend <b>OTP</b> if You haven't received <br/> the <b>OTP</b> code.</p>

                            <div className="signup-form-group">
                                <button className="signup-btn-REG usual-signup-btn" onClick={mainFunc.resendOtpHandler}>Resend OTP</button>
                            </div>
                        </form>
                    </div>
                ):(
                    <div className="signup-container">
                        <div className="signup-content">
                            <div className="signup-left-side">
                                <h1 className="signup-title">More Than <span className="span-signup-title">Coffee</span>, Elevated Experiences.</h1>

                                <p style={{visibility: "hidden"}}>m</p>

                                <p className="text-light">Have an account?</p>

                                <button onClick={toSignInPage} className="signin-btn1">Sign In</button>
                            </div>

                            <div className="box">
                                <div className="row">
                                    <form className="signup-form">
                                        <div className="signup-form-group">
                                            <input type="text" name="name" placeholder="What's your name?" onChange={onChangeInput} required/>
                                        </div>

                                        <div className="signup-form-group">
                                            <input type="text" name="username" placeholder="Your username" onChange={onChangeInput} required/>
                                        </div>

                                        <div className="signup-form-group">
                                            <input type="email" name="email" placeholder="Your e-mail address" onChange={onChangeInput} required/>
                                        </div>

                                        <div className="signup-form-group">
                                            <input type="password" name="password" placeholder="Password" onChange={onChangeInput} required/>
                                        </div>

                                        <div className="signup-form-group">
                                            <button className="signup-btn-REG usual-signup-btn" onClick={mainFunc.signInHandler}>Sign Up</button>
                                        </div>

                                        <p className="text-center text-light">Or</p>

                                        <div className="signup-form-group">
                                            <button className="signup-btn-REG google-signup-btn"><FcGoogle style={{background: "none", fontSize: "20px"}}/> Sign Up with Google</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignUp