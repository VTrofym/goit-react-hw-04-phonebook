import { ContactList } from 'components/ContactList';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import css from './App.module.css';
const ID_LOCAL_KEY = 'active-id';

export class App extends Component {
  state = {
    contacts: [
      { id: '1', name: 'John Bold', number: '(067)-323-43-43' },
      { id: '2', name: 'Jane Gold', number: '(066)-123-24-43' },
      { id: '3', name: 'Jim Fold', number: '(097)-456-40-39' },
      { id: '4', name: 'Jack Daniels', number: '(050)-488-48-38' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem(ID_LOCAL_KEY));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(_, oldState) {
    const { contacts } = this.state;
    if (this.state.contacts.length !== oldState.contacts.length) {
      localStorage.setItem(ID_LOCAL_KEY, JSON.stringify(contacts));
    }
  }

  handleChangeInput = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  addContact = (name, number) => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts!`);
    }
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            name: name,
            number: number,
            id: nanoid(),
          },
        ],
      };
    });
  };

  deleteContact = event => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== event.target.id
        ),
      };
    });
  };

  filterContact = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalisedFilter = this.state.filter.toLowerCase();
    console.log('this.state.contacts', this.state.contacts);
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  render() {
    return (
      <div className={css.allContent}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.filterContact} value={this.state.filter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

// готовый метод события нажатия на кнопку escape, ставится сразу после объявления Класса
//  componentDidMount() {
//     console.log('componentDidMount')
//     window.addEventListener('keydown', this.handleKeyDown)
//   }

//   componentWillUnmount() {
//     console.log('componentWillUnmount')
//     window.removeEventListener('keydown', this.handleKeyDown)
//   }

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose()
//     }
//   }

//   handleKeyDown = e => {
//     console.log('нажимаем кнопкy', e.code)
//     if (e.code === 'Escape') {
//       console.log('Нажали ESC ')
//       // this.props.onClose();/ сюда ставится функция, например закрытия модалки
//     }
//   }
