import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Post(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${props.location.state.id}`
      )
      .then(data => {
        setData(data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="mainContainer">
      <Link to="/">
        <Button>Back</Button>
      </Link>
      <Row>
        <Col>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Post;
