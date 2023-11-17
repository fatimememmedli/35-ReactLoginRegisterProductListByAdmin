import React from "react";
import "../../src/MyTable.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { color } from "framer-motion";
function MyTable() {
  const [postName, setPostName] = useState("");
  const [postPrice, setPostPrice] = useState("");
  const [postStock, setPostStock] = useState("");
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  useEffect(() => {
    axios(
      "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/products"
    ).then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <div>
      <div className="table-container">
        <h1 style={{ fontWeight: "bold", marginBottom: "20px" }}>Table</h1>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>PRICE</Th>
                <Th isNumeric>STOCK</Th>
                <Th isNumeric>EDIT</Th>
                <Th isNumeric>DELETE</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((elem) => {
                return (
                  <>
                    <Tr
                      key={uuidv4()}
                      bg={elem.sale ? "green" : "white"}
                      color={elem.stockCount < 10 ? "red" : "black"}
                    >
                      <Td>{elem.id}</Td>
                      <Td>{elem.name}</Td>
                      <Td isNumeric>{elem.price}</Td>
                      <Td isNumeric>{elem.stockCount}</Td>
                      <Td>
                        <Button
                          data-id={elem.id}
                          onClick={(e) => {
                            let x = products.find(
                              (element) =>
                                element.id == e.target.getAttribute("data-id")
                            );
                            setEditName(x.name);
                            setEditPrice(x.price);
                            setEditStock(x.stockCount);
                            setEdit(true);
                          }}
                          colorScheme="blue"
                        >
                          Edit
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          data-id={elem.id}
                          colorScheme="red"
                          onClick={(e) => {
                            let array = [...products];
                            e.preventDefault();
                            array = array.filter(
                              (element) =>
                                element.id != e.target.getAttribute("data-id")
                            );
                            setProducts(array);
                            axios.delete(
                              "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/products/" +
                                e.target.getAttribute("data-id")
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                    {edit ? (
                      <div className="edit-inputs">
                        <Input
                          value={editName}
                          onChange={(e) => {
                            setEditName(e.target.value);
                            e.preventDefault();
                          }}
                          placeholder="Name"
                          size="md"
                        />
                        <Input
                          onChange={(e) => {
                            setEditPrice(e.target.value);
                            e.preventDefault();
                          }}
                          value={editPrice}
                          placeholder="Price"
                          size="md"
                        />
                        <Input
                          onChange={(e) => {
                            setEditStock(e.target.value);
                            e.preventDefault();
                          }}
                          value={editStock}
                          placeholder="Stock"
                          size="md"
                        />
                        <Button
                          data-id={elem.id}
                          // onClick={(e) => {
                          // let obj = {
                          //   name: editName,
                          //   price: editPrice,
                          //   stockCount: editStock,
                          // };
                          // axios.post(
                          //   "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/products/" +
                          //     e.target.getAttribute("data-id"),
                          //   obj
                          // );
                          // }}
                          colorScheme="teal"
                          variant="outline"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            setEdit(false);
                          }}
                          colorScheme="teal"
                          variant="outline"
                        >
                          exit
                        </Button>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div className="post-inputs">
        <Input
          onChange={(e) => {
            e.preventDefault();
            setPostName(e.target.value);
          }}
          placeholder="Product Name"
          size="md"
        />
        <Input
          onChange={(e) => {
            e.preventDefault();
            setPostPrice(e.target.value);
          }}
          type="number"
          placeholder="Product Price"
          size="md"
        />
        <Input
          onChange={(e) => {
            e.preventDefault();
            setPostStock(e.target.value);
          }}
          type="number"
          placeholder="Product Stock Count"
          size="md"
        />
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          let obj = {
            name: postName,
            price: postPrice,
            stockCount: postStock,
          };

          axios
            .post(
              "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/products",
              obj
            )
            .then((res) => {
              setProducts([...products, res.data]);
            });
        }}
        colorScheme="teal"
        variant="outline"
      >
        Post
      </Button>
    </div>
  );
}

export default MyTable;
