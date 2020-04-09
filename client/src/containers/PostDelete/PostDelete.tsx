import React from 'react';
import { Modal } from '../../components/Modal/Modal';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { RouteComponentProps } from 'react-router';
import { fetchPost, deletePost } from '../../actions/postsActions';
import { Post } from '../../reducers/postsReducer';
import { Link } from 'react-router-dom';
import history from '../../history';

interface PostDeleteProps extends RouteComponentProps<OwnPropsParams> {
    post: Post;
    fetchPost: (id: string) => void;
    deletePost: (post: string) => void;
}

class PostDelete extends React.Component<PostDeleteProps> {
    componentDidMount(): void {
        this.props.fetchPost(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button
                    onClick={() => this.props.deletePost(id)}
                    className="ui button negative"
                >
                    Delete
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.post) {
            return 'Are you sure?';
        }
        return (
            <div>
                Post with localized_name <strong>"{this.props.post.localized_name}"</strong> will
                be deleted.
                <p>Are you sure?</p>
            </div>
        );
    }

    render() {
        return (
            <Modal
                localized_name="Delete Post"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
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
    { fetchPost, deletePost }
)(PostDelete);
