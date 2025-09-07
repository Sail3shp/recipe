import CardComponent from "../components/CardComponent"
import { useContext, useState ,useEffect } from "react"
import { RecipeContext } from "../App"
import { Search } from "lucide-react"
import { Loader } from "lucide-react"
import { useMemo } from "react"
const HomePage = () => {

  const { recipes, loading, savedRecipes } = useContext(RecipeContext)
  console.log(recipes)
  console.log(savedRecipes)
  const allRecipes = useMemo(() => {
  return [
    ...recipes.map(recipe => ({ ...recipe, isUserRecipe: false })),
    ...savedRecipes.map(recipe => ({
      ...recipe,
      idMeal: recipe.id, 
      strMeal: recipe.meal,
      strCategory: recipe.category,
      strMealThumb: recipe.imageUrl,
      isUserRecipe: true
    }))
  ]
}, [recipes, savedRecipes])

  console.log(allRecipes)

  const[searchQuery,setSearchQuery] = useState('')
  const[debouncedQuery,setDebouncedQuery] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.strMeal.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  if (loading) {
    return <div className=" flex justify-center items-center min-h-screen bg-gray-700"><Loader className="animate-spin h-50 w-50  mx-auto " /></div>
  }


  return (

    <div className="bg-gray-600 ">
      <div className=' relative z-0 rounded-md  mx-10 md:mx-50'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Search className='h-5 w-5 text-gray-300' aria-hidden='true' />
								</div>
								<input
									type='text'
									className='mt-1 w-1/2 px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm text-white
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm'
									placeholder='recipe name'
                  value={searchQuery}
                  onChange={(e)=>setSearchQuery(e.target.value)}
								/>
							</div>


      <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pb-2 md:pb-0 md:mx-30 bg-gray-600">
        {/** {recipes.map(recipe => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
       ))} 
       {savedRecipes.map(savedRecipe => (
        <UserRecipeCard key={savedRecipe.meal} savedRecipe={savedRecipe} />
       ))}
        **/}
        {filteredRecipes.map((recipe, index) => (
          <CardComponent
            key={recipe.idMeal || recipe.id || index}
            recipe={recipe}
            isUserRecipe={recipe.isUserRecipe}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage