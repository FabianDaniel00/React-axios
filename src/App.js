import "./App.css";
import AddProduct from "./components/AddProduct";
import { GetProducts } from "./components/GetProducts";
import { UpdateProduct } from "./components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "sticky",
          top: "0",
          margin: "20px",
          maxWidth: "500px",
        }}
      >
        <AddProduct />
        <UpdateProduct />
      </div>
      <GetProducts />
    </div>
  );
}

export default App;
