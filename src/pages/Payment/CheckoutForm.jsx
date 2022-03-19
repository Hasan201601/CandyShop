import React, { Component } from 'react';
import { CardElement } from "@stripe/react-stripe-js"
import { connect } from 'react-redux';
import { clearCart } from '../../redux/CartSlice';
import { toast } from 'react-toastify';

class Checkoutform extends Component {
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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        const email = this.props.email;
        const address = this.props.address;
        const phone = this.props.phone;

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        const success = true;
        toast.success("payment done successfully", {
            position: 'bottom-left'
        })
        success &&
            this.props.dispatch(clearCart())

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
    user: state.user,
    cart: state.cart
})

export default connect(mapStateToProps)(Checkoutform);
