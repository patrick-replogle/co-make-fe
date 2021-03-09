import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

test('PrivateRoute component renders', () => {
    const wrapper = render(
        <Router>
            <PrivateRoute />
        </Router>
    );

    expect(wrapper).toBeTruthy();
    expect(wrapper).toBeDefined();
});
