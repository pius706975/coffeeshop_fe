import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './edit.css'
import Api from "../../utils/api"
import { useParams } from "react-router-dom"
import NavbarComp from "../../components/navbar/navbar"

function EditProduct() {
    const [product, setProduct] = useState({})
    const params = useParams()
    const api = Api()

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

    return (
        <div className="edit-app">
            <NavbarComp/>

            <div className="edit-details">
                <div className="detail">
                    <div className="dash-left">
                    <p>TODO: Fix admin dashboard detail page</p>
                        <div className="detail-img">
                            <img src={product.image} alt="" />
                        </div>
                    </div>

                    <div className="box">
                        <div className="row">
                            <h1 className="fw-bold">{product.name}</h1>

                            <p style={{visibility: 'hidden'}}>m</p>

                            <p>"{product.description}"</p>
                            
                            <p><span className="fw-bold text-danger">Sold</span> {product.sold}</p>

                            <h3 className="fw-bold text-success">{product.price}</h3>
                        </div>

                        <div className="btns">
                            <button className="order-btn">Order</button>
                            <button className="cart-btn">Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct