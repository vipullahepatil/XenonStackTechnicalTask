import { Button } from "bootstrap";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Form } from "react-router-dom";
import { register } from "../service/api";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export function RegisterPage(){
    const [formDetails,setFormDetails]=useState({
      id:'',
      name:'',
      email:'',
      password:'',
      cpassword:''
    });
    const [formError,setFormError]=useState('');

    const handleChange=(e)=>{
        setFormDetails({ ...formDetails, [e.target.name]:e.target.value});
    }
    const handleSubmit= async(e)=>{
       e.preventDefault();
       if(formDetails.password==formDetails.cpassword){
        const formData={
            name:formDetails.name,
            email:formDetails.email,
            password:formDetails.password
        }
        console.log(formData);
        const response=await register(formData);
        if(response.status==200){
            setFormDetails({
                id:'',
                name:'',
                email:'',
                password:'',
                cpassword:''
            })
            setFormError('')
        }
        else{
            setFormError('something is wrong');
        }
        
       }
       else{
            setFormError('please enter proper details')
       }
    }


    return(
        <>
            <Container className="mt-4 p-4 h-50">
                <Form onSubmit={handleSubmit}>
                    <h1>
                        Registration Page
                    </h1>
                    <Row >
                        <h4>{formError && (
                            <span style={{ color: "red" }}>{formError} </span>
                            )}
                        </h4>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label> Name:</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formDetails.name}
                                onChange={handleChange}
                                className="rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label> email:</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={formDetails.email}
                                onChange={handleChange}
                                className="rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label> Password:</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter Password"
                                name="password"
                                value={formDetails.password}
                                onChange={handleChange}
                                className="rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label> Confirm Password:</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter Confirm Password"
                                name="cpassword"
                                value={formDetails.cpassword}
                                onChange={handleChange}
                                className="rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        type="submit"
                        variant="success"
                        className="rounded-pill bg-primary"
                        >
                            Register
                    </Button>
                </Form>

            </Container>
        </>
    );
        
}