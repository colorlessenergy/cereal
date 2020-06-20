import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getAllPostAction } from '../../store/actions/postActions';


class Home extends Component {
  componentWillMount () {
    this.props.getAllPosts();
  }

  render () {
    console.log(this.props.posts)
    return (
      <div>
        <h1>cereal reviews</h1>
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