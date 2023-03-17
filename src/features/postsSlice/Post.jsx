import { useLoaderData } from "react-router-dom"

export const Post = () => {

    const postId = useLoaderData()


    return(
        <div>
             <h3>{postId && `El id del post es ${postId}`}</h3>
        </div>
    )
}