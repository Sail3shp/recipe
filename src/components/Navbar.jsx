import { Link } from "react-router"
const Navbar = () => {
  return (
    <header className="sticky z-50 top-0 w-full bg-gray-900 shadow-lg border-b border-emerald-800">
        <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap justify-between items-center">
                <Link to="/"
                     className="text-2xl font-bold text-emerald-400 items-center flex" >RecipeApp
                </Link>
                <nav className="flex flex-wrap items-center gap-4">
                    <Link to='/form' className=" text-gray-200 hover:text-emerald-500 transition duration-300 ease-in-out">Add recipe</Link>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Navbar