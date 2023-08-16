// src/components/BookForm.js
import React from 'react';
import {useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';

const BookForm = ({ initialValues, onSubmit }) => {

    const [submitted, setSubmitted] = useState(false);

    return (
        <Formik initialValues={initialValues} onSubmit={(values, actions) => {
            setSubmitted(true);
            onSubmit(values, actions);
            actions.resetForm();
        }}
            
            validate={(values) => {
                const errors = {};

                if (!values.title) {
                    errors.title = 'Title is required';
                }

                if (!values.author) {
                    errors.author = 'Author is required';
                }

                if (!values.isbn) {
                    errors.isbn = 'ISBN is required';
                }

                if (!values.publicationDate) {
                    errors.publicationDate = 'Publication Date is required';
                }

                return errors;
            }}
        >
            <Form>
                <div className="form-group row mb-2">
                 
                        <label className="col-sm-2 col-form-label"><b>Title</b></label>
                        <div className="col-sm-10">
                            <Field type="text" name="title" className="form-control" />
                            <ErrorMessage name="title" component="div" className="error-message" />
                        </div>
                  
                </div>

                <div className="form-group row mb-2">
                    
                        <label className="col-sm-2 col-form-label"><b>Author</b></label>
                        <div className="col-sm-10">
                            <Field type="text" name="author" className="form-control forms" />
                            <ErrorMessage name="author" component="div" className="error-message" />
                        </div>
                    
                </div>

                <div className="form-group row mb-2">
                   
                        <label className="col-sm-2 col-form-label"><b>ISBN</b></label>
                        <div className="col-sm-10">
                            <Field type="text" name="isbn" className="form-control" />
                            <ErrorMessage name="isbn" component="div" className="error-message" />
                        </div>
                   
                </div>

                <div className="form-group row mb-2">
                   
                        <label className="col-sm-2 col-form-label"><b>Publication Date</b></label>
                        <div className="col-sm-10">
                            <Field type="date" name="publicationDate" className="form-control" />
                            <ErrorMessage name="publicationDate" component="div" className="error-message" />
                        </div>
    
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mt-3" style={{marginBottom:'20px'}}>
                        Submit
                    </button>
                </div>
            </Form>

        </Formik>
    );
};

export default BookForm;
