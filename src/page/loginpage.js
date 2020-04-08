import React from 'react';
import '../App.css';
import axios from 'axios';
import {Url} from '../Url';

class Loginpage extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post(`${Url.api}${Url.login}`, this.state).then((result) => {
            console.log(result)
            if(result.status == '200') {
                localStorage.setItem('token', result.data.token);
                console.log(Url.token)
                window.location.href = "/homepage"
            } 
        })
    }

    render() {
        const { username, password } = this.state
        return (
        <div className="loginpage">
            <div className="logincard">
                <form onSubmit={this.submitHandler}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" placeholder="Enter Username" value={username} onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" value={password} onChange={this.changeHandler} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
        )
    };
}

export default Loginpage;