import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { postContext } from '../../contexts/postContext.js';
import AddComment from './AddComment.js';

test('IssueCard component renders', () => {
    const { queryByText } = render(
        <Router>
            <postContext.Provider
                value={{
                    isEditing: false,
                    commentToEdit: { id: 1, text: 'test comment' },
                }}
            >
                <AddComment />
            </postContext.Provider>
        </Router>
    );

    expect(queryByText(/Submit/i)).toBeTruthy();
    expect(queryByText(/test comment/i)).toBeDefined();
});
