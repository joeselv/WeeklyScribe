import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './Editor.css';
import lightbulb from './resources/lightbulb.svg';

const Editor = () => {
    const [text, setText] = useState('');
    const [entries, setEntries] = useState([]);
    const [prompt, setPrompt] = useState('Think about the last creative project you completed. What were the biggest obstacles you faced, and how did you overcome them?');

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
            prompt: prompt,
        };
    
        const entryIndex = entries.findIndex(entry => entry.prompt === prompt);
    
        let updatedEntries;
        if (entryIndex !== -1) {
            if (window.confirm('It looks like an entry already exists for this week. Do you want to overwrite the existing one?')) {
                updatedEntries = [...entries];
                updatedEntries[entryIndex] = newEntry;
            } else {
                return;
            }
        } else {
            updatedEntries = [newEntry, ...entries];
        }
    
        setEntries(updatedEntries);
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
        setText('');
    };

    const clearEntries = () => {
        setEntries([]);
        localStorage.removeItem('journalEntries');
    };

    const loadEntry = (entryContent) => {
        setText(entryContent);
    };    

    return (
        <div className="editor-container">
            <div className="sidebar">
                <h2>Entries</h2>
                <ul>
                    {entries.map((entry) => (
                        <li key={entry.id} onClick={() => loadEntry(entry.content)}>
                            <strong>{entry.date}</strong>: {prompt}
                        </li>
                    ))}
                </ul>
                <button onClick={clearEntries} className='btnEditor btnEditor-background-slide'>
                    Clear All
                </button>
            </div>
            
            <div className="content">
                <h1 style={{ fontSize: '2em' }}>
                    <img src={lightbulb} alt="Lightbulb" className="lightbulb-icon" />
                    {prompt}
                </h1>
                <ReactQuill value={text} onChange={handleChange} style={{ height: '400px' }} />
                <button onClick={saveEntry} className='btnEditor btnEditor-background-slide'>
                    Save Entry
                </button>
            </div>
        </div>
    );
};

export default Editor;
