/* 
This component renders a search field and handles autosuggest search of all donors.
*/

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Autosuggest from "react-autosuggest";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const Search = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //Convert donor list object to array of objects.
  //   const donorsArr = Object.values(donors);

  //Grab the list of donors from redux store.
  const donorList = useSelector(state => state.donors);

  //Convert list of donors from object to array of objects.
  const searchableDonors = Object.values(donorList);

  console.log(searchableDonors);

  //Retrieve suggestions
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : searchableDonors.filter(
          donor => donor.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  const onChange = (event, { newValue }) => {
    setValue("newValue");
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Call to clear suggestions
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "SearchDonors",
    value,
    onChange: onChange,
    className: 'form-control form-control-sm donor-search-field'
  };

  return (
    //  <InputGroup className='donation-list-search'>
    //    <Form.Control
    //      placeholder='Search Coming Soon'
    //      aria-label='Search Donor'
    //      aria-describedby='basic-addon2'
    //      size='sm'
    //      className='donor-search-field'
    //    />
    //    <InputGroup.Append>
    //      <Button variant='dark' size='sm' className='search-donor-button'>
    //        Search
    //      </Button>
    //    </InputGroup.Append>
    //  </InputGroup>

   //  <InputGroup >
      <Autosuggest
        
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
   //  </InputGroup>
  );
};

export default Search;
