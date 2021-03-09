import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { postContext } from '../../../contexts/postContext.js';

import SearchBar from './Searchbar';

test('SearchBar component renders with props', () => {
    const mockFn = jest.fn();

    const searchBarComponent = render(
        <Router>
            <postContext.Provider value={{ setPosts: mockFn }}>
                <SearchBar />
            </postContext.Provider>
        </Router>
    );

    expect(searchBarComponent).toBeTruthy();
    expect(searchBarComponent.getByText(/city/i));
    expect(searchBarComponent.queryAllByTestId('searchInput')).toBeDefined();
});
