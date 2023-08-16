import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import AuthorForm from '../components/AuthorForm';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('books');
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [bookFormValues, setBookFormValues] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationDate: '',
    });
    const [authorFormValues, setAuthorFormValues] = useState({
        name: '',
        birthDate: '',
        biography: '',
    });

    const initialBookFormValues = {
        title: '',
        author: '',
        isbn: '',
        publicationDate: '',
    };

    const initialAuthorFormValues = {
        name: '',
        birthDate: '',
        biography: '',
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setSelectedItemId(null);
        clearFormValues();
    };

    // Handle editing an item
    const handleEditItem = (item) => {
        const confirmed = window.confirm('Do you want to edit this item?');
        if (confirmed) {
            const updatedValues = { ...item }; // Copy the existing item values
            // Display a prompt for each field and update the value if user provides a new one
            updatedValues.title = prompt('Enter new title:', item.title) || item.title;
            updatedValues.author = prompt('Enter new author:', item.author) || item.author;
            updatedValues.isbn = prompt('Enter new isbn:', item.isbn) || item.isbn;
            updatedValues.publicationDate = prompt('Enter new publicationDate:', item.publicationDate) || item.publicationDate;

            // Update the record
            if (selectedTab === 'books') {
                const updatedBooks = books.map(book => (book.id === item.id ? updatedValues : book));
                setBooks(updatedBooks);
            } else if (selectedTab === 'authors') {
                const updatedAuthors = authors.map(author => (author.id === item.id ? updatedValues : author));
                setAuthors(updatedAuthors);
            }
        }
    };

    // Handle deleting an item
    const handleDeleteItem = (id) => {
        const confirmed = window.confirm('Do you want to delete this item?');
        if (confirmed) {
            if (selectedTab === 'books') {
                const updatedBooks = books.filter(book => book.id !== id);
                setBooks(updatedBooks);
            } else if (selectedTab === 'authors') {
                const updatedAuthors = authors.filter(author => author.id !== id);
                setAuthors(updatedAuthors);
            }
        }
    };


    // Clear form values
    const clearFormValues = () => {
        setBookFormValues(initialBookFormValues);
        setAuthorFormValues(initialAuthorFormValues);
    };

    // Render the appropriate form
    const renderForm = () => {
        if (selectedTab === 'books') {
            return (
                <BookForm
                    initialValues={bookFormValues}
                    onSubmit={(values) => {
                        if (selectedItemId) {
                            const updatedBooks = books.map(book => {
                                if (book.id === selectedItemId) {
                                    return {
                                        ...book,
                                        ...values,
                                    };
                                }
                                return book;
                            });
                            setBooks(updatedBooks);
                            setSelectedItemId(null);
                        } else {
                            const newBook = {
                                id: new Date().getTime(),
                                ...values,
                            };
                            setBooks([...books, newBook]);
                        }
                        clearFormValues();
                    }}
                />
            );
        } else {
            return (
                <AuthorForm
                    initialValues={authorFormValues}
                    onSubmit={(values) => {
                        if (selectedItemId) {
                            const updatedAuthors = authors.map(author => {
                                if (author.id === selectedItemId) {
                                    return {
                                        ...author,
                                        ...values,
                                    };
                                }
                                return author;
                            });
                            setAuthors(updatedAuthors);
                            setSelectedItemId(null);
                        } else {
                            const newAuthor = {
                                id: new Date().getTime(),
                                ...values,
                            };
                            setAuthors([...authors, newAuthor]);
                        }
                        clearFormValues();
                    }}
                />
            );
        }
    };

    const items = selectedTab === 'books' ? books : authors;

    return (

        <div className="dashboard-container">
            <div className="tabs">
                <button
                    className={`tab ${selectedTab === 'books' ? 'active' : ''}`}
                    onClick={() => handleTabChange('books')}
                >
                    Books
                </button>
                <button
                    className={`tab ${selectedTab === 'authors' ? 'active' : ''}`}
                    onClick={() => handleTabChange('authors')}
                >
                    Authors
                </button>
            </div>
            <div className="form">
                {renderForm()}
            </div>
            <div className="list">
                <ul>
                    {items.map(item => (
                        <li key={item.id} className="list-item">
                            <div className="item-details">
                                {selectedTab === 'books' && (
                                    <>
                                        <h3>title: {item.title}</h3>
                                        <p>Author: {item.author}</p>
                                        <p>ISBN: {item.isbn}</p>
                                        <p>Publication Date: {item.publicationDate}</p>
                                    </>
                                )}
                                {selectedTab === 'authors' && (
                                    <>
                                        <h3>Name: {item.name}</h3>
                                        <p>Birth Date: {item.birthDate}</p>
                                        <p>Biography: {item.biography}</p>
                                    </>
                                )}
                            </div>
                            <div className="item-actions">
                                <button className="edit-button" onClick={() => handleEditItem(item)}>
                                    Edit
                                </button>

                                <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
