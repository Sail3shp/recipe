import { useState, useEffect, createContext } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import Layout from './components/Layout'
import RecipeFormPage from './pages/RecipeFormPage'
import { useNavigate } from 'react-router'

export const RecipeContext = createContext(null)

function App() {
  const [recipes, setRecipes] = useState([])
  let navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userRecipe, setUserRecipe] = useState({
    meal: '',
    category: '',
    ingredients: '',
    instructions: '',
    imageUrl: '',
  })
  const [savedRecipes, setSavedRecipes] = useState([])

  /*const handleSubmit = (e) => {
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
    console.log(userRecipe)
    console.log(userInput)

  }*/

  useEffect(() => {
    const stored = localStorage.getItem('userRecipes')
    if (stored) {
      setSavedRecipes(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let result = []
      const url = 'https://www.themealdb.com/api/json/v1/1/random.php'
      for (let i = 0; i < 10; i++) {
        const response = await fetch(url)
        const data = await response.json()
        result.push(data.meals[0])
      }
      setRecipes(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleDeleteRecipe = (idToDelete) => {
    const updated = savedRecipes.filter(recipe => recipe.id !== idToDelete)
    setSavedRecipes(updated)
    localStorage.setItem('userRecipes', JSON.stringify(updated))
  }

  return (
    <RecipeContext.Provider value={{ recipes, loading, userRecipe, setUserRecipe,  savedRecipes, handleDeleteRecipe ,setSavedRecipes}}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/recipedetail/:id' element={<RecipePage />} />
          <Route path='/form/:id?' element={<RecipeFormPage />} />
        </Route>
      </Routes>
    </RecipeContext.Provider>

  )
}

export default App
