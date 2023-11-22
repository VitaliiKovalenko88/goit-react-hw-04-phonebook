import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { value, name } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;

    this.props.onSubmit(name, number);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <form className={css.formContainer} onSubmit={this.handleSubmit}>
          <label className={css.lbl}>
            Name
            <input
              className={css.inp}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </label>

          <label className={css.lbl}>
            Number
            <input
              className={css.inp}
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              required
            />
          </label>

          <button className={css.btn} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
