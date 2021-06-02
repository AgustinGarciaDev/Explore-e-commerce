import { useState, useEffect } from "react"

const Comment = (props) => {
    const { updateComment , userLogged, deleteComment, comment, setLegitimateUser, legitimateUser } = props
    const [modify, setModify] = useState(false)
    const [modifyComment, setmodifyComment] = useState({ comment: comment.comment })

    /*     useEffect(() => {
            if (userLogged && (comment.userId === userLogged.id)) {
                setLegitimateUser(true)
            }
        }, [legitimateUser]) */

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
                /* (userLogged && legitimateUser) && */
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