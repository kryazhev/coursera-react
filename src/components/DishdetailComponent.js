import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Label, Button, Col, Row
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";


const required = (value) => value && value.length;
const maxLength = (length) => (value) => !(value) || value.length <= length;
const minLength = (length) => (value) => (value) && value.length >= length;

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dish.id, values.rating, values.author, values.comment);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        } else if (this.props.errorMessage) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errorMessage}</h4>
                    </div>
                </div>
            );
        } else if (this.props.dish != null) {
            const renderedComments = this.props.comments.map((comment) => {
                return (
                    <li>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {comment.date}</p>
                    </li>
                );
            });
    
            return (
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{this.props.dish.name}</h3>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <Card>
                                    <CardImg top src={baseUrl + this.props.dish.image} alt={this.props.dish.name} />
                                    <CardBody>
                                        <CardTitle>{this.props.dish.name}</CardTitle>
                                        <CardText>{this.props.dish.description}</CardText>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <div>
                                    <h4>Comments</h4>
                                    <ul className="list-unstyled">
                                        {renderedComments}
                                    </ul>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            className="form-control"
                                            placeholder="Your Name"
                                            validators={{
                                                required,
                                                minLength: minLength(3),
                                                maxLength: maxLength(15)
                                            }} />
                                        <Errors className="text-danger" model=".author" show="touched"
                                            messages={{
                                                required: "Required",
                                                minLength: "Must be greater than 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="4" className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }
}

export default DishDetail;