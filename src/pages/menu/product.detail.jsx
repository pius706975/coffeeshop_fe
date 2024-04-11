import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './product.detail.css'
import { useParams } from "react-router-dom"
import Api from '../../utils/api'
import NavbarComp from '../../components/navbar/navbar'
import currency from '../../utils/format.currency'
import { GrLike } from "react-icons/gr";

function ProductDetail() {
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
    }, [])

    return (
        <div className="prodetail-app">
            <NavbarComp/>

            <div className="product-details">
                <div className="details">
                    <div className="left-detail">
                        <div className="big-img">
                            <img src={product.image} alt="cappuccino" />
                        </div>
                    </div>

                    <div className="box">
                        <div className="row">
                            <h1 className="fw-bold">{product.name}</h1>

                            <p style={{visibility: 'hidden'}}>m</p>

                            <p>"{product.description}"</p>
                            
                            <p><span className="fw-bold text-danger">Sold</span> {product.sold}</p>

                            <h3 className="fw-bold text-success">{currency(product.price)}</h3>
                        </div>

                        <div className="btns">
                            <button className="order-btn">Order</button>
                            <button className="cart-btn">Cart</button>
                            <button className="like-btn"><GrLike style={{background: 'none'}}/> Like</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail