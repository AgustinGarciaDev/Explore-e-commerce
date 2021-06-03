import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { connect } from "react-redux"
import Comment from '../components/Comment';
import Footer from '../components/Footer';
import Header from '../components/Header';
import cartActions from '../redux/actions/cartActions';
import commentsActions from '../redux/actions/commentsActions';
import ReactTooltip from 'react-tooltip';


const Product = (props) => {
    const [article, setArticle] = useState({})
    const [renderComment, setRenderComment] = useState([])
    const [comment, setComment] = useState({ comment: "", token: localStorage.getItem('token') })
    const [legitimateUser, setLegitimateUser] = useState(false)
    const [reload, setReload] = useState(false)

    const disabled = props.usuarioStatus ? false : true

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

    const images = article.productsImages ? article.productsImages.map(image => {
        return {
            original: image.photo,
            thumbnail: image.photo,
        }
    })
        : null

    const liked = (e) => {
        if (disabled === false) {
            console.log(e.target.checked)
            /* setIlike(true) */
        } else {
            alert("logueate para likear maestro")
        }
    }

    const imgUser = props.usuarioStatus ? props.usuarioStatus.img : "https://i.pinimg.com/originals/0f/61/31/0f6131023edac341954285cf2d97c8e3.jpg"

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
                        <h2 data-tip="hello world" >{article.brand}</h2>
                    </div>
                    <p className="priceProduct">$ {article.price}</p>
                    <input type="checkbox" onChange={liked} id="checkbox" disabled={disabled} />
                    <label htmlFor="checkbox">
                        <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                            <g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
                                <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2" />
                                <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />

                                <g id="grp7" opacity="0" transform="translate(7 6)">
                                    <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                                    <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                                </g>

                                <g id="grp6" opacity="0" transform="translate(0 28)">
                                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                                    <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                                </g>

                                <g id="grp3" opacity="0" transform="translate(52 28)">
                                    <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                                    <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                                </g>

                                <g id="grp2" opacity="0" transform="translate(44 6)">
                                    <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                                </g>

                                <g id="grp5" opacity="0" transform="translate(14 50)">
                                    <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                                    <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                                </g>

                                <g id="grp4" opacity="0" transform="translate(35 50)">
                                    <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                                    <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                                </g>

                                <g id="grp1" opacity="0" transform="translate(24)">
                                    <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                                    <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                                </g>
                            </g>
                        </svg>
                    </label>
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
                <div>
                    {
                        renderComment.map(comment => <Comment
                            key={comment._id}
                            deleteComment={deleteComment}
                            comment={comment}
                            updateComment={updateComment}
                            usuarioStatus={props.usuarioStatus}
                            legitimateUser={legitimateUser}
                            setLegitimateUser={setLegitimateUser}
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