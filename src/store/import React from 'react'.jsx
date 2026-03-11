import React from 'react'

const usePopup = () => {
    const setPopup = (obj) => {
setPopup(old=> [...old, obj])
    }

    const closePopup = () => {
        setPopup(old => old.filter((item, index) => index !== old.length-1))
    }
    const closeallPopup = () => {
        setPopup([])
    }
  return (
    {
        closePopup,
        closeallPopup.
        setPopup
    }
  )
}

export default usePopup