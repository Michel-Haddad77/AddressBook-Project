import axios from "axios";
import { useState,useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import {FaFilter, FaWindowClose} from "react-icons/fa";
import Map from "../Components/Map";

function Contacts(){
    window.dispatchEvent(new Event('resize'));

    const token = localStorage.getItem("token");

    //States
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [rel_status, setRelStatus] = useState("");
    const [email, setEmail] = useState("");
    const [show_map, setShowMap] = useState(false);
    const [loc, setLoc] = useState([33.893106, 35.480221]);
    const navigate = useNavigate();

    //get all contacts
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/contact/get_contacts',
            params: { id: localStorage.getItem('id') },
            headers: {
                "Authorization": token,
            }
        }).then(function (response) {
            console.log(response.data);
            setContacts(response.data);
        }).catch(function (error){
            console.log(error);
        })
    },[])

    //function for add contact button
    function addContact(){
        let data = {
            "name":name,
            "mobile": mobile,
            "rel_status": rel_status,
            "email":email
        }

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/contact/add_contact',
            params: { id: localStorage.getItem('id') },
            data: data,
            headers: {
                "Authorization": token,
            }
        }).then(function (response) {
            console.log("added contact" , response.data);
            setContacts([...contacts,response.data]);
        }).catch(function (error){
            console.log(error);
        })
    }

    //function for show on map button
    function showOnMap(coordinates){
        setShowMap(true);
        setLoc(coordinates);
    }

    function logout(){
        localStorage.clear();
        navigate("/");
    }

    return(
        <>
        <Button text = {"Logout"} styling="logout-btn" onClick={logout}/>
        <form className="contact-form"
            onSubmit={(e)=>{
                e.preventDefault();
                addContact();
            }}
        >
            <input 
                type="text" 
                placeholder="Name" 
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <input 
                type="text" 
                placeholder="Phone Number" 
                onChange={(e) => {
                    setMobile(e.target.value);
                }}
            />
            <input 
                type="text" 
                placeholder="Relationship Status" 
                onChange={(e) => {
                    setRelStatus(e.target.value);
                }}
            />
            <input 
                type="text" 
                placeholder="Email" 
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <Button type = "submit" text={"Add new Contact"} />
        </form>
        
        <table>
        <thead>
            <tr>
                <th>Name <FaFilter/></th>
                <th>Mobile <FaFilter/></th>
                <th>Rel Status <FaFilter/></th>
                <th>Email <FaFilter/></th>
                <th>Location</th>
            </tr>
        </thead>
        <tbody>
            {contacts.map((contact) => {
                return (
                    <tr key = {contact._id}>
                        <td>{contact.name}</td>
                        <td>{contact.mobile}</td>
                        <td>{contact.rel_status}</td>
                        <td>{contact.email}</td>
                        <td><Button type="button" text ={"Show on Map"} 
                                onClick={()=>{showOnMap([ Number(contact.long), Number(contact.lat)])
                            }}/>
                        </td>
                    </tr>
                );
            })}
        </tbody>
        </table>

        <div className={show_map? "show-modal":"hide-modal"} >
            <FaWindowClose className="close-icon" onClick={()=> setShowMap(false)} />
            <div className="leaflet-container">
                <Map coordinates ={loc}/>
            </div>
        </div>
        </>
    )
}

export default Contacts;