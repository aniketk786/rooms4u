import React from 'react'

function Succesful({message}) {
  return (
    <div>
        <div class="alert alert-success" role="alert">
        {message}
</div>
    </div>
  )
}

export default Succesful