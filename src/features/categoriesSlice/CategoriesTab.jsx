import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectAllCategoriesIds, selectCategoryById } from "./categoriesSlice"

const CategoryExcerpt = ({categoryId}) => {
    const category = useSelector(state => selectCategoryById(state, categoryId))
    return(
        <li><Link to={category.id}>{category.title}</Link></li>
    )
}

export const CategoriesTab = () => {
    const categoriesIds = useSelector(selectAllCategoriesIds)

    const renderedCategory = categoriesIds.map(categoryId =>( 
        <CategoryExcerpt key={categoryId} categoryId={categoryId}/>)
    )

    return(
        <div>
            <h2>Category List</h2>
            <ul>
                {renderedCategory}
            </ul>
        </div>
    )
}