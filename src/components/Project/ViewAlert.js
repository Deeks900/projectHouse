import React from 'react'

const ViewAlert = ({ errorProp, loadingProp }) => {
    return (
        <>
            {errorProp == null && loadingProp == true && <div style={{ border: '2px solid white', fontWeight: 'bold', color: 'white', borderRadius: '10px', paddingRight: '17px', paddingLeft: '17px', marginTop: '-25px', marginBottom: '10px', backgroundColor: "#E97451", paddingTop: '6px', paddingBottom: '6px' }}>{"Adding the Details..."}</div>}
            {errorProp == false && loadingProp == false && <div style={{ border: '2px solid white', fontWeight: 'bold', color: 'white', borderRadius: '10px', paddingRight: '17px', paddingLeft: '17px', marginTop: '-25px', marginBottom: '10px', backgroundColor: "#6EC72D", paddingTop: '6px', paddingBottom: '6px' }}>{"Project Added Successfully"}</div>}
            {errorProp != false && errorProp != null && loadingProp == false && <div style={{ border: '2px solid white', fontWeight: 'bold', color: 'white', borderRadius: '10px', paddingRight: '17px', paddingLeft: '17px', marginTop: '-25px', marginBottom: '10px', backgroundColor: "#FF6263", paddingTop: '6px', paddingBottom: '6px' }}>{errorProp}</div>}
        </>
    )
}

export default ViewAlert