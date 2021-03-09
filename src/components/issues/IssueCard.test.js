import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { postContext } from '../../contexts/postContext.js';
import IssueCard from './IssueCard.js';

const issue = {
    title: 'test title',
    description: 'test description',
    city: 'Portland',
    zip_code: '97206',
    votes: 2,
};

test('IssueCard component renders', () => {
    const { queryByText } = render(
        <Router>
            <postContext.Provider value={{ isEditing: false }}>
                <IssueCard match={{ params: { id: 1 } }} issue={issue} />
            </postContext.Provider>
        </Router>
    );

    expect(queryByText(/location/i));
    expect(queryByText(/Created by/i));
    expect(queryByText(/test title/i));
    expect(queryByText(/test description/i));
    expect(queryByText(/Portland/i));
    expect(queryByText(/Los Angeles/i)).toBeNull();
});
