import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './edit.css'
import Api from "../../utils/api"
import { useParams } from "react-router-dom"
import NavbarComp from "../../components/navbar/navbar"
import { Form } from "react-bootstrap"

function EditProduct() {
    const params = useParams()
    const api = Api()
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState({})

    const getProductDetail = ()=>{
        api.requests({
            method: 'GET',
            url: `/product/${params.id}`
        }).then((res)=>{
            const data = res.data
            setProduct(data)
            console.log(data);
        }).catch((err)=>{
            alert(err.message)
        })
    }

    useEffect(()=>{
        getProductDetail()
        document.title = 'Dashboard detail'
    }, [])

    const getCategory = ()=>{
        api.requests({
            method: 'GET',
            url: `/product-category/`
        }).then((res)=>{
            const data = res
            setCategory(data)
            console.log(data);
        }).catch((err)=>{
            alert(err.message)
        })
    }

    useEffect(()=>{
        getCategory()
    }, [])

    return (
        <div className="edit-app">
            <NavbarComp/>

            <div className="edit-details">
                <div className="detail">
                    <div className="dash-left">
                    <p className="text-dark">TODO: Fix admin dashboard detail page</p>
                        <div className="detail-img">
                            <img src={product.image} alt="" />
                        </div>
                    </div>

                    <div className="box">
                        <div className="row">
                            <div className="edit-form">
                                <Form className="bg-transparent">
                                    <Form.Group className="mb-3 bg-transparent" controlId="formGroupText">
                                        <Form.Label className="bg-transparent text-dark">Name</Form.Label>
                                        <Form.Control type="text" placeholder="Product name" defaultValue={product.name}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 bg-transparent" controlId="formGroupText">
                                        <Form.Label className="bg-transparent text-dark">Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Description" defaultValue={product.description}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 bg-transparent" controlId="formGroupText">
                                        <Form.Label className="bg-transparent text-dark">Price</Form.Label>
                                        <Form.Control type="text" placeholder="Price" defaultValue={product.price}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 bg-transparent" controlId="formGroupText">
                                        <Form.Label className="bg-transparent text-dark">Name</Form.Label>
                                        <Form.Control type="text" placeholder="Product name" defaultValue={product.name}/>
                                    </Form.Group>
                                </Form>
                            </div>
                            {/* <h1 className="fw-bold">{product.name}</h1>

                            <p style={{visibility: 'hidden'}}>m</p>

                            <p>"{product.description}"</p>
                            
                            <p><span className="fw-bold text-danger">Sold</span> {product.sold}</p>

                            <h3 className="fw-bold text-success">{product.price}</h3> */}
                        </div>

                        <div className="btns">
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct