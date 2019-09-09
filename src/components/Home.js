import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Row,
  FormFeedback,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import _ from "underscore";

function Home(props) {
  let [data, setData] = useState([]);
  let [initialData, setInitialData] = useState([]);
  let [propertyValue, setPropertyValue] = useState("");
  let [propertyType, setPropertyType] = useState("id");
  let [invalid, setInvalid] = useState(false);

  const handlePropertyClickThrottled = () => {
    _.throttle(handlePropertyClick(), 1000);
  };

  // Get initial list of data and store to state
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(data => {
        setData(data.data);
        setInitialData(data.data);
      })
      .catch(error => {
        // Error handler for the API get/response in the console
        console.log(error);
      });
  }, []);

  // Filter posts lists when user searches by userId
  const handleChange = e => {
    let arr2 = [];
    if (e.target.value.length > 0) {
      let arr = initialData;
      arr2 = arr.filter(r => {
        return r.userId.toString().includes(e.target.value);
      });
    } else {
      arr2 = initialData;
    }
    setData(arr2);
  };

  const handleSelectChange = e => {
    setPropertyType(e.target.value);
  };

  const handlePropertyChange = e => {
    if (e.target.value.length > 0) {
      setInvalid(false);
    }
    setPropertyValue(e.target.value);
  };

  // Ping the API to get data based on the property type & property value the user requested, after checking the 'value' input is not blank
  const handlePropertyClick = () => {
    console.log("click");
    if (propertyValue.length > 0) {
      setInvalid(false);
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?${propertyType}=${propertyValue}`
        )
        .then(data => {
          setData(data.data);
        })
        .catch(error => {
          // Error handler for the API get/response in the console
          console.log(error);
        });
    } else {
      setInvalid(true);
    }
  };

  const handleResetList = () => {
    setData(initialData);
  };

  return (
    <Container className="mainContainer">
      <Form>
        <FormGroup>
          <Label>
            <strong>Filter by user id</strong>
          </Label>
          <Input
            type="text"
            name="userId"
            placeholder="user id..."
            onChange={handleChange}
          />
        </FormGroup>
        <Row>
          <Col xs="5">
            <FormGroup>
              <Label>
                <strong>Select property</strong>
              </Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={handleSelectChange}
              >
                <option>id</option>
                <option>userId</option>
                <option>title</option>
                <option>body</option>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="5">
            <Label>
              <strong>Property value</strong>
            </Label>
            <Input
              invalid={invalid}
              type="text"
              name="property"
              placeholder="property..."
              onChange={handlePropertyChange}
            />
            {invalid && (
              <FormFeedback id="formFeedback">
                Please input a value
              </FormFeedback>
            )}
          </Col>
          <Col xs="2">
            <Button
              className="submitButton"
              color="primary"
              id="submitBtn"
              onClick={handlePropertyClickThrottled}
            >
              Filter
            </Button>{" "}
            <Button
              className="submitButton"
              color="secondary"
              onClick={handleResetList}
            >
              Reset
            </Button>{" "}
          </Col>
        </Row>
      </Form>
      <Row>
        {data.length > 0 ? (
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>userId</th>
                  <th>Title</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((r, i) => {
                    return (
                      <tr key={r.id}>
                        <th scope="row">{i}</th>
                        <td>{r.userId}</td>
                        <td>{r.title}</td>
                        <td>
                          <Link to={{ pathname: "/post", state: { id: r.id } }}>
                            <Button color="primary">More Info</Button>{" "}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        ) : (
          <h3>
            No posts found for the values you searched. Try something different
            😉
          </h3>
        )}
      </Row>
    </Container>
  );
}

export default Home;
