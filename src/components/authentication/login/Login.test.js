import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

test('Login component renders', () => {
    const { getByText, queryByText } = render(
        <Router>
            <Login />
        </Router>
    );

    expect(queryByText(/login below/i));
    expect(getByText(/Submit/i));
    expect(getByText(/Don't have an account/i));
    expect(getByText(/Username/i));
    expect(getByText(/Password/i));
});
