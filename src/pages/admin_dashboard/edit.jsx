import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './edit.css'
import Api from "../../utils/api"
import { useNavigate, useParams } from "react-router-dom"
import NavbarComp from "../../components/navbar/navbar"
import { Form } from "react-bootstrap"
import { useSelector } from "react-redux"

function EditProduct() {
    const {isAuth} = useSelector((state)=>state.users)
    const navigate = useNavigate()
    const params = useParams()
    const api = Api()
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])

    const onChangeInput = (event)=>{
        event.preventDefault()
        const tmpData = {...product}
        tmpData[event.target.name] = event.target.value
        setProduct(tmpData)
        console.log(product);
    }

    const mainFunc = {
        getProductDetail: ()=>{
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
        },

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

        updateProduct: ()=>{            
            api.requests({
                method: 'PUT',
                url: `/product/${params.id}`,
                data: product
            }).then(()=>{
                alert('Product data updated successfully')
            }).catch((err)=>{
                alert(err.message)
            })
        },
    }

    useEffect(()=>{
        mainFunc.getProductDetail()
        document.title = 'Dashboard detail'
    }, [])

    useEffect(()=>{
        mainFunc.getCategory()
    }, [])

    return (
        <div className="edit-app">
            <NavbarComp/>

            {!isAuth ? (
                window.location.reload(navigate('/'))
            ) : (
                <div className="edit-details">
                    <div className="detail">
                        <div className="dash-left">
                        <p className="text-dark" style={{visibility: 'hidden'}}>TODO: Fix admin dashboard detail page</p>
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
                                    </Form>
                                </div>
                            </div>

                            <div className="btns">
                                <button className="edit-btn" onClick={mainFunc.updateProduct}>Save</button>
                                <button className="delete-btn">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditProduct