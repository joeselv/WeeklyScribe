import './Home.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        setEntries(storedEntries);
    }, []);

    return (
        <div className='home-message'>
            <h1>My Entries</h1>
            <div className='carousel'>
                {entries.map(entry => (
                    <div key={entry.id} className='carousel-item'>
                        <h2>{entry.date}</h2>
                        <p>{entry.prompt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;