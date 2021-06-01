import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { connect } from "react-redux"
import Footer from '../components/Footer';
import Header from '../components/Header';
import cartActions from '../redux/actions/cartActions';

const Product = (props) => {
    const [article, setArticle] = useState({})
    const [comment, setComment] = useState({ comment: "", token: localStorage.getItem('token') })

    useEffect(() => {
        scroll()
        item()
    }, [])

    const scroll = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const item = async () => {
        let response = await props.allProducts()
        console.log(response)
        let item = response.find(article => article._id === props.match.params.id)
        setArticle(item)
    }

    const buy = () => {
        props.buyArticle(article)
    }

    const readInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setComment({
            ...comment,
            [name]: value
        })
    }

    const addComment = async (e) => {
        e.preventDefault()
        if (/^\s+|\s+$/.test(comment.comment) || comment.comment === "") {
            /*  toast.error("You cannot post an empty comment") */
            alert("You cannot post an empty comment")
        } else {
            /*             var response = await props.fetchComments(comment, video._id, props.profile.avatar, props.profile.name)
                        if (response) {
                            setRenderComment(response)
                            setComment({ comment: "", token: localStorage.getItem('token') })
                        } */
        }
    }

    const deleteComment = async (id) => {
        /*      var response = await props.deleteComment(id, video._id)
             setRenderComment(response) */
    }

    const imagenes = article.productsImages ? article.productsImages.map(imagen => 
        {
            return {
                original: imagen.photo,
                thumbnail: imagen.photo,
            }
        }) 
    : null

    return (
        <>
            <Header />
            <div className="productContainer">
                <div className="photosProducts">
                    <div className="carrouselProduct">
                        {
                          article.productsImages && <ImageGallery items={imagenes} />
                        }
                    </div>
                </div>
                <div className="infoProducts">
                    <div className="logoProduct">
                        <h2>{article.brand}</h2>
                    </div>
                    <p className="priceProduct">$ {article.price}</p>
                    <div className="buyNowProduct">
                        <button onClick={buy}>add to cart</button>
                    </div>
                    <div className="infoProduct">
                        <h3 >{article.name}</h3>
                    </div>
                    <div className="descProduct">
                        <p>{article.description}</p>
                    </div>
                </div>
            </div>
            <div className="inputProduct">
                <div className="textTareaConteiner">
                    <div className="avatarComment">
                        <div style={{ backgroundImage: `url()` }} className="avatarImgComment"></div>
                        <p style={{color: "white", marginTop: "1rem" }}>Kevin</p>
                    </div>
                    <textarea className="textInput" onChange={readInput} value={comment.comment} name="comment" placeholder="Hello!" required />
                </div>
                <div className="divSend">
                    <button className="buttonSend" onClick={addComment}>send</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        articles: state.cart.articles
    }
}

const mapDispatchToProps = {
    allProducts: cartActions.allProducts,
    buyArticle: cartActions.buyArticle,
}


export default connect(mapStateToProps, mapDispatchToProps)(Product)