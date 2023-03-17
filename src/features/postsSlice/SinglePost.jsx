import { useLoaderData } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectPostById } from "./postsSlice";


export const SinglePost = () => {
    const postId = useLoaderData()
    const post = useSelector(state => selectPostById(state, postId))

    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <img src={post.img} alt=""  style={{width: '50%'}}/>
        </div>
    )
}