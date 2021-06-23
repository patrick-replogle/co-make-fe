import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './loadingSpinner.styles.scss';

const LoadingSpinner = () => {
    return (
        <div className="loading">
            <CircularProgress color="primary" size="100px" />
        </div>
    );
};

export default LoadingSpinner;
