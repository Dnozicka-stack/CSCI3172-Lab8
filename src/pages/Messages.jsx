import React, { useState, useEffect } from 'react';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/.netlify/functions/getMessages')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    setError('Failed to load messages.');
                }
            })
            .catch(() => setError('Failed to load messages.'));
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {msg.name}<br />
                        <strong>Subject:</strong> {msg.subject}<br />
                        <strong>Message:</strong> {msg.message}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages; 