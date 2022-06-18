import React, { useEffect, useState, useForm } from "react";
import { useNavigationParam } from "react-router-dom";
const ViewProduct = (props) => {
  const [idProduct, setIdProduct] = useState(0);
  const id = useNavigationParam("idProduct");

  useEffect(() => {
    setIdProduct(id);
  }, []);

  return (
    <div>
      <h1> Helloo</h1>
      <h1> {idProduct}</h1>
    </div>
  );
};
export default ViewProduct;
