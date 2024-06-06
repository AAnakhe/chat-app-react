import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddContact = ({ onContactAdded }) => {
    const [contact, setContact] = useState('');
    const [error, setError] = useState(null);

    const handleAddContact = async () => {
        const loggedInUsername = localStorage.getItem('username');
        if (!loggedInUsername) {
            setError('No logged in user found.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3010/add_contact/${loggedInUsername}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact }),
            });

            const result = await response.json();
            if (response.ok && result.status) {
                onContactAdded(contact); 
                setContact('');
                setError(null);
            } else {
                setError(result.message || 'Error adding contact');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="add-contact-container">
            <input
                type="text"
                placeholder="Enter contact username"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />
            <button className="add-contact-button" onClick={handleAddContact}>Add Contact</button>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

AddContact.propTypes = {
    onContactAdded: PropTypes.func.isRequired,
};

export default AddContact;
