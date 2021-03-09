import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthHeader from './AuthHeader';

test('AuthHeader component renders', () => {
    const wrapper = render(
        <Router>
            <AuthHeader />
        </Router>
    );

    expect(wrapper.getByText(/coMake/i));
    expect(wrapper.queryByText(/login/i));
    expect(wrapper.queryByText(/register/i));
});
