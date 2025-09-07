import { Link } from "react-router"
const RecipeCard = ({ recipe }) => {
  console.log(recipe.strMeal)
  return (
    <div className="flex flex-col max-w-70 bg-gray-300 max-h-80  mt-2 space-y-4 mb-2 rounded-md mx-auto ">
      <Link to={`recipedetail/${recipe.idMeal}`}>
        <img src={recipe.strMealThumb} alt="" className="rounded-xl w-70 h-40 object-cover p-1 " />
        <h1 className="font-bold md:text-2xl m-2 text-xl">{recipe.strMeal}</h1>
        <p className="text-sm text-gray-500 m-2"> {recipe.strCategory}</p>
        <div className="flex  justify-end m-2">
        </div>
      </Link >
    </div>
  )
}

export default RecipeCard