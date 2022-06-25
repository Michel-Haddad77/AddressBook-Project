import Button from "../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    function login(){
        const data = {
            "email":email,
            "password":password,
        }

        //linking with login api
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/login',
            data: data,
        })
        .then(function (response) {
            console.log(response.data);
            //storing the token in local storage
            let token = response.data.token;
            localStorage.setItem("token", token);

            //saving logged in user id in local storage
            let id = response.data.id;
            localStorage.setItem("id", id);

            // navigate("/all_surveys");
        })
        .catch(function (error){
            console.log(error);
        })
    }

    return (
        <form className="login-container" onSubmit={(e) => {
            e.preventDefault();
            login();
        }}>
            <h3 className="login-h3">Login</h3>
            <input 
                type="text" 
                placeholder="Email address"
                
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                required
            /><br/>
            <input 
                type={showPass? "text":"password"} 
                placeholder="Password"
                
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            /><br/>
            <div>
                <input type="checkbox" 
                    onChange={(e) => {
                        setShowPass(!showPass)
                    }} />
                <label>Show Password</label>
            </div>
            <Button type ="submit" text="Login"/>
            <h4>New account? <Link to="/signup">Sign Up</Link></h4>
        </form>
    )
}

export default Login;