import React, { useEffect, useState, useForm } from "react";
const viewProduct = (props) => {
  const [idProduct, setIdproduct] = React.useState("");
  return (
    <div>
      <h1>Product {idProduct}</h1>
    </div>
  );
};
export default viewProduct;
