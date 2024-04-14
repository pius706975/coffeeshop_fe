import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './dashboard.css'
import NavbarComp from "../../components/navbar/navbar"
import Api from "../../utils/api"
import CardDashboard from "../../components/card/card.dashboard"
import { Form, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Dashboard() {
    const api = Api()
    const navigate = useNavigate()
    const {isAuth} = useSelector((state)=>state.users)
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category_id: ''
    })

    // TODO: fix add item
    const onChangeInput = (event)=>{
        event.preventDefault()
    }

    const mainFunc = {
        getCategory: ()=>{
            api.requests({
                method: 'GET',
                url: `/product-category/`
            }).then((res)=>{
                const data = res.data
                setCategory(data)
                console.log(data);
            }).catch((err)=>{
                alert(err.message)
            })
        },

        getAllProduct: async ()=>{
            await api.requests({
                method: 'GET',
                url: '/product'
            }).then((res)=>{
                const data = res.data
                setProduct(data)
                console.log(data);
            }).catch((err)=>{
                alert(err.message)
            })
        },

        // addProduct: async
    }

    useEffect(()=>{
        mainFunc.getCategory()
        mainFunc.getAllProduct()
        document.title = 'Dashboard'
    }, [])

    const [addItemModal, setAddItemModal] = useState(false)
    const addItemfunc = {
        showModal: ()=>{
            setAddItemModal(true)
        },
        saveData: ()=>{
            setAddItemModal(false)
        },
        cancel: ()=>{
            setAddItemModal(false)
        }
    }

    const displayProduct = product

    return (
        <div className="dashboard-app">
            <NavbarComp/>

            {!isAuth ? (
                window.location.reload(navigate('/'))
            ):(
                <div className="dashboard">
                    <div className="all-item">
                        <div className="dashboard-content">
                            <div className="d-flex title">
                                <div>
                                    <h1 className="text-light fw-bold">Products</h1>
                                </div>

                                <p style={{visibility: 'hidden'}}>m</p>

                                <div className="dash-btn">
                                    <button onClick={addItemfunc.showModal}>Add Item</button>
                                </div>

                                <Modal show={addItemModal} onHide={addItemfunc.cancel} aria-lableledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton className="in-modal">
                                        <Modal.Title className="fw-bold" style={{background: 'none'}}>Add new item</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body className="in-modal">
                                        <p>Fix this form</p>
                                        {/* <Form className="bg-transparent">
                                            <Form.Group className="mb-3 bg-transparent" controlId="formGroupText">
                                                <Form.Label className="bg-transparent text-dark">Name</Form.Label>
                                                <Form.Control type="text" name="name" placeholder="Product name" defaultValue={product.name} onChange={onChangeInput}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3 bg-transparent" controlId="formGroupText">
                                                <Form.Label className="bg-transparent text-dark">Description</Form.Label>
                                                <Form.Control as="textarea" name="description" rows={4} placeholder="Description" defaultValue={product.description} onChange={onChangeInput}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3 bg-transparent" controlId="formGroupText">
                                                <Form.Label className="bg-transparent text-dark">Price</Form.Label>
                                                <Form.Control type="text" name="price" placeholder="Price" defaultValue={product.price} onChange={onChangeInput}/>
                                            </Form.Group>

                                            <Form.Select aria-label="Default select example" name="category_id" value={product.category_id} onChange={onChangeInput}>
                                                {category.map((data)=>{
                                                    return (
                                                        <option key={data.id} value={data.id}>{data.name}</option>     
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form> */}
                                    </Modal.Body>
                                </Modal>
                            </div>

                            <p style={{visibility: 'hidden'}}>m</p>

                            <div className="d-flex text-left" style={{alignContent: 'space-between'}}>
                                <div className="product-list">
                                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', justifyItems: 'left', maxWidth: '1100px', marginBottom: '50px'}}>
                                        {
                                            displayProduct.map((data)=>{
                                                return (
                                                    <div key={data.id}>
                                                        <CardDashboard
                                                            id={data.id}
                                                            name={data.name}
                                                            price={data.price}
                                                            image={data.image}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard