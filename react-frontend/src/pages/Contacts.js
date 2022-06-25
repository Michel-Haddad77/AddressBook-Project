import axios from "axios";
import { useState,useEffect } from "react";
import Button from "../Components/Button";

function Contacts(){

    const token = localStorage.getItem("token");
    const url = 'http://localhost:8080/api/contact/get_contacts' +'?id='
     + localStorage.getItem('id');

    const [contacts, setContacts] = useState([]);

    useEffect(()=>{
        axios({
            method: 'get',
            url: url,
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

    return(
        <>
        <Button type = "button" text={"Add new Contact"} />
        <table>
            <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Rel Status</th>
                <th>Email</th>
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