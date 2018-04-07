// react
import React from 'react';
// components
import { EditableLine } from './EditableLine';
import { Button } from 'react-bootstrap';


// ============================================================================ //
const Header = () => (
  <header className='root-header'>
    <EditableLine
       altclassName='form-control transparent'
       className='form-control'
       value='This board name is editable upon a click' />
    <Button> Remove All Lists </Button>
  </header>
);

export default Header;
