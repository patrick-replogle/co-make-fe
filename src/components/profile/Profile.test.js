import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { userContext } from '../../contexts/userContext.js';
import Profile from './Profile';

test('Profile component renders', () => {
    const wrapper = render(
        <Router>
            <userContext.Provider value={{ user: { id: 1 } }}>
                <Profile />
            </userContext.Provider>
        </Router>
    );

    expect(wrapper).toBeTruthy();
    expect(wrapper).toBeDefined();
    expect(wrapper.queryByText(/Update Profile/i));
    expect(wrapper.findByText(/Username/i));
    expect(wrapper.findByText(/Email/i));
});
