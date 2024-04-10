import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './home.css'
import NavbarComp from "../../components/navbar/navbar"

function Home() {
    return (
        <div className="home-app">
            <NavbarComp/>

            {/* Section 1 */}
            <div id="home" className="home-banner d-flex">
                <div className="home-banner-container">
                    <div className="home-banner-content">
                        <div className="home-banner-left-side">
                            <h1 className="banner-title"><span className="span-title">Coffee</span> Mood</h1>

                            <p style={{visibility: "hidden"}}>m</p>

                            <p className="banner-paragraph">
                                Your good vibes today brought to you by <span className="span-paragraph1">Coffee</span> <span className="span-paragraph2">Mood</span>.<br/>
                            
                                Find your perfect coffee now!
                            </p>

                            <p style={{visibility: "hidden"}}>m</p>

                            <div className="banner-btn">
                                <div>
                                    <button href="#" className="mx-3 banner-order-btn">Order Now</button>
                                </div>

                                <p style={{visibility: "hidden"}}></p>

                                <div>
                                    <button href="#" className="mx-3 banner-menu-btn">Menu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            
        </div>
    )
}

export default Home