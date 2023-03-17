import "./App.css";
import { Header } from "./components/Header";
import { CategoriesTab } from "./features/categoriesSlice/CategoriesTab";
import { fetchCategories } from "./features/categoriesSlice/categoriesSlice";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { fetchPostsFromCategory } from "./features/postsSlice/postsSlice";

function App() {

  const dispatch = useDispatch()


  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={'post/1'}>Ir a post 1</Link>
          </li>
        </ul>
      </nav>
      <Header/>
      <CategoriesTab />

      <button onClick={() => dispatch(fetchPostsFromCategory('/r/redditdev'))}>FETCH POSTS</button>
      <div>
        <h3>Aca va un post</h3>
        <div>
          <Outlet />
        </div>
      </div>
    </div>

  );
}

export default App;
