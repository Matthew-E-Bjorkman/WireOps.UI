import React from "react";
import "../../style/Products.css";
import {
  useGetProductByIdQuery,
  useGetProductListQuery,
} from "../../store/productSlice.tsx";

export default function Products() {
  const { data, error, isLoading } = useGetProductByIdQuery(
    "f90d2cb5-55db-466e-9c18-5ca4a4903279"
  );

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
        <ul>
          <li>{data.id}</li>
          <li>{data.name}</li>
        </ul>
      )}
    </>
  );
}
