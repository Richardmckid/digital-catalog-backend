import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema({
    fullname: { type: String},
    designition: { type: String},
    email: { type: String},
    phone: { type: String},
    supplier_id: { type: String},
    
    
}, {timestamps:true})



const Contact = mongoose.model('Contact', ContactSchema)
export default Contact