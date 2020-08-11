import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getAllCommentsForPostAction, createCommentForPostActon } from '../../store/actions/commentAction';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import renderHTML from 'react-render-html';



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

    if (this.state.content == '') {
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
      function (comment) {
        return (
          <p>
           { renderHTML(comment.content) }
          </p>
        )
      }
    ) : (
      <p> there are no comments </p>
      )
    return (
      <div>
        <p>
          comments
        </p>
        { this.props.auth.uid ? (
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor='content'></label>
              <ReactQuill
                id="content"
                modules={this.modules}
                formats={this.formats}
                value={this.state.content}
                placeholder='write something :D'
                onChange={this.handleChange} />
            </div>
            <button>
              create
            </button>
            {this.props.err ? (<p>{this.props.err}</p>) : (null)}
            {this.state.commentError ? (<p>{this.state.commentError}</p>) : (null)}
          </form>
        ) : <p>
          sign in to create a comment
        </p> }
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
