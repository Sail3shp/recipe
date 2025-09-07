import { EditIcon,Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { useContext } from "react"
import { RecipeContext } from "../App"
const CardComponent = ({recipe}) => {
    const {handleDeleteRecipe} = useContext(RecipeContext)

    /*const id = isUserRecipe ? recipe.id : recipe.idMeal
    const title = isUserRecipe ? recipe.meal : recipe.strMeal
    const category = isUserRecipe ? recipe.category : recipe.strCategory 
    const image = isUserRecipe ? recipe.imageUrl : recipe.strMealThumb
    */
  return (
    <div className="flex flex-col max-w-70 bg-gray-300 max-h-80 mt-2 space-y-4 mb-2 rounded-md ">
      <Link to={`recipedetail/${recipe.idMeal}`}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-xl w-70 h-40 object-cover p-1" />
        <h1 className="font-bold md:text-2xl m-2 text-xl">{recipe.strMeal}</h1>
        <p className="text-sm text-gray-500 m-2">{recipe.strCategory}</p>
      </Link>

      {recipe.isUserRecipe && (
        <div className="flex justify-end m-2 space-x-2">
          <Link to={`/form/${recipe.idMeal}`}>
            <EditIcon className="size-6" />
          </Link>
          <button onClick={() => handleDeleteRecipe(recipe.idMeal)} className="cursor-pointer">
            <Trash2Icon className="size-6" />
          </button>
        </div>
  )}
  </div>
  )
}


export default CardComponent