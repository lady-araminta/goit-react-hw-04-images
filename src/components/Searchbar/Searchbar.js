import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { GrSearch } from 'react-icons/gr';
import {
  SearchBox,
  SearchButton,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ query, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleQueryChange = e => {
    console.log(e.currentTarget.value);
    setSearchQuery(e.currentTarget.value.toLowerCase().trim());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') {
      toast('Enter a search query!');
      return;
    }
    if (query === searchQuery) {
      toast(
        'We have already found pictures for this request. Enter something else!'
      );
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <SearchBox>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <GrSearch />
        </SearchButton>
        <SearchInput
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </SearchBox>
  );
};

export class OldSearchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase().trim() });
  };
  handleSubmit = event => {
    const { query } = this.state;
    event.preventDefault();
    if (query === '') {
      toast('Enter a search query!');
      return;
    }
    if (this.props.query === query) {
      toast(
        'We have already found pictures for this request. Enter something else!'
      );
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <SearchBox>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <GrSearch />
          </SearchButton>
          <SearchInput
            type="text"
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </SearchForm>
      </SearchBox>
    );
  }
}

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
};
