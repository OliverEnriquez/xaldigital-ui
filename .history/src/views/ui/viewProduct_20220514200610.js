import React, { useEffect, useState, useForm } from "react";
const ViewProduct = (props) => {
  const [idProduct, setIdProduct] = useState(props.idProduct);
  return (
    <div>
      <h1 value={idProduct}> </h1>
    </div>
  );
};
export default ViewProduct;
