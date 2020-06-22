import React, {Component} from 'react';

import { connect } from 'react-redux';
import { getSinglePostByIdAction } from '../../store/actions/postActions';

class SinglePost extends Component {
  componentDidMount() {
    this.props.getSinglePostById(this.props.match.params.id)
  }

  render () {
    const {singlePost} = this.props;
    let post = singlePost ? (
      <div>
        <h2>
          {singlePost.cereal}
        </h2>
        <p>
          {singlePost.content}
        </p>
      </div>
    ) :  (null)

    return (
      <div>
        {post}
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