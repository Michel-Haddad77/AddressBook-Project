import axios from "axios";
import { useState,useEffect } from "react";
import Button from "../Components/Button";
import {FaFilter} from "react-icons/fa";

function Contacts(){
    const token = localStorage.getItem("token");

    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [rel_status, setRelStatus] = useState("");
    const [email, setEmail] = useState("");

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

    return(
        <>
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
            <tr>
                <th>Name <FaFilter/></th>
                <th>Mobile <FaFilter/></th>
                <th>Rel Status <FaFilter/></th>
                <th>Email <FaFilter/></th>
                <th>Location</th>
            </tr>
            {contacts.map((contact) => {
                return (
                    <tr>
                        <td>{contact.name}</td>
                        <td>{contact.mobile}</td>
                        <td>{contact.rel_status}</td>
                        <td>{contact.email}</td>
                        <td><Button type="button" text ={"Show on Map"} /></td>
                    </tr>
                );
            })}
        </table>
        </>
    )
}

export default Contacts;