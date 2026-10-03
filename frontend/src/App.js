import {BrowserRouter, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
