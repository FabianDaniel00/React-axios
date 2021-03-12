import "./App.css";
import AddProduct from "./components/AddProduct";
import { GetProducts } from "./components/GetProducts";
import { UpdateProduct } from "./components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <div className="forms">
        <AddProduct />
        <UpdateProduct />
      </div>
      <GetProducts />
    </div>
  );
}

export default App;
