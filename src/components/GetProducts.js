import { useState, useEffect } from "react";
import axios from "axios";
import { fillUpdateForm } from "./UpdateProduct.js";
import DeleteProduct from "./DeleteProduct.js";

let loadProducts = () => {};

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsMessage, setProductsMessage] = useState(String);

  useEffect(() => {
    loadProducts();

    console.log(process.env);
  }, []);

  loadProducts = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/products`
      )
      .then((response) => {
        setProducts(response.data);
        setProductsLoading(false);
      })
      .catch((err) => {
        setProductsMessage(err.message);
        setProductsLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px" }}>
      <h2>
        <u>All Products: </u>
      </h2>
      {productsLoading ? (
        <span>
          Loading products...
          <i className="fa fa-spinner fa-spin" />
        </span>
      ) : productsMessage ? (
        <span>{productsMessage}</span>
      ) : products.length === 0 ? (
        <span>No data in database!</span>
      ) : (
        products &&
        products.map((product) => {
          return (
            <div key={product.p_id}>
              <div
                onClick={() =>
                  fillUpdateForm(
                    product.p_id,
                    product.p_name,
                    product.p_price,
                    product.p_description
                  )
                }
                className="product"
              >
                <h3>{product.p_name}</h3>
                <span>
                  <i>
                    <b>Price: </b>
                  </i>
                  {product.p_price}
                </span>
                <br />
                <span>
                  <i>
                    <b>Description: </b>
                  </i>
                  {product.p_description}
                </span>
                <br />
                <div style={{ textAlign: "right" }}>
                  <DeleteProduct pId={product.p_id} pName={product.p_name} />
                </div>
              </div>
              <hr />
            </div>
          );
        })
      )}
    </div>
  );
};

export { GetProducts, loadProducts };
