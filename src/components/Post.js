import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { BrowserRouter as Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${this.props.location.state.id}`
      )
      .then(data => {
        this.setState({ data: data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container className="mainContainer">
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <Row>
          <Col>
            <h1>{this.state.data.title}</h1>
            <p>{this.state.data.body}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
