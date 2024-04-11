import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './menu.css'
import NavbarComp from "../../components/navbar/navbar"
import { FormControl, InputGroup } from "react-bootstrap"
import {BsSearch} from 'react-icons/bs'
import { useNavigate } from "react-router-dom"
import Api from "../../utils/api"
import CardDetail from "../../components/card/card"

function Menu() {
    const api = Api()

    const [product, setProduct] = useState([])

    const getAllProduct = async ()=>{
        await api.requests({
            method: 'GET',
            url: '/product'
        }).then((res)=>{
            const data = res.data
            setProduct(data)
            // console.log(data);
        }).catch((err)=>{
            alert(err.message)
        })
    }

    useEffect(()=>{
        getAllProduct()
        document.title = 'Product'
    }, [])

    const displayProduct = product
    return (
        <div className="menu-app">
            <NavbarComp/>

            <div className="menu">    
                <div className="all-menu">
                    <div className="menu-content">
                        <div>
                            <InputGroup>
                                <FormControl 
                                    type="text"
                                    className="product-search"
                                    placeholder="Tap To Search For Something" 
                                    aria-label="Type to search" 
                                    aria-describedby="basic-addon2"
                                    style={{backgroundColor: 'white'}}
                                />
                                
                                <button type="submit" className="search-product-btn"><BsSearch className="bg-transparent"/></button>
                            </InputGroup>
                        </div>

                        <p style={{visibility: 'hidden'}}>m</p>

                        <h3 className="text-light">Menu</h3>

                        <p style={{visibility: 'hidden'}}>m</p>

                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', justifyItems: 'left', maxWidth: '1100px', marginBottom: '50px'}}>
                            {
                                displayProduct.map((data)=>{
                                    return (
                                        <div key={data.id}>
                                            <CardDetail
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
    )
}

export default Menu