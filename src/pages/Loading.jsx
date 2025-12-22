import React from 'react';
import { RingLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <RingLoader color='#7209b7' size={170} />
        </div>
    );
};

export default Loading;


