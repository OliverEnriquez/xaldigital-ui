import React, { useEffect, useState, useForm } from "react";
const ViewProduct = (props) => {
  const [idProduct, setIdProduct] = useState(0);

  useEffect(() => {
    setIdProduct(78);
  }, []);

  return (
    <div>
      <h1> Helloo</h1>
      <h1> {idProduct}</h1>
    </div>
  );
};
export default ViewProduct;
