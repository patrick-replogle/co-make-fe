import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { userContext } from '../../contexts/userContext.js';
import UserForm from './UserForm';

test('Userform component renders', () => {
    const wrapper = render(
        <Router>
            <userContext.Provider
                value={{ user: { id: 1, firstName: 'Patrick' } }}
            >
                <UserForm />
            </userContext.Provider>
        </Router>
    );

    expect(wrapper).toBeTruthy();
    expect(wrapper).toBeDefined();
    expect(wrapper.queryByText(/update profile/i));
    expect(wrapper.queryByText(/Patrick/i));
    expect(wrapper.findByText(/Submit/i));
    expect(wrapper.findByText(/Cancel/i));
});
