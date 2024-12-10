import './Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional CSS for Tippy.js

const Home = () => {
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();
    const weeklyPrompt = "Think about the last creative project you completed. What were the biggest obstacles you faced, and how did you overcome them?";

    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        setEntries(storedEntries);
    }, []);

    const handleEntryClick = (entry) => {
        if (!entry) {
            navigate('/editor', { state: { entryContent: '' } });
        } else {
            navigate('/editor', { state: { entryContent: entry.content } });
        }
    };

    // Check if an entry already exists for the weekly prompt
    const hasWeeklyPromptEntry = entries.some(entry => entry.prompt === weeklyPrompt);

    return (
        <div className='home-message'>
            <h1>My Entries</h1>
            <h2 className='weekly-prompt'>
                This Week's Prompt: 
                <span className='unbold'> {weeklyPrompt}</span>
            </h2>
            <div className='carousel'>
                {entries.map(entry => (
                    <div key={entry.id} className='carousel-item' onClick={() => handleEntryClick(entry)}>
                        <h2>{entry.date}</h2>
                        <p>{entry.prompt}</p>
                    </div>
                ))}

                <Tippy 
                    content="You already have an entry in for this week" 
                    placement="top"
                    theme="light-border"
                    arrow={true}
                    disabled={!hasWeeklyPromptEntry}
                >
                    <div 
                        className={`carousel-item new-entry ${hasWeeklyPromptEntry ? 'disabled' : ''}`} 
                        onClick={!hasWeeklyPromptEntry ? () => handleEntryClick(null) : undefined}
                    >
                        <img src={require('./resources/addCircle.svg').default} alt="New Entry" />
                        <h2>New Entry</h2>
                    </div>
                </Tippy>
            </div>
        </div>
    );
};

export default Home;
