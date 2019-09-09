import React from "react";
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
  Input,
  FormText
} from "reactstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as _ from "underscore";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      initialData: [],
      propertyValue: "",
      propertyType: "id",
      invalid: false
    };
    this.handlePropertyClickThrottled = _.throttle(
      this.handlePropertyClick,
      1000
    );
  }

  // Get initial list of data and store to state
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(data => {
        this.setState({ data: data.data, initialData: data.data });
      })
      .catch(error => {
        // Error handler for the API get/response in the console
        console.log(error);
      });
  }

  // Filter posts lists when user searches by userId
  handleChange = e => {
    let arr2 = [];
    if (e.target.value.length > 0) {
      let arr = this.state.initialData;
      arr2 = arr.filter(r => {
        return r.userId.toString().includes(e.target.value);
      });
    } else {
      arr2 = this.state.initialData;
    }
    this.setState({ data: arr2 });
  };

  handleSelectChange = e => {
    this.setState({ propertyType: e.target.value });
  };

  handlePropertyChange = e => {
    if (e.target.value.length > 0) {
      this.setState({ invalid: false });
    }
    this.setState({ propertyValue: e.target.value });
  };

  // Ping the API to get data based on the property type & property value the user requested, after checking the 'value' input is not blank
  handlePropertyClick = () => {
    if (this.state.propertyValue.length > 0) {
      this.setState({ invalid: false });
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?${this.state.propertyType}=${this.state.propertyValue}`
        )
        .then(data => {
          this.setState({ data: data.data });
        })
        .catch(error => {
          // Error handler for the API get/response in the console
          console.log(error);
        });
    } else {
      this.setState({ invalid: true });
    }
  };

  handleResetList = () => {
    this.setState({ data: this.state.initialData });
  };

  render() {
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
              onChange={this.handleChange}
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
                  onChange={this.handleSelectChange}
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
                invalid={this.state.invalid}
                type="text"
                name="property"
                placeholder="property..."
                onChange={this.handlePropertyChange}
              />
              {this.state.invalid && (
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
                onClick={this.handlePropertyClickThrottled}
              >
                Filter
              </Button>{" "}
              <Button
                className="submitButton"
                color="secondary"
                onClick={this.handleResetList}
              >
                Reset
              </Button>{" "}
            </Col>
          </Row>
        </Form>
        <Row>
          {this.state.data.length > 0 ? (
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
                  {this.state.data.length > 0 &&
                    this.state.data.map((r, i) => {
                      return (
                        <tr key={r.id}>
                          <th scope="row">{i}</th>
                          <td>{r.userId}</td>
                          <td>{r.title}</td>
                          <td>
                            <Link
                              to={{ pathname: "/post", state: { id: r.id } }}
                            >
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
              No posts found for the values you searched. Try something
              different 😉
            </h3>
          )}
        </Row>
      </Container>
    );
  }
}

export default Home;
