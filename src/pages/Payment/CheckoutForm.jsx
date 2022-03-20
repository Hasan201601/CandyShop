import React, { Component } from 'react';
import { CardElement } from "@stripe/react-stripe-js"
import { connect } from 'react-redux';
import { clearCart } from '../../redux/CartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

class Checkoutform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientSecret: ''
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/payment/create-payment-intent", this.props.cart.cartTotalAmount)
            .then(res => this.setState({ clientSecret: res.data.clientSecret }))
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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        console.log(email, address, phone);

        if (error) {
            console.log('[error]', error);
        } else {
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
        }
        else {

            // save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            const url = `http://localhost:5000/api/orders`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => console.log(data));
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
                <button className='btn btn-success' type="submit" disabled={!stripe}>
                    Pay &euro;{this.props.cart.cartTotalAmount}
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    cart: state.cart
})

export default connect(mapStateToProps)(Checkoutform);
