import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './dashboard.css'
import NavbarComp from "../../components/navbar/navbar"
import Api from "../../utils/api"
import CardDashboard from "../../components/card/card.dashboard"

function Dashboard() {
    const api = Api()
    const [product, setProduct] = useState([])

    const getAllProduct = async ()=>{
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
    }

    useEffect(()=>{
        getAllProduct()
        document.title = 'Dashboard'
    }, [])

    const displayProduct = product

    return (
        <div className="dashboard-app">
            <NavbarComp/>

            <div className="dashboard">
                <div className="all-item">
                    <div className="dashboard-content">
                        <div className="d-flex title">
                            <div>
                                <h1 className="text-light fw-bold">Products</h1>
                            </div>

                            <p style={{visibility: 'hidden'}}>m</p>

                            <div className="dash-btn">
                                <button>Add Item</button>
                            </div>
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
        </div>
    )
}

export default Dashboard