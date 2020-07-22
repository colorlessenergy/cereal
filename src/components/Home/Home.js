import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getAllPostAction } from '../../store/actions/postActions';

import { Link } from 'react-router-dom';

import renderHTML from 'react-render-html';

import classes from './Home.module.css';


class Home extends Component {
  state = {
    posts: [],
    filterValue: '',
    noReviewsForPostMessage: ''
  }


  /**
   * if the input to filter cereal is empty
   * display all the builds
   * 
   * the filterValue state is needed because when updating posts
   * it would always reset the posts in state to have them all
   * 
   * 
   *
   * @param {Object} props.posts - holds all all the posts
   * @param {Object} state.filterValue - the value of the input
   */

  static getDerivedStateFromProps(props, state) {
    if (state.filterValue === '') {
      return {
        posts: props.posts
      }
    }

    return null;
  }

  /**
   * fetches the post from the DB and puts them in this.props.posts
   */
  componentDidMount () {
    this.props.getAllPosts();
  }

  /**
   * get the value of the input and filter the cereal posts with it
   * 
   * @param {String} ev.target.value - the current value of the input
   */

  filterPost = (ev) => {
    let posts = this.props.posts.slice();

    posts = posts.filter((post) => {
      return post.cereal.toLowerCase().includes(ev.target.value);
    });

    let noReviewsForPostMessage = '';
    if (posts.length === 0) {
      noReviewsForPostMessage = 'There are no reviews for this cereal';  
    }

    this.setState({
      posts: posts,
      filterValue: ev.target.value,
      noReviewsForPostMessage: noReviewsForPostMessage
    });
  }

  render () {
    let posts = this.state.posts.length ? this.state.posts.map((post) => {
      return (
        <Link
          className={classes['post']}
          key={post._id} 
          to={`/cereal/${post._id}`}>
          <h2
            className={classes['post__title']}>
            { post.cereal }
          </h2>
          <div>
            { renderHTML(post.content) }
          </div>
        </Link>
      )
    }) : (<p>
      posts are loading..
    </p>);

    return (
      <div>
        <h1>cereal reviews</h1>
        <div className={classes["filter"]}>
          <label htmlFor="filter-cereal">
            <input
              className={classes["filter__input"]}
              onChange={this.filterPost}
              placeholder='filter post by cereal' 
              type="text" />
          </label>
        </div>
        <div className={classes['posts']}>
          { posts }
          <p>
            {this.state.noReviewsForPostMessage}
          </p>
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


export default connect(mapStateToProps, mapDispatchToProps)(Home);