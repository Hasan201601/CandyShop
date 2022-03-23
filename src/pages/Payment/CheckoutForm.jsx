import React, { Component } from 'react';
import { CardElement } from "@stripe/react-stripe-js"
import { connect } from 'react-redux';
import { clearCart } from '../../redux/CartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Checkoutform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientSecret: '',
            processing: false,
            error: '',
            success: ''
        }
    }
    componentDidMount() {

        if (this.props.cart.cartTotalAmount) {
            fetch('http://localhost:5000/api/payment/create-payment-intent', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ price: this.props.cart.cartTotalAmount })
            })
                .then(res => res.json())
                .then(data => this.setState({ clientSecret: data.clientSecret }));
        }

    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { stripe, elements } = this.props;

        if (!stripe || !elements) {
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const email = this.props.email;
        const address = this.props.address;
        const phone = this.props.phone;
        const user = this.props.user._id;
        console.log(this.props.cart.cartItems)

        this.setState({ processing: true })
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        console.log(email, address, phone);

        if (error) {
            this.setState({
                error: error.message,
                success: ''
            })
            console.log('[error]', error);
        } else {
            this.setState({
                error: ""
            })
            console.log('[PaymentMethod]', paymentMethod);
            const paymentInfo = {
                email,
                address,
                phone,
                card: paymentMethod.card,
                price: this.props.cart.cartTotalAmount,
                user: user,
                orderedItem: this.props.cart.cartItems
            }
            axios.post("http://localhost:5000/api/payment/create-payment-intent", paymentInfo)
                .then(res => console.log(res.data))
        }
        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            this.state.clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        address: address,
                        email: email,
                        phone: phone,
                    },
                },
            },
        );

        if (intentError) {
            console.log(intentError);
            this.setState({
                error: intentError.message,
                success: ""
            })
        }
        else {
            this.setState({
                error: "",
                success: 'Your payment processed successfully.'
            })


            // save to database
            const payment = {
                userId: this.props.user._id,
                userEmail: this.props.email,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0],
                items: this.props.cart.cartItems
            }
            const responses = await Promise.all(
                this.props.cart.cartItems.map(async (item) => {
                    const stock = item.stock - item.cartQuantity
                    const res = await fetch(`http://localhost:5000/api/products/find/${item._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({ stock: stock })
                    })
                })
            )
            console.log(responses);
            const url = `http://localhost:5000/api/orders`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.props.dispatch(clearCart())
                });
        }



    };

    render() {
        const { stripe } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='border p-2 my-2 rounded'>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    padding: '20px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className='btn btn-success' type="submit" disabled={!stripe || this.state.success}>
                    Pay &euro;{this.props.cart.cartTotalAmount}
                </button>
                {
                    this.state.success && <>
                        <p>{this.state.success}</p>
                        <Link className='text-decoration-none' to="/"><button className='btn btn-outline-success'>Go Home</button></Link>
                    </>

                }
                {
                    this.state.error && <p>{this.state.error}</p>
                }
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    cart: state.cart
})

export default connect(mapStateToProps)(Checkoutform);
