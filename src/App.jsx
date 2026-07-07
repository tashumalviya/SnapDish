import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Index from "./routes/Index.jsx";
import RecipeDetails from "./routes/RecipeDetails.jsx";
import AddRecipe from "./routes/AddRecipe.jsx";
import EditRecipe from "./routes/EditRecipe.jsx";
import Favorites from "./routes/Favorites.jsx";
import Contact from "./routes/Contact.jsx";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like this dish is off the menu.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-warm px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
        >
          Back to kitchen
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
