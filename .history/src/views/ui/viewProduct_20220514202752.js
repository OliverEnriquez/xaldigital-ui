import React, { useEffect, useState, useForm, useNavigationParam } from "react";
import { useLocation } from "react-router-dom";
function ViewProduct(props) {
  const [idProduct, setIdProduct] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIdProduct(location.state.id);
  }, []);

  return (
    <div>
      <h1> Helloo</h1>
      <h1> {idProduct}</h1>
    </div>
  );
}
export default ViewProduct;
