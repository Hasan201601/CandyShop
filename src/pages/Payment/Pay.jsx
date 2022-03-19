import React, { Component } from 'react';
import { Elements } from "@stripe/react-stripe-js"
import InjectedCheckoutForm from './InjectedCheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51KQZwpItc42Fo0RyZVjt3bvBX7ZrRJdEAEIeLpmewHMVxEnxZafBe9NRz5RIwhr51EPGPXMwp7W9wfkeGqveFEKg00KYI2WkwO');

class Pay extends Component {
    render() {
        return (
            <div className='w-100 '>
                <Elements stripe={stripePromise}>
                    <InjectedCheckoutForm
                        email={this.props.email}
                        address={this.props.address}
                        phone={this.props.phone}
                    />
                </Elements>
            </div>
        );
    }
}

export default Pay;
