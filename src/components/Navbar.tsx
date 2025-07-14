import { Link } from "react-router-dom";

export const Navbar = () => (
    // <div  className="flex flex-row w-full bg-gray-200 px-2 py-2">
    //     <ul className="flex flex-1/2 space-x-1">
    //         <li>Logo</li>
    //         <li>
    //             <a href="/">Home</a>
    //         </li>
    //         <li>
    //             <a href="/about">About</a>
    //         </li>
    //     </ul>
    // </div>
    <>
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                <div className="flex justify-between h-14">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center text-indigo-600">
                        <Link to="/">Logo</Link>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:space-x-4 items-center" >
                        <Link to="/" className="text-gray-500 hover:text-indigo-600">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/signin">SignIn</Link>
                        <Link to="/signup">SignUp</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                    {/* Mobile Meni */}
                    <div>Menu Mobile</div>
                </div>
            </div>
        </nav>
    </>
)