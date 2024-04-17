import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './menu.css'
import NavbarComp from "../../components/navbar/navbar"
import { FormControl, InputGroup } from "react-bootstrap"
import {BsSearch} from 'react-icons/bs'
import Api from "../../utils/api"
import CardDetail from "../../components/card/card"

function Menu() {
    const api = Api()

    const [product, setProduct] = useState([])
    // const [category, setCategory] = useState([])

    const mainFunc = {
        getAllProducts: async ()=>{
            await api.requests({
                method: 'GET',
                url: '/product/categorized'
            }).then((res)=>{
                const data = res.data
                setProduct(data)
                console.log(data);
            }).catch((err)=>{
                alert(err.message)
            })
        },

        // getAllCategories: async ()=>{
        //     await api.requests({
        //         method: 'GET',
        //         url: '/product-category/'
        //     }).then((res)=>{
        //         const data = res.data
        //         setCategory(data)
        //         console.log(data)
        //     }).catch((err)=>{
        //         alert(err.message)
        //     })
        // },

        // TODO: fix this function
        // getProductByCategory: async ()=>{
        //     const allProduct = {}
            
        //     for (const cat of category ) {
        //         await api.requests({
        //             method: 'GET',
        //             url: `/product/search?category=${cat}`
        //         }).then((res)=>{
        //             allProduct[cat.id] = res.data
        //             setProduct(allProduct)
        //             console.log(allProduct)
        //         }).catch((err)=>{
        //             alert(err.message)
        //         })
        //     }
        // }
    }

    useEffect(()=>{
        mainFunc.getAllProducts()
        // mainFunc.getAllCategories()
        // mainFunc.getProductByCategory()
        document.title = 'Product'
    }, [])

    // const displayProduct = product
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

                        <h3 className="text-light text-center fw-bold">Menu</h3>

                        <p style={{visibility: 'hidden'}}>m</p>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1100px', marginBottom: '50px' }}>
                            {product.map(cat => (
                                <div key={cat.categoryName}>
                                    <h2 className="text-light fw-bold">{cat.categoryName}</h2>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {cat.products.map(prod => (
                                            <CardDetail
                                                key={prod.id}
                                                id={prod.id}
                                                name={prod.name}
                                                price={prod.price}
                                                image={prod.image}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu