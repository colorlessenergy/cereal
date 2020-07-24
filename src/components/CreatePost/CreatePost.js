import React, { Component } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { createPostAction } from '../../store/actions/postActions';

import classes from './CreatePost.module.css';

class CreatePost extends Component {
  state = {
    content: '',
    cereal: 'cheerios'
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

  handleChange = (content) => {
    this.setState({
      content: content
    });
  }

  handleCerealChange = (ev) => {
    this.setState({
      cereal: ev.target.value
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    if (this.state.content === '') {
      return this.setState({
        errorMessage: 'Missing Content'
      });
    }

    let formatData = {
      cereal: this.state.cereal,
      content: this.state.content,
      FIREBASE_ID: this.props.auth.uid
    }
    this.props.createPost(formatData, this.props.history);
  }


  render() {
    if (!this.props.auth.uid) return <Redirect to='/' />

    const { error } = this.props;
    const { errorMessage } = this.state;

    return (
      <div>
        <h1>
          create a post
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className={classes['form__group']}>
            <div className={classes['form__radio']}>
              <label htmlFor="cheerios">
              <input
                type="radio"
                id="cheerios"
                name="cereal"
                value="cheerios"
                onChange={this.handleCerealChange}
                checked />
                cheerios
              </label>
            </div>
            <div className={classes['form__radio']}>
              <label htmlFor="cinnamon_toast_crunch">
              <input
                type="radio"
                id="cinnamon_toast_crunch"
                name="cereal"
                value="cinnamon toast crunch"
                onChange={this.handleCerealChange} />
                cinnamon toast crunch
              </label>
            </div>
          </div>

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
          <button className={classes['form__button']}>
            create
          </button>
          
          {error ? (<p>
            {error}
          </p>) : (null)
          }

          {errorMessage ? (<p>
            {errorMessage}
          </p>) : (null)
          }

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.posts.error,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (data, history) => dispatch(createPostAction(data, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
