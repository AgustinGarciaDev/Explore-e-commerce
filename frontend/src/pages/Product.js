import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { connect } from "react-redux"
import Comment from '../components/Comment';
import Footer from '../components/Footer';
import Header from '../components/Header';
import cartActions from '../redux/actions/cartActions';
import commentsActions from '../redux/actions/commentsActions';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';

const Product = (props) => {
    const [article, setArticle] = useState({})
    const [renderComment, setRenderComment] = useState([])
    const [comment, setComment] = useState({ comment: "", token: localStorage.getItem('token') })
    const [reload, setReload] = useState(false)

    const operatorDiscount = article.price - (article.discount / 100) * article.price

    useEffect(() => {
        item()
        fetchComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    useEffect(() => {
        if (props.socket) {
            props.socket.on('update', () => {
                setReload(!reload)
            })
        }
    })

    const fetchComments = async () => {
        let response = await props.products()
        let item = response.find(article => article._id === props.match.params.id)
        setRenderComment(item.comments)
    }

    useEffect(() => {
        scroll()
    }, [])

    const scroll = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    const item = async () => {
        let response = await props.allProducts()
        let item = response.find(article => article._id === props.match.params.id)
        setArticle(item)
    }

    const alert = (type, message) => {
        toast[type](message, {
            position: "top-center",
            autoClose: 1700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const buy = () => {
        if (article.units === article.stock) {
            alert("info", 'We have no more stock of this item')
        } else {
            props.buyArticle(article)
        }
    }

    const readInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setComment({
            ...comment,
            [name]: value
        })
    }

    const addComment = async () => {
        if (/^\s+|\s+$/.test(comment.comment) || comment.comment === "") {
            if (props.usuarioStatus) {
                alert("error", 'You cannot post an empty comment')
            } else {
                alert("info", 'You must login first')
            }
        } else {
            var response = await props.fetchComments(comment, article._id)
            if (response) {
                setRenderComment(response)
                props.socket.emit('NewMessage')
                setComment({ comment: "", token: localStorage.getItem('token') })
            }
        }
    }

    const deleteComment = async (id) => {
        var response = await props.deleteComment(id, article._id)
        setRenderComment(response)
        props.socket.emit('NewMessage')
    }

    const updateComment = async (id, comment) => {
        var response = await props.updateComment(comment, article._id, id)
        setRenderComment(response)
        props.socket.emit('NewMessage')
    }

    const images = article.productsImages ? article.productsImages.map((image, index) => {
        return {
            original: image.photo,
            thumbnail: image.photo,
            id: index
        }
    })
        : null

    const imgUser = props.usuarioStatus ? props.usuarioStatus.img : "https://i.pinimg.com/originals/0f/61/31/0f6131023edac341954285cf2d97c8e3.jpg"

    const imgCard = [
        "http://tingarciadg.com/wp-content/uploads/2021/06/011-visa.png",
        "http://tingarciadg.com/wp-content/uploads/2021/06/009-discover.png",
        "http://tingarciadg.com/wp-content/uploads/2021/06/006-citi.png",
        "http://tingarciadg.com/wp-content/uploads/2021/06/026-paypal.png",
        "http://tingarciadg.com/wp-content/uploads/2021/06/024-maestro.png"
    ]

    const enter = (e) => {
        if (e.key === "Enter") {
            addComment()
        }
    }

    return (
        <>
            <Header />
            <div className="productContainer">
                <div className="photosProducts">
                    <div className="carrouselProduct">
                        {
                            article.productsImages && <ImageGallery items={images} />
                        }
                    </div>
                </div>
                <div className="infoProducts">
                    <div className="logoProduct">
                        <h2 >{article.brand}</h2>
                    </div>
                    <div className="infoProduct">
                        <h3 >{article.name}</h3>
                    </div>
                    <p className={operatorDiscount === 0 ? "priceProduct" : "priceProductD"}>€ {article.price}</p>
                    <p className="priceReal">€{operatorDiscount}</p>
                    <p style={{ color: "red" }}>{article.discount}% discount</p>
                    <button className="btnBuy" onClick={buy}>add to cart</button>
                    <div className="descProduct">
                        <p>{article.description}</p>
                    </div>
                    <div className="cardContainer">
                        {
                            imgCard.map((card, index) => <div key={index} className="cardProduct" style={{ backgroundImage: `url(${card})` }}></div>)
                        }
                    </div>
                </div>
            </div>
            <div className="inputProduct">
                <div className="commentsContainer">
                    <div className="commentsimportant">
                        {
                            renderComment.length === 0
                                ?
                                <div className="commentsloaderContainer">
                                    <div className="commentsLOader" >
                                        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_cFaBp6.json" background="transparent" speed="1" loop autoplay></lottie-player>
                                    </div>
                                    <p>No comments, be the first !</p>
                                </div>
                                :
                                renderComment.map(comment => <Comment
                                    key={comment._id}
                                    deleteComment={deleteComment}
                                    comment={comment}
                                    updateComment={updateComment}
                                    usuarioStatus={props.usuarioStatus}
                                />)
                        }
                    </div>
                    <hr
                        style={{
                            color: 'black',
                            height: 10
                        }}
                    />
                    <div className="textTareaConteiner">
                        <div style={{ backgroundImage: `url(${imgUser})` }} className="avatarImgComment"></div>
                        <input className="textInput" onKeyPress={enter} onChange={readInput} value={comment.comment} name="comment" placeholder="Hello!" disabled={props.usuarioStatus ? false : true} required />
                        <span onClick={() => addComment()} className="material-icons">send</span>
                    </div>
                </div>
            </div>
            <ReactTooltip />
            <div className="containerIconsHome">
                <div className="boxTextAndIcon">
                    <i className="fas fa-truck"></i>
                    <h2>Free Delivery</h2>
                    <p>On Orders Over £50</p>
                </div>
                <div className="boxTextAndIcon">
                    <i className="fas fa-box-open"></i>
                    <h2>14 Day Returns</h2>
                    <p>T&C's Apply</p>
                </div>
                <div className="boxTextAndIcon">
                    <i className="fas fa-hand-holding-heart"></i>
                    <h2>Hand Picked</h2>
                    <p>By Our Team</p>
                </div>
                <div className="boxTextAndIcon">
                    <i className="fas fa-box"></i>
                    <h2>Discreet</h2>
                    <p>Non-Identifiable Packaging</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        articles: state.cart.articles,
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {
    allProducts: cartActions.allProducts,
    buyArticle: cartActions.buyArticle,
    fetchComments: commentsActions.fetchComments,
    products: commentsActions.products,
    deleteComment: commentsActions.deleteComment,
    updateComment: commentsActions.updateComment
}


export default connect(mapStateToProps, mapDispatchToProps)(Product)