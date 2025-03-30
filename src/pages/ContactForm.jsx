import React, { useState, useEffect } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        consent: false
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Effect to restore form data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('contactFormDraft');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        };
        setFormData(updatedFormData);
        localStorage.setItem('contactFormDraft', JSON.stringify(updatedFormData));
    };

    // Validate form inputs
    const validate = () => {
        const newErrors = {};
        if (!/^[\w\s\-\'\u00C0-\u017F]+$/.test(formData.name)) {
            newErrors.name = 'Invalid name.';
        }
        if (!/^[\w@.]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email.';
        }
        if (!/^[A-Za-z\s]+$/.test(formData.subject)) {
            newErrors.subject = 'Invalid subject.';
        }
        if (/[<>]/.test(formData.message)) {
            newErrors.message = 'Message cannot contain special characters.';
        }
        if (!formData.consent) {
            newErrors.consent = 'You must consent to submit the form.';
        }
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            fetch('/.netlify/functions/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setSuccessMessage(data.message);
                    localStorage.removeItem('contactFormDraft');
                    setFormData({ name: '', email: '', subject: '', message: '', consent: false });
                }
            })
            .catch(error => {
                setSuccessMessage('Failed to submit form.');
            });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <h1>Contact Me</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                {errors.name && <span className="error" style={{ color: 'red' }}>{errors.name}</span>}<br />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}<br />

                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                {errors.subject && <span className="error" style={{ color: 'red' }}>{errors.subject}</span>}<br />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                {errors.message && <span className="error" style={{ color: 'red' }}>{errors.message}</span>}<br />

                <div className="consent-container">
                    <input type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} required />
                    <label htmlFor="consent">I consent to be contacted and my information stored securely.</label>
                </div>
                {errors.consent && <span className="error" style={{ color: 'red' }}>{errors.consent}</span>}<br />

                <button type="submit">Submit</button>
                {successMessage && <span className="success" style={{ color: 'green' }}>{successMessage}</span>}
            </form>
        </div>
    );
};

export default ContactForm; 