import React, { useEffect, useState, useForm, useNavigationParam } from "react";
import { useLocation } from "react-router-dom";
const ViewProduct = (props) => {
  const [idProduct, setIdProduct] = useState(0);

  useEffect(() => {
    setIdProduct(location.idProduct);
  }, []);

  return (
    <div>
      <h1> Helloo</h1>
      <h1> {idProduct}</h1>
    </div>
  );
};
export default ViewProduct;
