import "./App.css";
import { Header } from "./components/Header";
import { SubredditsTab } from "./components/SubredditsTab";
import { CardsList } from "./components/CardsList";

import { useGetPageByNameQuery } from "./services/reddit";
import { fetchCategories } from "./features/categoriesSlice/categoriesSlice";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch()
  // const { data, error, isLoading } = useGetPageByNameQuery("popular");
  
  // console.log(data);


  return (
    <div>
      <Header/>
      <SubredditsTab />
      <CardsList/>
      <button onClick={() => dispatch(fetchCategories())}>FETCH CATEGORIES</button>
    </div>
    // <div className='App'>
    //   {error ? (
    //     <>Oh no, there was an error</>
    //   ) : isLoading ? (
    //     <>Loading...</>
    //   ) : data ? (
    //     <>
    //       {data.data.children.map(post => (
    //         <div>
    //         <h1>{post.data.title}</h1>
    //         <img src={post.data.thumbnail} alt="" />
    //         </div>
    //         ))}
    //     </>
    //   ) : null}
    // </div>
  );
}

export default App;
