import { useState } from 'react';
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
          value={searchQuery}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </SearchBox>
  );
};

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
};
