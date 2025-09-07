import { useContext, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { RecipeContext } from "../App"
import { ArrowLeft } from "lucide-react"

const RecipeFormPage = () => {
    const { userRecipe, setUserRecipe,savedRecipes,setSavedRecipes } = useContext(RecipeContext)
    const navigate = useNavigate()
    const {id} = useParams()

    const handleSubmit = (e) => {
    e.preventDefault()
    const stored = JSON.parse(localStorage.getItem('userRecipes')) || []

    let updated 
    if(id) {
      updated = stored.map(recipe => recipe.id === id ? {...userRecipe,id}: recipe )
    }else{
      const newRecipe ={
        ...userRecipe,
        id: crypto.randomUUID()
      }
      updated = [...stored,newRecipe]
    }

    localStorage.setItem('userRecipes', JSON.stringify(updated))
    setSavedRecipes(updated)

    setUserRecipe({
      id:'',
      meal: '',
      category: '',
      ingredients: '',
      instructions: '',
      imageUrl: '',
    })
    navigate("/")
    //console.log(userRecipe)
    //console.log(userInput)

  }

    useEffect(()=>{
        if(id){
            const recipeToEdit = savedRecipes.find(recipe => recipe.id === id)
            if(recipeToEdit){
                setUserRecipe(recipeToEdit)
            }
        }else{
            setUserRecipe({
                id:'',
                meal:'',
                category:'',
                ingredients:'',
                instructions:'',
                imageUrl:''
            })
        }
    },[id,savedRecipes])
    return (
        <div className="flex bg-gray-800 min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className=" py-8 px-4 bg-gray-900 max-w-4xl md:mx-50 mx-4 sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit} className="space-y-8 text-gray-300">
                    <Link to='/' className="flex"><ArrowLeft className="mr-2" /> Back to recipe </Link>
                    <div>
                        <label htmlFor="meal" className="block text-sm font-medium text-gray-300">Enter recipe name
                        </label>
                        <input
                            id='meal'
                            required
                            value={userRecipe.meal}
                            onChange={(e) => setUserRecipe(prev => ({
                                ...prev,
                                meal: e.target.value
                            }))}
                            className="block  w-full px-3 py-2 pl-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300">Enter category name
                        </label>
                        <input
                            id='category'
                            required
                            value={userRecipe.category}
                            onChange={(e) => setUserRecipe(prev => ({
                                ...prev,
                                category: e.target.value
                            }))}
                            className="block w-full px-3 py-2 pl-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-300"> Ingredients Used
                        </label>
                        <input
                            id='ingredients'
                            required
                            value={userRecipe.ingredients}
                            onChange={(e) => setUserRecipe(prev => ({
                                ...prev,
                                ingredients: e.target.value
                            }))}
                            className="block w-full px-3 py-2 pl-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-300">Instructions to cook 
                        </label>
                        <input
                            id='instructions'
                            required
                            value={userRecipe.instructions}
                            onChange={(e) => setUserRecipe(prev => ({
                                ...prev,
                                instructions: e.target.value
                            }))}
                            className="block w-full px-3 py-2 pl-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300"> Enter Image Url 
                        </label>
                        <input
                            id='imageUrl'
                            required
                            value={userRecipe.imageUrl}
                            onChange={(e) => setUserRecipe(prev => ({
                                ...prev,
                                imageUrl: e.target.value
                            }))}
                            className="block w-full px-3 py-2 pl-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                        />
                    </div>

                    <button className="border cursor-pointer bg-gray-600  p-2 rounded-lg hover:bg-gray-700" type='submit' >{id? 'update' : 'submit'}</button>


                </form>
            </div>
        </div>
    )
}

export default RecipeFormPage