import React, { useState, useEffect } from 'react';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/.netlify/functions/getMessages')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    setError('Failed to load messages.');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load messages.');
                setLoading(false);
            });
    }, []);

    return (
        <div className="messages-container">
            <h1>Messages</h1>
            {loading ? (
                <p>Loading messages...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <ul className="messages-list">
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>Name:</strong> {msg.name}<br />
                            <strong>Subject:</strong> {msg.subject}<br />
                            <strong>Message:</strong> {msg.message}<br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Messages; 