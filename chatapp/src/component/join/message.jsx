import React from 'react'
import '../../style/message.scss'


const message = ({user,Message,classs}) => {

  if (user){
    return (
      <div className={`messagebox , ${classs}`}>
        {`${user}: ${Message}`}
      </div>
    )
  }

  else {
  return (
    <div className={`messagebox , ${classs}`}>
      {`you: ${Message}`}
    </div>
  )
  }
}

export default message
