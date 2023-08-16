import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const AuthorForm = ({ initialValues, onSubmit }) => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <Formik initialValues={initialValues} onSubmit={(values, actions) => {
            setSubmitted(true);
            onSubmit(values, actions);
            actions.resetForm();
        }}
        validate={(values) => {
            const errors = {};

            if (!values.name) {
                errors.name= 'Name is required';
            }

            if (!values.birthDate) {
                errors.birthDate = 'Birth Date is required';
            }

            if (!values.biography) {
                errors.biography = 'Biography is required';
            }

            return errors;
        }}
           
        >
            {({ touched, errors, handleSubmit, isValid }) => (
                <Form>
                    <div className="form-group row mb-2">
                        <label htmlFor="name" className="col-sm-2 col-form-label">
                            <b> Name</b>
                        </label>
                        <div className="col-sm-10">
                            <Field type="text" name="name" className={`form-control ${(submitted || touched.name) && errors.name ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>
                    </div>

                    <div className="form-group row mb-2">
                        <label htmlFor="birthDate" className="col-sm-2 col-form-label">
                            <b> Birth Date</b>
                        </label>
                        <div className="col-sm-10">
                            <Field type="date" name="birthDate" className={`form-control ${(submitted || touched.birthDate) && errors.birthDate ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="birthDate" component="div" className="error-message" />
                          
                        </div>
                    </div>

                    <div className="form-group row mb-2">
                        <label htmlFor="biography" className="col-sm-2 col-form-label">
                            <b>Biography</b>
                        </label>
                        <div className="col-sm-10">
                            <Field as="textarea" name="biography" className={`form-control ${(submitted || touched.biography) && errors.biography ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="biography" component="div" className="error-message" />
                           
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mt-3" style={{ marginBottom: '20px' }} disabled={!isValid}>
                            Submit
                        </button>
                    </div>

                    
                </Form>
            )}
        </Formik>
    );
};

export default AuthorForm;






