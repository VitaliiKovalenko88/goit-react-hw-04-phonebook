import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    };
  };

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) { localStorage.setItem('contacts', JSON.stringify(nextContacts)); }
  }

  generateId = () => nanoid();

  addContact = (name, number) => {
    const dataContacts = {
      id: this.generateId(),
      name,
      number,
    };

    const searchSameContact = this.state.contacts.find(contact => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });

    if (searchSameContact) {
      alert(`"${name}" вже є в вашому списку`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [dataContacts, ...prevState.contacts],
      };
    });
  };

  onChangeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <h2>PhoneBook</h2>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChangeFilter={this.onChangeFilter}
        />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;