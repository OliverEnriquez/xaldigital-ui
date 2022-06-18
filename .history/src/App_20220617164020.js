import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import React, { useEffect, useState, useForm } from "react";

const App = () => {
  const routing = useRoutes(ThemeRoutes);

  return (
    <div>
      <div className="dark">{routing}</div>
    </div>
  );
};

export default App;
