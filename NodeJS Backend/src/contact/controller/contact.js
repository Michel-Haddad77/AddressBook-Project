const Contact = require("../../../models/Contact");

async function addContact(req,res){
    try{
        console.log(req.body);

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

        console.log('addContact =>', added_contact);

        return res.send(added_contact);

    }catch(error){
        console.log(error);
    }
}

module.exports = {
    addContact
  };