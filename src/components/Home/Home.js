import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getAllPostAction } from '../../store/actions/postActions';

import { Link } from 'react-router-dom';



class Home extends Component {
  componentWillMount () {
    this.props.getAllPosts();
  }

  render () {
    let posts = this.props.posts ? this.props.posts.map((post) => {
      return (
        <Link
          key={post._id} 
          to={`/cereal/${post._id}`}>
          <h2>
            { post.cereal }
          </h2>
          <p>
            { post.content }
          </p>
        </Link>
      )
    }) : (null);

    return (
      <div>
        <h1>cereal reviews</h1>

        <div>
          { posts }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPosts: () => dispatch(getAllPostAction())
  }
}


const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  }
}


export default connect( mapStateToProps, mapDispatchToProps)(Home);