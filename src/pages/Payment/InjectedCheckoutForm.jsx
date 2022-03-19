import { ElementsConsumer } from '@stripe/react-stripe-js';
import React from 'react';
import Checkoutform from './CheckoutForm';

const InjectedCheckoutForm = ({ email, address, phone }) => {
    return (
        <ElementsConsumer>
            {({ elements, stripe }) => (
                <Checkoutform elements={elements} stripe={stripe} email={email}
                    address={address} phone={phone} />
            )}
        </ElementsConsumer>
    );
};

export default InjectedCheckoutForm;