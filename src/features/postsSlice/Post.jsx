
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllPostsIds, selectPostById } from './postsSlice';

export const Post = ({id}) => {

    const post = useSelector(state => state.posts.entities[id])

    return(
        <div>
            <Link to={post.permalink}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <img src={post.img} alt=""  style={{width: '50%'}}/>
           </Link>
        </div>
    )
}