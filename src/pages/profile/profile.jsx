import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './profile.css'
import NavbarComp from "../../components/navbar/navbar"
import { Image, Modal } from "react-bootstrap"
import Api from '../../utils/api'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/reducer/user"
import { useNavigate } from "react-router-dom"
import { CiEdit } from "react-icons/ci";


function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = Api()
    const {isAuth} = useSelector((state)=>state.users)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')
    const [data4, setData4] = useState('')

    const mainFunc = {
        getUser: ()=>{
            api.requests({
                url: '/user/profile'
            }).then((res)=>{
                const data = res.data
                setData1(data.image)
                setData2(data.name)
                setData3(data.username)
                setData4(data.email)
            }).catch((err)=>{
                alert(err.message)
            })
        },

        updateUser: ()=>{
            api.requests({
                method: 'PUT',
                url: '/user/edit_profile',
                data: {
                    name: name,
                    username: username,
                    email: email
                }
            }).then((res)=>{
                alert('Data is updated successfully');
                window.location.reload(navigate('/profile'))
            }).catch((err)=>{
                alert(err.message)
            })
        },

        updatePassword: ()=>{
            api.requests({
                method: 'PUT',
                url: '/user/edit_password',
                data: {
                    password: password
                }
            }).then((res)=>{
                alert('Password is updated successfully')
            }).catch((err)=>{
                alert(err.message)
            })
        }
    }

    useEffect(()=>{
        mainFunc.getUser()
        document.title = 'Profile'
    }, [])

    useEffect(()=>{
        if (name === '' && data2) {
            setName(data2)
        }
    }, [data2, name])

    useEffect(()=>{
        if (username === '' && data3) {
            setUsername(data3)   
        }
    }, [data3, username])

    useEffect(()=>{
        if (email === '' && data4) {
            setEmail(data4)
        }
    }, [data4, email])

    // Image modal
    const [imgModal, setImgModal] = useState(false)
    const IMFunc = {
        showImgModal: ()=>{
            setImgModal(true)
        },
        saveImg: ()=>{
            setImgModal(false)
        },
        cancelChangeImg: ()=>{
            setImgModal(false)
        }
    }

    // Update profile modal
    const [updateProfileModal, setUpdateProfileModal] = useState(false)
    const UPFunc = {
        showProfileModal: ()=>{
            setUpdateProfileModal(true)
        },
        saveProfile: ()=>{
            mainFunc.updateUser()
            setUpdateProfileModal(false)
        },
        cancelChangeProfile: ()=>{
            setUpdateProfileModal(false)
        }
    }

    const [updatePasswordModal, setUpdatePasswordModal] = useState(false)
    const UPassFunc = {
        showPasswordModal: ()=>{
            setUpdatePasswordModal(true)
        },
        savePassword: ()=>{
            mainFunc.updatePassword()
            setUpdatePasswordModal(false)
        },
        cancelChangePassword: ()=>{
            setUpdatePasswordModal(false)
        }
    }

    return (
        <div className="profile-app">
            <NavbarComp/>

            <div className="profile">
                {!isAuth ? (
                    window.location.reload(navigate('/'))
                ) : (
                    <div className="user-profile">
                        <div className="profile-content">
                            <div>
                                <h1 className="fw-bold text-center">Profile</h1>
                            </div>

                            <p style={{visibility: 'hidden'}}>m</p>

                            <div className="profile-data">
                                <Image className="img-data" src={data1} width={200} roundedCircle/>
                                <p className="fw-bold change-pic" onClick={IMFunc.showImgModal}><CiEdit size={30}/> Change picture</p>

                                <Modal show={imgModal} onHide={IMFunc.cancelChangeImg} aria-lableledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton className="in-modal">
                                        <Modal.Title className="fw-bold" style={{background: 'none'}}>Change picture</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body className="in-modal">
                                        <input type="file" className="img-input"/>
                                    </Modal.Body>

                                    <Modal.Footer className="in-modal">
                                        <div className="d-flex" style={{background: 'none'}}>
                                            <button className="logout-btn" onClick={IMFunc.cancelChangeImg}>Cancel</button>

                                            <p style={{visibility: 'hidden'}}>m</p>

                                            <button className="logout-btn" onClick={IMFunc.saveImg}>Save</button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

                                <p style={{visibility: 'hidden'}}>m</p>

                                <h2>{data2}</h2>

                                <p>{data4}</p>
                            </div>

                            <div className="profile-btns">
                                <button className="update-profile-btn" onClick={UPFunc.showProfileModal}>Update Profile</button>

                                <Modal show={updateProfileModal} onHide={UPFunc.cancelChangeProfile} aria-lableledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton className="in-modal">
                                        <Modal.Title className="fw-bold" style={{background: 'none'}}>Update profile</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body className="in-modal">
                                        <input type="name" className="new-data-form" placeholder="Your name" defaultValue={data2} onChange={(event)=>setName(event.target.value)}/>

                                        <p style={{visibility: 'hidden'}}></p>

                                        <input type="name" className="new-data-form" placeholder="Your username" defaultValue={data3} onChange={(event)=>setUsername(event.target.value)}/>

                                        <p style={{visibility: 'hidden'}}></p>

                                        <input type="email" className="new-data-form" placeholder="Your email address" defaultValue={data4} onChange={(event)=>setEmail(event.target.value)}/>
                                    </Modal.Body>

                                    <Modal.Footer className="in-modal">
                                        <div className="d-flex" style={{background: 'none'}}>
                                            <button className="logout-btn" onClick={UPFunc.cancelChangeProfile}>Cancel</button>

                                            <p style={{visibility: 'hidden'}}>m</p>

                                            <button className="logout-btn" onClick={UPFunc.saveProfile}>Save</button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

                                <p style={{visibility: 'hidden'}}></p>

                                <button className="update-password-btn" onClick={UPassFunc.showPasswordModal}>Update Password</button>

                                <Modal show={updatePasswordModal} onHide={UPassFunc.cancelChangePassword} aria-lableledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton className="in-modal">
                                        <Modal.Title className="fw-bold" style={{background: 'none'}}>Update password</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body className="in-modal">
                                        <input type="password" className="new-data-form" placeholder="Your new password" onChange={(event)=>setPassword(event.target.value)}/>
                                    </Modal.Body>

                                    <Modal.Footer className="in-modal">
                                        <div className="d-flex" style={{background: 'none'}}>
                                            <button className="logout-btn" onClick={UPassFunc.cancelChangePassword}>Cancel</button>

                                            <p style={{visibility: 'hidden'}}>m</p>

                                            <button className="logout-btn" onClick={UPassFunc.savePassword}>Save</button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

                                <p style={{visibility: 'hidden'}}></p>

                                <button className="logout-btn" onClick={()=>dispatch(logout())}>Logout</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile