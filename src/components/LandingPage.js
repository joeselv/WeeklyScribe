import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import arrowForward from './resources/arrow_forward.svg';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelectorAll('.landing-container, .welcome-message h1, .description p, .btn').forEach(element => {
            element.classList.add('fade-in');
        });
    }, []);

    const redirectToHome = () => {
        navigate('/home');
    };

    return (
        <div className="landing-container">
            <div className="welcome-message">
                <h1>Welcome to WeeklyScribe</h1>
            </div>
            <div className="description">
                <p>
                    Engage in weekly journaling challenges to help you focus and hone your creativity. Each week, you'll be given
                    new prompts to inspire your thoughts and push your creative boundaries. Start your journey today and discover
                    the power of consistent self-reflection.
                </p>
            </div>
            <button className="btn btn-background-slide" onClick={redirectToHome}>
                Get Started
                <img src={arrowForward} alt="Arrow Forward" className="arrow-icon" />
                <div className="btn-background-slide--orange btn-background-slide-bg"></div>
            </button>
        </div>
    );
};

export default LandingPage;