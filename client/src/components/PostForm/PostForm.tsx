import React from 'react';
import { Field, FieldProps, Formik, FormikProps } from 'formik';
import { object, string } from 'yup';
import TextField from '../TextField/TextField';
import { Post } from '../../reducers/postsReducer';

export interface FormValues {
    localized_name: string;
    primary_attr: string;
}

export type OwnPostFormProps = {
    onSubmit: (post: Post) => void;
    initialValues: FormValues;
    currentPost?: Post;
};

export type OwnInnerFieldProps = FieldProps<FormValues> & FormValues;

export const PostForm: React.FunctionComponent<OwnPostFormProps> = props => {
    console.log(props);
    const enchanceId = (values: FormValues): Post => {
        return {
            ...values,
            _id: props.currentPost
                ? props.currentPost._id
                : Math.round(Math.random() * 10e4),
            id: props.currentPost
                ? props.currentPost.id
                : Math.round(Math.random() * 10e4)
        };
    };

    return (
        <div>
            <h2>Posts New:</h2>
            <Formik
                initialValues={props.initialValues}
                onSubmit={(values: FormValues) =>
                    props.onSubmit(enchanceId(values))
                }
                validationSchema={object().shape({
                    localized_name: string()
                        .required('Entering your first name is required.')
                        .min(5, 'Minimum 5')
                })}
                render={({
                    touched,
                    handleSubmit
                }: FormikProps<FormValues>) => (
                        <form onSubmit={handleSubmit} className="ui form">
                            <Field
                                name="localized_name"
                                render={(innerProps: OwnInnerFieldProps) => (
                                    <TextField {...innerProps} localized_name="Title" />
                                )}
                            />
                            <div className="field">
                                <label htmlFor="primary_attr">Author</label>
                                <Field
                                    type="text"
                                    name="primary_attr"
                                    placeholder="Author"
                                />
                            </div>
                            <button className="ui button" type="submit">
                                Submit
                        </button>
                        </form>
                    )}
            />
        </div>
    );
};
