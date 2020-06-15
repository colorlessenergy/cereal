import React from 'react';

import { Link } from 'react-router-dom'

function LogOutLinks () {
  return (
    <div>
      <Link to='/login'>login</Link>
      <Link to='/register'>register</Link>
    </div>
  )
}

export default LogOutLinks;