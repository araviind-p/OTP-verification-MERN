import * as React from 'react';
import { ThreeDot } from 'react-loading-indicators';

export default function Loading() {
    return (
        <div className="loading_container">
            <ThreeDot color="#32cd32" size="medium" text="loading..." textColor="#7ec974" />
        </div>
    );
}