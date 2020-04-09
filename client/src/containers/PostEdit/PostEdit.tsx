import React, { Component } from 'react';
import _ from 'lodash';
import { PostForm } from '../../components/PostForm/PostForm';
import { connect } from 'react-redux';
import { editPost, fetchPost } from '../../actions/postsActions';
import { Post } from '../../reducers/postsReducer';
import { RootState } from '../../store';
import { RouteComponentProps } from 'react-router';

interface PostEditProps extends RouteComponentProps<OwnPropsParams> {
    post: Post;
    fetchPost: (id: string) => void;
    editPost: (post: Post) => void;
}

class PostEdit extends Component<PostEditProps> {
    componentDidMount(): void {
        console.log(this.props)
        this.props.fetchPost(this.props.match.params.id);
    }

    render() {
        if (!this.props.post) {
            return null;
        }
        return (
            <PostForm
                initialValues={_.pick(this.props.post, 'localized_name', 'primary_attr')}
                onSubmit={this.props.editPost}
                currentPost={this.props.post}
            />
        );
    }
}

interface OwnPropsParams {
    id: string;
}

function mapStateToProps(
    state: RootState,
    ownProps: RouteComponentProps<OwnPropsParams>
) {
    return {
        post: state.posts.items[ownProps.match.params.id]
    };
}

export default connect(
    mapStateToProps,
    { fetchPost, editPost }
)(PostEdit);
