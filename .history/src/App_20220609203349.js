import { useRoutes } from "react-router-dom";
import LoginRouter from "./routes/LoginRouter";
import ThemeRoutes from "./routes/Router";
import React, { useEffect, useState, useForm } from "react";
import AuthService from "./services/auth.service";


const App = () => {
  const routing = useRoutes(ThemeRoutes);
  const routingLogin = useRoutes(LoginRouter);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };



  return (
    <div>
       {currentUser &&
                      <div className="dark">{routing}</div>
                    }

<div className="dark">{routingLogin}</div>
    </div>
   
  )
};

export default App;
