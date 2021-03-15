import React, { useEffect } from 'react'
import { Button, Row, Col, Image, Card, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from "../actions/orderActions"

export const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    cart.shippingPrice = cart.itemsPrice > 500 ? 0 : 20
    cart.taxPrice = Number((0.05*cart.itemsPrice).toFixed(2))
    
    if(Number(cart.itemsPrice) !== 0)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    else cart.totalPrice = 0

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error } = orderCreate

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, success])

    const placeOrderHandler = () => {
       dispatch(createOrder({
           orderItems: cart.cartItems,
           shippingAddress: cart.shippingAddress,
           paymentMethod: cart.paymentMethod,
           itemsPrice: cart.itemsPrice,
           shippingPrice: cart.shippingPrice,
           taxPrice: cart.taxPrice,
           totalPrice: cart.totalPrice
       }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping Details</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} - {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                            <p>
                                {cart.cartItems.length === 0 ? <Message variant="dark">Empty</Message> : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, idx) => (
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
                                    <Col>₹ {cart.itemsPrice}</Col>
                                </Row>
                                {cart.cartItems.length !== 0 ? (
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>₹ {cart.shippingPrice}</Col>
                                </Row>) : (null)}
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>₹ {cart.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>₹ {cart.totalPrice}</Col>
                                </Row> 
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen