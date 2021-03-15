import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserDetails, getUserOrders } from '../actions/userActions'

export const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdates = useSelector(state => state.userUpdates)
    const { success } = userUpdates

    const userOrders = useSelector(state => state.userOrders)
    const { loading:loadingOrders, errors, orders } = userOrders

    useEffect(()=> {
        if(!userInfo) {
            history.push('/login')
        }
        else {
            if(!(user.name)) {
                dispatch(getUserDetails('profile'))
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
            dispatch(getUserOrders())
        }
    }, [dispatch, history, user.email, user.name, userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords must match')
        }
        else {
            dispatch(updateUserDetails({ id: user._id, name, email, password }))
        }
    }

    return <Row>
        <Col md={3}>
            <h2>Profile</h2>
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="danger">{message}</Message>}
                {success && <Message variant="success">Profile Updated Successfully!!!</Message>}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" value={name} onChange={e => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Update
                    </Button></Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader></Loader> : errors ? <Message variant="danger">{errors}</Message> : (
                <Table striped bordered hover responsive classNames="table-sm" size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => 
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>₹ {order.totalPrice}</td>
                                    <td>{order.paidAt ? order.paidAt.substring(0, 10): <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                    <td>{order.isDelivered ? order.isDelivered.substring(0, 10): <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant="dark" className="btn-sm">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
}

export default ProfileScreen
