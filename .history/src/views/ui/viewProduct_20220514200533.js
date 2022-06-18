import React, { useEffect, useState, useForm } from "react";
const ViewProduct = (props) => {
  const [idProduct, setIdProduct] = useState(props.idProduct);
  return (
    <div>
      <h1>Product {props.idProduct}</h1>
    </div>
  );
};
export default ViewProduct;
