import { useState, useEffect } from "react"
import swal from 'sweetalert'

const Comment = (props) => {
    const { updateComment, usuarioStatus, deleteComment, comment } = props
    const [modify, setModify] = useState(false)
    const [modifyComment, setmodifyComment] = useState({ comment: comment.comment })
    const [legitimateUser, setLegitimateUser] = useState(false)

    useEffect(() => {
        if (usuarioStatus && (comment.userId.email === usuarioStatus.email)) {
            setLegitimateUser(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [legitimateUser])

    const readInput = (e) => {
        e.preventDefault()
        let value = e.target.value
        setmodifyComment({
            comment: value
        })
    }

    const enter = (e) => {
        if (e.key === "Enter") {
            updateComment(comment._id, modifyComment)
            setModify(false)
        }
    }

    
    const confirmDeleteMessage = () => {
        swal("Are you sure you want to delete the comment?", {
            buttons: {
                goback: {
                    text: "go back",
                    value: "goback",

                },
                confirm: {
                    text: "Delete",
                    value: "confirm"
                }
            },
        })
            .then((value) => {
                switch (value) {
                    case "confirm":
                        deleteComment(comment._id)
                        break;

                    default:
                        break;
                }
            });
    }

    return (
        <div className="commentConteiner">
            <div>
                <div className="imgUserComment" style={{ backgroundImage: `url(${comment.userId ? comment.userId.urlImg : "https://i.pinimg.com/originals/0f/61/31/0f6131023edac341954285cf2d97c8e3.jpg"})` }}></div>
            </div>
            <div className="comment">
                <p className="commentAuthor">{comment.userId ? comment.userId.user : "Explore.com"}</p>
                {
                    modify
                        ?
                        <input
                            className="modifyComment"
                            type="text"
                            onKeyPress={enter}
                            onChange={readInput}
                            value={modifyComment.comment}
                            name="comment"
                        />
                        :
                        <p>{comment.comment}</p>
                }
            </div>
            {
                (usuarioStatus && legitimateUser) &&
                <div className="DivEditAndDelete">
                    <div className="buttonCloseOn">
                        {
                            modify
                                ?
                                <span onClick={() => setModify(!modify)} className="material-icons">close</span>
                                :
                                <span onClick={() => confirmDeleteMessage()} className="material-icons">close</span>
                        }
                    </div>
                    <div className="buttonCloseOn">
                        <span onClick={() => setModify(!modify)} className="material-icons">edit</span>
                    </div>
                </div>
            }
        </div>
    )

}

export default Comment