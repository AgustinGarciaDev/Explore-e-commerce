const Footer = () => {
    return (
        <div className="containerFooter">

{/*             <div className="navFooter">
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
            </div> */}
            <div className="containerContentFooter">
                <div className="containerSocial">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-whatsapp"></i>
                    <i className="fab fa-instagram"></i>
                </div>
                <div className="containerSuscribe">
                    <input className="inputSuscribe" type="text" name="" id="" placeholder="Enter your email to keep in touch" />
                    <button className="btnSuscribe">Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Footer


