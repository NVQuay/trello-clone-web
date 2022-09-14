import React from "react";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Logo from "resources/images/logo192.png";

import "./AppBar.scss";

function AppBar() {
  return (
    <nav className='navbar-app'>
      <BootstrapContainer className='tsebyuaqdev-trello-container'>
        <Row>
          <Col sm={5} xs={12} className='col-no-padding'>
            <div className='app-actions'>
              <div className='item all'>
                <i className='fa fa-th' />
              </div>
              <div className='item home'>
                <i className='fa fa-home' />
              </div>
              <div className='item boards'>
                <i className='fa fa-columns' />
                &nbsp;&nbsp;<strong>Boards</strong>
              </div>
              <div className='item search'>
                <InputGroup className='group-search'>
                  <FormControl
                    className='input-search'
                    placeholder='Jump to...'
                  />
                  <InputGroup.Text className='input-icon-search'>
                    <i className='fa fa-search' />
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          <Col sm={2} xs={12} className='col-no-padding'>
            <div className='app-branding text-center'>
              <a
                href='https://www.facebook.com/nguyenvanquay.2011/'
                target='blank'
              >
                {/* <img src={Logo} className='top-logo' alt='tsebyuaqdev-logo' />
                <span className='tsebyuaqdev-slogan'>TsebyuaqDev</span> */}
              </a>
            </div>
          </Col>
          {/* <Col sm={5} xs={12} className='col-no-padding'>
            <div className='user-actions'>
              <div className='item quick'>
                <i className='fa fa-flus-square-o' />
              </div>
              <div className='item news'>
                <i className='fa fa-info-cicrle' />
              </div>
              <div className='item notification'>
                <i className='fa fa-bell-o' />
              </div>
              <div className='item user-avatar'>
                <img
                  src='https://www.facebook.com/photo/?fbid=4010367005738435&set=a.278290335612806'
                  className='avatar-tsebyuaqdev'
                  alt='tsebyuaqdev'
                />
              </div>
            </div>
          </Col> */}
        </Row>
      </BootstrapContainer>
    </nav>
  );
}

export default AppBar;
