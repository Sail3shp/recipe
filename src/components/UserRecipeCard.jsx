import { EditIcon, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { useContext } from "react"
import { RecipeContext } from '../App'

const UserRecipeCard = ({ savedRecipe }) => {
    const { handleDeleteRecipe } = useContext(RecipeContext)
    return (
        <div className="flex flex-col max-w-70 bg-gray-300 max-h-80  mt-2 space-y-4 mb-2 rounded-md mx-auto ">
            <Link to={`recipedetail/${savedRecipe.id}`}>
                <img src={savedRecipe.imageUrl} alt="" className="rounded-xl w-70 h-40 object-cover p-1 " />
                <h1 className="font-bold md:text-2xl m-2 text-xl">{savedRecipe.meal}</h1>
                <p className="text-sm text-gray-500 m-2"> {savedRecipe.category}</p>
            </Link>
            <div className="flex  justify-end m-2">
                <Link to={`/form/${savedRecipe.id}`} ><EditIcon className="size-6" /></Link> 
                  <button className="cursor-pointer" onClick={() => handleDeleteRecipe(savedRecipe.id)}> <Trash2Icon className="size-6" /> </button>
            </div>
        </div>
    )
}

export default UserRecipeCard