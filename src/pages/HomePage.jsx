import CardComponent from "../components/CardComponent";
import { useContext, useState, useEffect, useMemo } from "react";
import { RecipeContext } from "../App";
import { Search, Loader } from "lucide-react";

const HomePage = () => {
  const { recipes, loading, savedRecipes } = useContext(RecipeContext);

  const allRecipes = useMemo(() => {
    const normalized = [
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

    const deduped = Array.from(
      new Map(normalized.map(recipe => [recipe.idMeal, recipe])).values()
    )

    return deduped;
  }, [recipes, savedRecipes])

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe =>
      recipe?.strMeal?.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  }, [allRecipes, debouncedQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-700">
        <Loader className="animate-spin h-12 w-12 text-white" />
      </div>
    )
  }

  return (
    <div className="bg-gray-600 min-h-screen">
      <div className="relative z-0 rounded-md mx-10 py-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-300" aria-hidden="true" />
        </div>
        <input
          type="text"
          className="w-1/2 px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
              rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none 
              focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          placeholder="Search recipe name"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-10 pb-10">
        {filteredRecipes.length === 0 ? (
          <p className="text-white col-span-full text-center">No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <CardComponent
              key={`${recipe.idMeal}-${recipe.strMeal}`}
              recipe={recipe}
              isUserRecipe={recipe.isUserRecipe}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage
