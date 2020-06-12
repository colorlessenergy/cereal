import React from 'react'

import {Link} from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <Link to='/login'>login</Link>
      <Link to='/register'>register</Link>
    </div>
  )
}
