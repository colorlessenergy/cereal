import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getAllCommentsForPostAction, createCommentForPostActon } from '../../store/actions/commentAction';

import { Link } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import renderHTML from 'react-render-html';

import classes from './Comments.module.css';


class Comments extends Component {
  state = {
    content: '',
    commentError: ''
  }

  // config for react quill
  modules = {
    toolbar: [
      [{ header: '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['code-block']
    ]
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'code-block'
  ];

  componentDidMount () {
    this.props.getAllCommentsForPost(this.props.postId);
  }

  // handlers for creating a comment

  handleChange = (content) => {
    this.setState({
      content: content
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    if (this.state.content === '') {
      return this.setState({
        commentError: 'Missing Content'
      });
    }

    let formatData = {
      content: this.state.content,
      FIREBASE_ID: this.props.auth.uid
    }

    this.setState({
      content: '',
      commentError: ''
    })

    this.props.createCommentForPost(this.props.postId, formatData);
  }

  render() {

    let comments = this.props.comments ? this.props.comments.comments.map(
      function (comment, index) {
        // format the date for the comment to month day, year
        let date = new Date(comment.createdAt);
        let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        date = date.toLocaleDateString('en-US', dateOptions);

        return (
          <div key={index} className={classes['comment']}>
            <p className={classes['date']}>{date}</p>
            <div>
              {renderHTML(comment.content)}
            </div>
          </div>
        )
      }
    ) : (
      <p> there are no comments </p>
      )
    return (
      <div>
        { this.props.auth.uid ? (
          <form onSubmit={this.handleSubmit}>
            <div className={classes['text-box']}>
              <label htmlFor='content'></label>
              <ReactQuill
                id="content"
                modules={this.modules}
                formats={this.formats}
                value={this.state.content}
                placeholder='write something :D'
                onChange={this.handleChange} />
            </div>
            <button className={classes['form__button']}>
              comment
            </button>
            {this.props.err ? (<p className='error'>{this.props.err}</p>) : (null)}
            {this.state.commentError ? (<p className='error'>{this.state.commentError}</p>) : (null)}
          </form>
        ) : <p className={classes['cta-comment']}>
            <Link className={classes['cta-comment__link']} to={'/login'}>sign in</Link> to create a comment
        </p> }
        <p>
          comments
        </p>
        {comments}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    err: state.comments.err,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCommentsForPost: id => dispatch(getAllCommentsForPostAction(id)),
    createCommentForPost: (id, comment) => dispatch(createCommentForPostActon(id, comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
