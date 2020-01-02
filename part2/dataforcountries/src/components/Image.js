import React from 'react';

const Image = ({source, alt, style}) => {
    return (
        <img src={source} alt={alt} style={style}/>
    )
};

export default Image;