import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedHeader from './ProtectedHeader.js';

test('ProtectedHeader component renders', () => {
    const wrapper = render(
        <Router>
            <ProtectedHeader />
        </Router>
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.queryByText(/coMake/i));
});
