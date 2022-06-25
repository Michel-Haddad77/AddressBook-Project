import Button from "../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    function signUp(){
        let data = {
            "name":name,
            "email":email,
            "password":password
        }
    
        //linking with sign up api
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/register',
            data: data,
        })
        .then(function (response) {
            console.log(response.data);
            alert(response.data.name + " has successfully registered! \nPlease login to proceed");
            //navigate to login page
            navigate("/");
        })
        .catch(function (error){
            console.log(error);
        })
    }

    return(
        <div className="login-background">
            <form className="login-container" onSubmit={(e) => {
                e.preventDefault();
                signUp();
            }}>
                <h3 className="login-h3">Sign Up</h3>
                <input 
                    type="text" 
                    placeholder="Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}    
                ></input><br/>
                <input 
                    type="text" 
                    placeholder="Email address"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                /><br/>
                <input 
                    type={showPass? "text":"password"} 
                    placeholder="Password"
                    value={password}
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
                <Button type="submit" text="Sign Up" />
                <h4>Already have an account? <Link to="/">Login</Link></h4>
            </form>
        </div>
    );
};

export default SignUp;