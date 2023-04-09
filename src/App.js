import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./components/Routes/Routes";
import Sidebar from "./components/Sidebar/Sidebar";
import { getCategories } from "./features/categories/categoriesSlice";
import { getProducts } from "./features/products/productsSlice";
import UserForm from "./components/User/UserForm";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <UserForm />

      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
