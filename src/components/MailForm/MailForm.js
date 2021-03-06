import React from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import BookCover from './BookCover';

import styles from './MailForm.module.scss';

export default class PureMailForm extends React.Component {
  state = {
    name: null,
    email: null,
  }

  _handleChange = (e) => {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    addToMailchimp(this.state.email, { name: this.state.name })
      .then(({ msg, result }) => {
        console.log('msg', `${result}: ${msg}`);
        if (result !== 'success') {
          throw msg;
        }
        alert(msg);
      })
      .catch((err) => {
        console.log('err', err);
        alert(err);
      });
  }

  render() {
    // Only pull a query from a static page or component (within the component)

    return (

      <div className={styles['mailForm']}>
        <div className={styles['mailForm__inner_left']}>
          <h1 className={styles['mailForm__title']}>Download FREE Chapter</h1>
          <p className={styles['mailForm__body']}>
            Subscribe to my bitesize, weekly newsletter & get the introduction
            to my new book, <i>Why Your Startup is Failing</i>, for FREE:
          </p>
          <form onSubmit={this._handleSubmit} className={styles['mailForm__form']}>
            <input type="text" onChange={this._handleChange} placeholder="Name" name="name" className={styles['mailForm__form__input']} />
            <input type="email" onChange={this._handleChange} placeholder="Email" name="email" className={styles['mailForm__form__input']} />
            <input type="submit" className={styles['mailForm__form__submit']} />
          </form>
        </div>
        <BookCover />
      </div>
    );
  }
}
