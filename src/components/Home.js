import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './Home.css';
import lightbulb from './resources/lightbulb.svg';

const Home = () => {
    const [text, setText] = useState('');
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        setEntries(savedEntries);
    }, []);

    const handleChange = (value) => {
        setText(value);
    };

    const saveEntry = () => {
        const newEntry = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            content: text, 
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

        setText('');
    };

    return (
        <div className="home-container">
            <div className="sidebar">
                <h2>Entries</h2>
                <ul>
                    {entries.map((entry) => (
                        <li key={entry.id}>
                            <strong>{entry.date}</strong>: {"Think about"}...
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="content">
                <h1 style={{ fontSize: '2em' }}>
                    <img src={lightbulb} alt="Lightbulb" className="lightbulb-icon" />
                    Think about the last creative project you completed. What were the biggest obstacles you faced, and how did you overcome them?
                </h1>
                <ReactQuill value={text} onChange={handleChange} style={{ height: '400px' }} />
                <button onClick={saveEntry} style={{ marginTop: '100px' }}>
                    Save Entry
                </button>
            </div>
        </div>
    );
};

export default Home;
