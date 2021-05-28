const Footer = () => {
    return (
        <div className="containerFooter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#e62a54" fill-opacity="1" d="M0,0L48,42.7C96,85,192,171,288,213.3C384,256,480,256,576,229.3C672,203,768,149,864,122.7C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <div className="containerContentFooter">
                <div className="containerSocial">
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-whatsapp"></i>
                    <i class="fab fa-instagram"></i>
                </div>
                <div className="containerSuscribe">
                    <input className="inputSuscribe" type="text" name="" id="" placeholder="Enter your email to keep in touch" />
                    <button className="btnSuscribe">Sign Up</button>
                </div>
                <div className="navFooter">
                    <img className="logoFooter" src="http://tingarciadg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-4.png" alt="" />
                    <div className="listItemNav">
                        <h3 className="titleNav">Our web</h3>
                        <div className="itemNav categoriesFooter">
                            <p>Home</p>
                            <p>All products</p>
                            <p>Sign In</p>
                            <p>Sign Up</p>
                        </div>
                    </div>
                    <div className="listItemNav">
                        <h3 className="titleNav">Categories</h3>
                        <div className="itemNav">
                            <p>Sextoy</p>
                            <p>Lubricants</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer