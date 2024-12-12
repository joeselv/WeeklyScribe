import './Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Home = () => {
    const [entries, setEntries] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const navigate = useNavigate();
    const weeklyPrompt = "Think about the last creative project you completed. What were the biggest obstacles you faced, and how did you overcome them?";

    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        setEntries(storedEntries);

        const savedField = localStorage.getItem('selectedField') || '';
        setSelectedField(savedField);
    }, []);

    const handleEntryClick = (entry) => {
        if (!entry) {
            navigate('/editor', { state: { entryContent: '' } });
        } else {
            navigate('/editor', { state: { entryContent: entry.content } });
        }
    };

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        localStorage.setItem('selectedField', selectedField);
        setIsPopupOpen(false);
    };

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };

    const domainPrompts = {
        technology: [
            "What new technologies have you explored today, and how do they influence your current work?",
            "How has your understanding of a particular tool or platform improved through hands-on experimentation?",
            "What challenges are you facing with integrating new technologies into your creative projects?"
        ],
        science: [
            "What scientific concepts or discoveries have inspired you lately, and how are you incorporating them into your work?",
            "How do you track and analyze data within your creative process?",
            "What challenges have you faced in applying scientific methods or principles to your creative projects?"
        ],
        arts: [
            "What artistic techniques or mediums have you experimented with recently, and what have you learned from them?",
            "How do you balance creativity with technical skills in your artwork?",
            "What themes or subjects have been recurring in your recent work, and why do you think they resonate with you?"
        ],
        business: [
            "How have you been incorporating business strategies into your creative projects or career?",
            "What aspects of your creative work do you think could be improved by applying a more business-oriented mindset?",
            "What challenges are you facing when it comes to monetizing your creative work or building a brand?"
        ],
        health: [
            "How do you maintain a healthy work-life balance while pursuing creative goals?",
            "What steps have you taken to ensure your mental well-being during intense creative phases?",
            "How do you incorporate mindfulness or self-care into your creative process?"
        ],
        education: [
            "What new skills or techniques have you learned recently that have enhanced your creative work?",
            "How do you approach the learning process when you're trying to master a new creative skill?",
            "What role do feedback and critique play in your personal growth as a creator?"
        ],
        environment: [
            "How do environmental factors (e.g., nature, space) influence your creative process?",
            "What sustainable practices or eco-friendly approaches are you integrating into your creative work?",
            "How do you balance creativity with environmental responsibility in your projects?"
        ],
        sports: [
            "How do physical activities or sports influence your creative thinking or problem-solving skills?",
            "What mindset or strategies from the world of sports have you applied to your creative work?",
            "What challenges have you faced in balancing creative pursuits with a sports-focused lifestyle?"
        ],
        entertainment: [
            "What trends in the entertainment industry have influenced your creative work recently?",
            "How do you stay motivated and inspired by your favorite entertainment mediums (e.g., film, music, literature)?",
            "What role does audience feedback or engagement play in shaping your creative direction?"
        ]
    };

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

            <div className='explore-more'>
                <p>Want to explore more domain specific questions in future prompts?</p>
                <button onClick={handlePopupOpen}>Select Field</button>
            </div>

            {isPopupOpen && (
                <div className='popup'>
                    <div className='popup-content'>
                        <h2>Select Your Field</h2>
                        <select value={selectedField} onChange={handleFieldChange}>
                            <option value=''>Select a field</option>
                            <option value='technology'>Technology</option>
                            <option value='science'>Science</option>
                            <option value='arts'>Arts</option>
                            <option value='business'>Business</option>
                            <option value='health'>Health</option>
                            <option value='education'>Education</option>
                            <option value='environment'>Environment</option>
                            <option value='sports'>Sports</option>
                            <option value='entertainment'>Entertainment</option>
                        </select>
                        <button onClick={handlePopupClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
