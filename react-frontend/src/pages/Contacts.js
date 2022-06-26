import axios from "axios";
import { useState,useEffect } from "react";
import Button from "../Components/Button";
import {FaFilter, FaWindowClose} from "react-icons/fa";
import Map from "../Components/Map";

function Contacts(){
    const token = localStorage.getItem("token");

    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [rel_status, setRelStatus] = useState("");
    const [email, setEmail] = useState("");
    const [show_map, setShowMap] = useState(false);
    const [loc, setLoc] = useState(['33.893106','35.480221']);

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

    function showOnMap(coordinates){
        setShowMap(true);
        setLoc(coordinates);
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
                                onClick={()=>{showOnMap([contact.long, contact.lat])
                            }}/>
                        </td>
                    </tr>
                );
            })}
        </tbody>
        </table>

        <div className={show_map? "show-modal":"hide-modal"} >
            <div className="leaflet-container">
                <FaWindowClose onClick={()=> setShowMap(false)} />
                <Map coordinates ={loc}/>
            </div>
        </div>
        </>
    )
}

export default Contacts;