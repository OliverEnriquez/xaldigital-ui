import React, { useEffect, useState, useForm } from "react";
const ViewProduct = (props) => {
  const [idProduct, setIdProduct] = useState(props.idProduct);

  useEffect(() => {
    setIdProduct(8);
  }, []);

  return (
    <div>
      <h1> Helloo</h1>
    </div>
  );
};
export default ViewProduct;
