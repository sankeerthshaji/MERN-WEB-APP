import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='black' className='text-center text-lg-left'>
      <div className='text-center p-3 text-white'>
        &copy; TravelTales, {new Date().getFullYear()}. All rights reserved.
      </div>
    </MDBFooter>
  );
}
