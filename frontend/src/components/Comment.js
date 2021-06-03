import { useState, useEffect } from "react"

const Comment = (props) => {
    const { updateComment, usuarioStatus, deleteComment, comment, setLegitimateUser, legitimateUser } = props
    const [modify, setModify] = useState(false)
    const [modifyComment, setmodifyComment] = useState({ comment: comment.comment })

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

    return (
        <div className="commentConteiner">
            <div>
                <div className="imgUserComment" style={{ backgroundImage: `url(${comment.userId ? comment.userId.urlImg : "https://i.pinimg.com/originals/0f/61/31/0f6131023edac341954285cf2d97c8e3.jpg"})` }}></div>
                <p>{comment.userId ? comment.userId.user : "Explore.com"}</p>
            </div>
            <div className="comment">
                {
                    modify &&
                    <input
                        className="modifyComment"
                        type="text"
                        onKeyPress={enter}
                        onChange={readInput}
                        value={modifyComment.comment}
                        name="comment"
                    />
                }
                <p>{comment.comment}</p>
            </div>
            {
                (usuarioStatus && legitimateUser) &&
                <div className="DivEditAndDelete">
                    <div className="buttonCloseOn">
                        <p onClick={() => deleteComment(comment._id)}>X</p>
                    </div>
                    <div className="buttonCloseOn">
                        <p onClick={() => setModify(!modify)}>edit</p>
                    </div>
                </div>
            }
        </div>
    )

}

export default Comment