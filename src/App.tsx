import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./App.css";
import { AuthProvider } from "@view/contexts/AuthContext";
import { ProductsProvider } from "@view/contexts/ProductsContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <AppRoutes />
          <Toaster />
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
