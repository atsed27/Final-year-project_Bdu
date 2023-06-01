import React from 'react'

const AdvertCategory = ({data, minimize}) => {
  return (
    <>
    <div className="follower category">
        <img
          src={process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
          alt="Profile"
          className="followerImage"
          style={{ width: "50px", height: "50px" }}
        />
        {minimize ? ("") :(<div className="name" style={{fontSize: '0.8rem'}}>
          <span>{data?.name}</span>
        </div>)}
     
    </div>
    <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
  </>
  )
}

export default AdvertCategory