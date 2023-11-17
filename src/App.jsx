import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import { ChakraProvider, Table } from "@chakra-ui/react";

import Login from "./Components/Login";
import Register from "./Components/Register";
import MyTable from "./Components/MyTable";
function App() {
  const [users, setUsers] = useState([]);
  const [isLogged, setIsLogged] = useState(true);
  const [checkProduct, setCheckProduct] = useState(false);

  useEffect(() => {
    axios(
      "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/userss"
    ).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <ChakraProvider>
      {isLogged ? (
        checkProduct ? (
          <MyTable />
        ) : (
          <Login
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            users={users}
            setUsers={setUsers}
            checkProduct={checkProduct}
            setCheckProduct={setCheckProduct}
          />
        )
      ) : (
        <Register
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          users={users}
          setUsers={setUsers}
        />
      )}
    </ChakraProvider>
  );
}

export default App;
