import React from 'react';
import LanguageListItem from './LanguageListItem';

const Languages = ({ languages }) => {
    const displayLanguages = () => languages.map(language =>
        <LanguageListItem key={language.iso639_2} language={language} />
    );
    return (
        <>
            <h3>Languages</h3>
            <ul>
                {displayLanguages()}
            </ul>
        </>
    )
};

export default Languages;