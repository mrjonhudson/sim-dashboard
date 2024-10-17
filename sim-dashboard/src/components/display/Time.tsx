import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Time: React.FC = () => {

    return (
        <p className={`text-xl lg:text-4xl font-adlam text-center`}>
            {format(new Date(), 'HH:mm b')}
        </p>
    );
};

export default Time;
