import React, { useEffect, useState, useForm, useNavigationParam } from "react";
const ViewProduct = (props) => {
  const [idProduct, setIdProduct] = useState(0);

  useEffect(() => {
    setIdProduct(this.props.navigation.navigate("idProduct"));
  }, []);

  return (
    <div>
      <h1> Helloo</h1>
      <h1> {idProduct}</h1>
    </div>
  );
};
export default ViewProduct;
