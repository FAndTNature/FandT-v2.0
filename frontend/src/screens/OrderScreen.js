import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Card, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder } from "../actions/orderActions"
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

export const OrderScreen = ({ match }) => {
    const dispatch = useDispatch()
    const orderId = match.params.id
    
    const [sdkready, setSdkready] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {success: successPay, loading: loadingPay } = orderPay

    if(!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    }

    useEffect(() => { 
        const addPaypal = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => { setSdkready(true) }
            document.body.appendChild(script)
        }
        if(!order || successPay) { 
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } 
        else if(!order.isPaid) {
            if(!window.paypal) addPaypal()
            else setSdkready(true)
        }
    }, [dispatch, order, orderId, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }
    return loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : 
    <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping Details</h2>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant="success">Delivered</Message>: <Message variant="danger">Delivery Pending</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>: <Message variant="danger">Payment Pending</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                        <p>
                            {order.orderItems.length === 0 ? <Message variant="dark">No Orders</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, idx) => (
                                        <ListGroup.Item key={idx}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={5}>
                                                    {item.qty} x Rs. {item.price} = Rs. {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </p>
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>₹ {order.itemsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>₹ {order.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>₹ {order.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total:</Col>
                                <Col>₹ {order.totalPrice}</Col>
                            </Row> 
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader></Loader>}
                                {!sdkready ? <Loader></Loader> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}>

                                    </PayPalButton>
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen