import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image, Dropdown } from 'react-bootstrap';
import { BellFill, BoxArrowRight, CloudDownload, GearFill, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import NotificationsDropdown from './NotificationsDropdown';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '10px' };
  return (
    <Navbar bg="white" expand="lg" style={menuStyle}>
      <Container>
        <Image src="images/VoluntreeLogoCropped.png" width="6%" />
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/" className="logoFont"><h1>Voluntree</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_DASHBOARD_VOLUNTEER} as={NavLink} to="/dashboard-volunteer" key="feedback">Dashboard</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_FEEDBACK} as={NavLink} to="/feedback" key="feedback">Feedback</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENTS} as={NavLink} to="/volunteer-list-events" key="volunteer-list-events">Events</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/add-event" key="add-event">Add Event</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database"><CloudDownload /> Database</NavDropdown.Item>
                </NavDropdown>]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Dropdown>
                  <Dropdown.Toggle style={{ backgroundColor: 'white', border: 'none' }} bsPrefix="dropdown">
                    <BellFill style={{ color: 'black' }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Container>
                      <NotificationsDropdown />
                    </Container>
                  </Dropdown.Menu>
                </Dropdown>

                <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_VOLUNTEER_PROFILE_DROPDOWN} as={NavLink} to="/volunteer-profile">View Profile</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_VOLUNTEER_ORGANIZATION_DROPDOWN} as={NavLink} to="/organization-page">View Organization</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_SETTINGS} as={NavLink} to="/volunteer-settings"><GearFill /> Settings</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
