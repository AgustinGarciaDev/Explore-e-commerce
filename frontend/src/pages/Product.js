import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { connect } from "react-redux"
import Comment from '../components/Comment';
import Footer from '../components/Footer';
import Header from '../components/Header';
import cartActions from '../redux/actions/cartActions';
import commentsActions from '../redux/actions/commentsActions';
import ReactTooltip from 'react-tooltip';
import userActions from '../redux/actions/userActions';

const Product = (props) => {
    const [article, setArticle] = useState({})
    const [renderComment, setRenderComment] = useState([])
    const [comment, setComment] = useState({ comment: "", token: localStorage.getItem('token') })
    const [reload, setReload] = useState(false)

    const disabled = props.usuarioStatus ? false : true
    const operatorDiscount = article.price - (article.discount / 100) * article.price

    useEffect(() => {
        item()
        fetchComments()
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

    useEffect(()=>{
        scroll()
    },[])

    const scroll = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const item = async () => {
        let response = await props.allProducts()
        let item = response.find(article => article._id === props.match.params.id)
        setArticle(item)
    }

    const buy = () => {
        if (article.units === article.stock) {
            alert("llegaste al stock pa")
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

    const addComment = async (e) => {
        e.preventDefault()
        if (/^\s+|\s+$/.test(comment.comment) || comment.comment === "") {
            alert("You cannot post an empty comment")
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
                    <p className={operatorDiscount === 0 ? "priceProduct" : "priceProductD"}>£ {article.price}</p>
                    <p style={{fontSize: "25px"}}>£ {operatorDiscount}</p>
                    <p style={{color: "red"}}>{article.discount}% discount</p>
                    <div className="buyNowProduct">
                        <button onClick={buy}>add to cart</button>
                    </div>
                    <div className="infoProduct">
                        <h3 >{article.name}</h3>
                    </div>
                    <div className="descProduct">
                        <p>{article.description}</p>
                    </div>
                    <div className="cardContainer">
                        {
                            imgCard.map((card)=> <div className="cardProduct" style={{backgroundImage: `url(${card})`}}></div> )
                        }
                    </div>
                </div>
            </div>
            <div className="inputProduct">
                <div>
                    {
                        renderComment.map(comment => <Comment
                            key={comment._id}
                            deleteComment={deleteComment}
                            comment={comment}
                            updateComment={updateComment}
                            usuarioStatus={props.usuarioStatus}
                        />)
                    }
                </div>
                <div className="textTareaConteiner">
                    <div className="avatarComment">
                        <div style={{ backgroundImage: `url(${imgUser})` }} className="avatarImgComment"></div>
                        <p style={{ color: "white", marginTop: "2px" }}>{props.usuarioStatus ? props.usuarioStatus.user : "Explore.com"}</p>
                    </div>
                    <input className="textInput" onChange={readInput} value={comment.comment} name="comment" placeholder="Hello!" disabled={props.usuarioStatus ? false : true} required />
                </div>
                <div className="divSend">
                    <button className="buttonSend" onClick={addComment}>send</button>
                </div>
            </div>
            <ReactTooltip />
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