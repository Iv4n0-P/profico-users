import React from 'react'
import Users from './Users'
import Login from './Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {

    return (
        <div className="section">
            
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/users" element={<Users />}/>
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default App