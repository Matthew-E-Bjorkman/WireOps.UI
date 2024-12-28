import React from "react";
import "../../style/Products.css";
import {
  useGetProductByIdQuery,
  useGetProductListQuery,
} from "../../store/productSlice.tsx";

export default function Products() {
  const { data, error, isLoading } = useGetProductListQuery();

  console.log(data, error, isLoading);

  return (
    <>
      <div>Product Page WIP</div>

      {isLoading && <div>Loading...</div>}
      {error && (
        <div>
          Error:{" "}
          {String(
            ("status" in error && error.status) ||
              ("data" in error && error.data) ||
              "Unknown error"
          )}
        </div>
      )}
      {data && (
        <div>
          {data.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
