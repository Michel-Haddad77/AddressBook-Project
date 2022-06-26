const Contact = require("../../../models/Contact");
const User = require("../../../models/User");

async function addContact(req,res){
    try{
        //console.log(req.body);

        const {
            name,
            email,
            mobile,
            rel_status,
            lat,
            long
        } = req.body;

        //get user_id from params
        const user_id = req.query.id;

        //check if sent user id is correct
        const user = await User.findOne({_id: user_id});
        if(!user) return res.status(400).send("Bad User id");

        //create new contact in db
        const contact = new Contact({
            name,
            email,
            mobile,
            rel_status,
            lat,
            long,
            user_id
        });

        const added_contact = await contact.save();

        //update the contact array in user
        await User.findByIdAndUpdate(user_id,
            {
                $push: {
                    contacts: contact._id
                  }
            });

        console.log('addContact =>', added_contact);

        return res.send(added_contact);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

async function getContacts(req,res){
    try{
        //get user_id from params
        const user_id = req.query.id;

        const contacts = await Contact.find({user_id: user_id});
        return res.send(contacts);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

async function deleteContact(req,res){
    try{
        //fetch the contact to be deleted
        const contact = await Contact.findOne({ _id: req.query.contact_id });
        if (!contact) return res.status(404).send("Contact not found");

        const deleteResult = await contact.remove();
        console.log(deleteResult);
        //delete contact id from the contact array in the user
        await User.findOneAndUpdate({ _id: contact.user_id }, { $pull: { contacts: contact._id } });

        return res.send({
            msg:"Contact removed",
            deleted: deleteResult
        });

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

async function updateContact(req,res){
    try{
        const {
            name,
            email,
            mobile,
            rel_status,
            lat,
            long
        } = req.body;

        //update the contact and return it updated
        const updated_contact = await Contact.findByIdAndUpdate(req.query.id,{name,email,mobile,rel_status,lat,long}, {new:true});

        return res.send(updated_contact);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    addContact,
    getContacts,
    deleteContact,
    updateContact
  };