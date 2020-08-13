import React, {Component} from 'react';

import { connect } from 'react-redux';
import { getSinglePostByIdAction } from '../../store/actions/postActions';

import Comments from '../Comments/Comments';

import renderHTML from 'react-render-html';


class SinglePost extends Component {
  componentDidMount() {
    this.props.getSinglePostById(this.props.match.params.id)
  }

  render () {
    const {singlePost} = this.props;
    let post = singlePost.cereal ? (
      <div>
        <h2>
          {singlePost.cereal}
        </h2>
        {renderHTML(singlePost.content)}
      </div>
    ) :  (null)

    return (
      <div>
        {post}
        <Comments postId={this.props.match.params.id}/>
        {this.props.error ? (<p>
           {this.props.error}
        </p>) : (null)
        }
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    singlePost: state.posts.singlePost,
    error: state.posts.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePostById: id => dispatch(getSinglePostByIdAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)