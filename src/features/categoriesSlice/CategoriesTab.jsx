import { useSelector } from "react-redux"
import { selectAllCategoriesIds, selectCategoryById } from "./categoriesSlice"

const CategoryExcerpt = ({categoryId}) => {
    const category = useSelector(state => selectCategoryById(state, categoryId))
    return(
        <li>{category.title}</li>
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