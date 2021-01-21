/* 
This component renders the main view of the app - a list of donors and their basic
contact information, along with action choices for each entry.
*/

import { React, useEffect } from "react";
import { Link } from "react-router-dom";

//Hooks
import { useDispatch, useSelector } from "react-redux";

//Actions
import { fetchDonorList } from "../../actions";

//Components
import UserProfile from "../Auth/UserProfile";
import Button from "../Button";

//Helper functions

// Styles
import "../../css/donor-list.css";

const DonorList = () => {
  const list = useSelector(state => state.donors);
  const dispatch = useDispatch();

  //MAKE A CALL FOR LIST OF DONORS
  useEffect(() => {
    dispatch(fetchDonorList());
  }, [dispatch]);

  //Renders action buttons.
  const renderActions = id => {
    return (
      <div className='donor-list-action-buttons'>
        <Link to={`/donor-details/${id}`}>
          <Button
            btnColor='teal-button'
            btnSize='large-button'
            btnText='Details'
          />
        </Link>
        <Link to={`/edit-donor/${id}`}>
          <Button
            btnColor='yellow-button'
            btnSize='large-button'
            btnText='Edit'
          />
        </Link>
        <Link to={`/delete-donor/${id}`}>
          <Button
            btnColor='red-button'
            btnSize='large-button'
            btnText='Delete'
          />
        </Link>
      </div>
    );
  };

  //Render the list of donors.
  const renderList = () => {
    const newList = Object.values(list);
    return newList.map((donor, idx) => {
      let background = idx % 2 === 0 ? "grey" : "white";

      return (
        // Add logic here that adds alternating colors for the rows. Perhaps use even/odd status of the id.
        <div key={donor.id} className={`donor-list-item ${background}`}>
          <div className='donor-list-name'>
            {donor.firstName} {donor.lastName}
          </div>
          <div className='donor-list-email-container'>
            <a
              href={`mailto:${donor.email}`}
              target='blank'
              className='donor-list-email'>
              {donor.email}
            </a>
          </div>
          <div className='donor-list-phone'>{donor.phone}</div>
          <div className='donor-list-actions'>{renderActions(donor.id)}</div>
        </div>
      );
    });
  };

  return (
    <div className='donor-list'>
      <div className='donor-list-container'>
        <h1 className='donor-list-title'>Donor List</h1>
        <div className='donor-list-global-actions'>
          <Link to='/create-donor' className='create-donor-button'>
            <Button
              btnColor='blue-button'
              btnSize='xl-button'
              btnText='+ New Donor'
            />
          </Link>
          <input className='donor-search' placeholder='Search Donors' />
        </div>
        <div className='donor-list-headings'>
          {/* <h2 className='donor-list-heading-item'>Name</h2>
          <h2 className='donor-list-heading-item'>Email</h2>
          <h2 className='donor-list-heading-item'>Phone</h2>
          <h2 className='donor-list-heading-item'>Actions</h2> */}
        </div>
        <div className='donor-list-content'>{renderList()}</div>
      </div>
    </div>
  );
};

export default DonorList;
