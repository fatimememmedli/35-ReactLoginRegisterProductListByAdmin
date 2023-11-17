import React from "react";
import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

function Login({
  checkProduct,
  setCheckProduct,
  users,
  setUsers,
  setIsLogged,
  islogged,
}) {
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  return (
    <div className="container">
      <div>
        <h1 style={{ color: "white", fontWeight: "bold" }}>Login</h1>
      </div>
      <Input
        onChange={(e) => {
          e.preventDefault();
          console.log(e.target.value);
          setLoginName(e.target.value);
        }}
        style={{ color: "white" }}
        placeholder="enter username"
        size="md"
      />
      <Input
        onChange={(e) => {
          e.preventDefault();
          console.log(e.target.value);
          setLoginPass(e.target.value);
        }}
        placeholder="enter password"
        size="md"
        style={{ color: "white" }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          users.forEach((elem) => {
            if (elem.username == loginName && elem.password == loginPass) {
              //   setIsLogged(false);
              setCheckProduct(true);
            }
          });
        }}
        colorScheme="purple"
      >
        Login
      </Button>
      <Button
        onClick={() => {
          setIsLogged(false);
        }}
        colorScheme="red"
      >
        Register
      </Button>
    </div>
  );
}

export default Login;
