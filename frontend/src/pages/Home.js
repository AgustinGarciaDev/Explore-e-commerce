const Home = () => {
    return(
        <>
            <section className="welcome-container">

                <div className="homeHeader-container">
                    <div className="home-header" >
                        <div className="header-navs-container">
                            <nav className="left-nav">
                                <p className="headerNav-item">Contact Us</p>
                                <div className="headerNav-item nav-select-container">
                                    <p>Language:</p>
                                    <select className="home-header-select">
                                        <option className="navSelect-option">English</option>
                                        <option className="navSelect-option">Español</option>
                                    </select>
                                </div>
                                <div className="headerNav-item nav-select-container">
                                    <p>Currency:</p>
                                    <select className="home-header-select">
                                        <option className="navSelect-option">USD</option>
                                        <option className="navSelect-option">ARS</option>
                                        <option className="navSelect-option">EUR</option>
                                    </select>
                                </div>
                            </nav>
                            
                            <nav className="right-nav">
                                <p className="headerNav-item">My Wishlist (0) </p>
                                <p className="headerNav-item">Sign In</p>
                            </nav>
                        </div>

                        <div className="logo-carrito-container">
                            <div className="logo-container">
                                <div className="logo"> Soy el logo</div>
                            </div>
                            <div className="carrito-container">
                                <div className="carrito">Soy el carrito</div>
                            </div>
                        </div>

                        <div className="horizontal-bar"></div>
                        {/* <hr></hr> */}

                        <div className="header-bottom-nav-container">
                            <nav className="header-bottom-nav">
                                <div className="bottom-nav-item">Item</div>
                                <div className="bottom-nav-item">Item</div>
                                <div className="bottom-nav-item">Item</div>
                                <div className="bottom-nav-item">Item</div>
                                <div className="bottom-nav-item">Item</div>
                                <div className="bottom-nav-item">Icon</div>
                            </nav>
                        </div>
                    </div>
                </div>

            </section>
            <p>Terminó el welcome</p>
        </>
    )
}

export default Home