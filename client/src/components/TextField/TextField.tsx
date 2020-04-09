import React from 'react';
import { Field, FieldProps } from 'formik';
import { OwnInnerFieldProps } from '../PostForm/PostForm';

const TextField: React.FunctionComponent<OwnInnerFieldProps> = ({
    localized_name,
    field,
    form
}) => {
    const className = `field ${
        form.touched.localized_name && form.errors.localized_name ? 'error' : null
        }`;
    return (
        <div className={className}>
            <label htmlFor="localized_name">Title</label>
            <Field type="text" name="localized_name" placeholder="Title" />

            {form.touched.localized_name && form.errors.localized_name ? (
                <div className="ui pointing red basic label">
                    {form.errors.localized_name}
                </div>
            ) : null}
        </div>
    );
};

export default TextField;
