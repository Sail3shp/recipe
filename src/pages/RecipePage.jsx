import { useContext } from "react"
import { RecipeContext } from "../App"
import { useParams } from "react-router"
import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"

const RecipePage = () => {
  const { recipes,savedRecipes } = useContext(RecipeContext)
  const { id } = useParams()
  const selectedRecipe = recipes.find(recipe => recipe.idMeal === id)
  const selectedUserRecipe = savedRecipes.find(savedRecipe => savedRecipe.id === id)
  const isUserRecipe = !!selectedUserRecipe
  console.log(selectedRecipe)
  if (!selectedRecipe && !selectedUserRecipe) {
  return (
    <div className="text-white min-h-screen flex justify-center items-center">
      <p>Recipe not found or still loading...</p>
    </div>
  )
}


  return (
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center py-10 px-4">

  <div className="max-w-4xl w-full bg-gray-900 rounded-xl shadow-lg p-6 md:p-10 space-y-6">
    <Link to="/" className="flex"><ArrowLeft className="mr-2"/>  Back to recipe list
    </Link>
    <div className="w-full">
      <img
        src={isUserRecipe ? selectedUserRecipe.imageUrl : selectedRecipe.strMealThumb}
        alt={isUserRecipe? selectedUserRecipe.meal : selectedRecipe.strMeal}
        className="w-full h-100 object-cover rounded-lg shadow-md"
      />
    </div>

    <div>
      <h1 className="text-3xl md:text-4xl font-bold">{isUserRecipe ? selectedUserRecipe.meal : selectedRecipe.strMeal}</h1>
      <p className="text-gray-400 text-md mt-1">{isUserRecipe ? selectedUserRecipe.category : selectedRecipe.strCategory}</p>
    </div>

    <div>
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      {isUserRecipe ? (
                    <p className="text-gray-300">{selectedUserRecipe.ingredients}</p>

      ):
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {Array.from({ length: 20 }, (_, i) => {
          const ingredient = selectedRecipe[`strIngredient${i + 1}`];
          const measure = selectedRecipe[`strMeasure${i + 1}`];
          return (
            ingredient && ingredient.trim() !== "" && (
              <li key={i}>
                {measure} {ingredient}
              </li>
            )
          );
        })}
      </ul>
      }
    </div>

    <div>
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-300 whitespace-pre-line leading-relaxed">
        {isUserRecipe ? selectedUserRecipe.instructions : selectedRecipe.strInstructions}
      </p>
    </div>
  </div>
</div>
  )
}

export default RecipePage