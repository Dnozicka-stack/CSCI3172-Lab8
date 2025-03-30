import React, { useState, useEffect } from 'react';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredMessages = messages.filter(msg => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        console.log('Filtering with search term:', lowerCaseSearchTerm);
        return (
            msg.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            msg.subject.toLowerCase().includes(lowerCaseSearchTerm) ||
            msg.message.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    console.log('Filtered messages:', filteredMessages);

    return (
        <div className="messages-container">
            <h1>Messages</h1>
            <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            />
            {loading ? (
                <p>Loading messages...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : filteredMessages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <ul className="messages-list">
                    {filteredMessages.map((msg, index) => (
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