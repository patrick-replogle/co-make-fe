import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { postContext } from '../../contexts/postContext.js';
import Dashboard from './Dashboard';

const mockPosts = [
    {
        id: 1,
        title: 'Title 1',
        description: 'Description 1',
        city: 'Portland',
        zip_code: '97206',
        post_img_url: 'www.fakeimage.com',
    },
    {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
        city: 'Seattle',
        zip_code: '98101',
        post_img_url: 'www.fakeimage.com',
    },
];

test('Dashboard component renders with mock data', () => {
    const { queryByText } = render(
        <Router>
            <postContext.Provider value={{ posts: mockPosts }}>
                <Dashboard />
            </postContext.Provider>
        </Router>
    );

    expect(queryByText(/Title 1/i));
    expect(queryByText(/Portland/i));
    expect(queryByText(/Title 2/i));
    expect(queryByText(/Seattle/i));
});
