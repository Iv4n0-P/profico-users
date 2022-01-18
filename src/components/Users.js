import React from 'react'
import { fetchUsers } from '../actions'
import { connect } from 'react-redux'
import Add from './Add'
import { useNavigate } from 'react-router-dom'

const Users = (props) => {

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = React.useState('')
    const [filteredResults, setFilteredResults] = React.useState([])
    const [currPage, setCurrPage] = React.useState(1)

    React.useEffect(() => {
        props.fetchUsers(1)
    }, [])

    React.useEffect(() => {
        setFilteredResults(props.users)
    }, [props.users])

    const handleOnChange = (value) => {
        setSearchInput(value)

        if (value.length > 1) {
            const filteredData = props.users.filter((user) => {
                return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(props.users)
        }
    }

    return (
        <div className="main-content">

            <div className="sidebar">
                <div className="titlebar">
                    <h1 className="users-title">Users</h1>
                    <p className="subtitle">User dashboard</p>
                </div>

                <div className="sidebar-content">
                    <div className="search-container">
                        <input type="text" name="search" placeholder="Search users..." className="search-input" onChange={(e) => { handleOnChange(e.target.value) }} />
                        <a href="#" className="search-btn">
                            <p className="search-ico">&#x02315;</p>
                        </a>
                    </div>
                    <a className="button" href="#popup1">+ add user</a>
                </div>

                <div className="sidebar-footer">
                    <p onClick={() => {
                        navigate('/')
                    }} className="lnk-alt">&#x21A9; Logout</p>
                    <p className="lnk-alt">Help & support</p>
                </div>

            </div>

            <div className="users">
                {filteredResults.map((user) => {
                    return (
                        <div className="user" key={user.id}>
                            <img className="user-img" src={user.avatar} />
                            <p className="user-title">{user.first_name} {user.last_name}</p>
                            <p className="lnk">User details</p>
                        </div>
                    )
                })}
                <div className="users-footer">
                    {currPage === 2 && <p onClick={() => {
                        props.fetchUsers(1)
                        setCurrPage(1)
                    }} className="pagination">Go to page 1</p>}
                    {currPage === 1 && <p onClick={() => {
                        props.fetchUsers(2)
                        setCurrPage(2)
                    }} className="pagination">Go to page 2</p>}
                </div>
            </div>
                   
            <Add />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUsers })(Users)