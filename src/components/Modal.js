import React from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

const Modal = () => {

    const navigate = useNavigate()

    return ReactDOM.createPortal(
        <div onClick={() => {navigate('users')}} className="overlay">
            <div onClick={(e) => {e.stopPropagation()}} className="popup">
                <p>Modal content</p>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal