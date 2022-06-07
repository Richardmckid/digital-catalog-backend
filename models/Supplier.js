import mongoose from "mongoose"

const SupplierSchema = new mongoose.Schema({
    supplier_name: { type: String, required: [true, 'Supplier name is required']},
    supplier_id: { type: String},
    supplier_type: { type: String},
    supplier_email: { type: String},
    supplier_contact_person: {type: Array},
    supplier_website: { type: String},
    supplier_mobile: { type: String, required: [true, 'Supplier mobile is required']},
    supplier_address: { type: String},
    supplier_location: { type: String, required: [true, 'Supplier location is required']},
    supplier_account_number: { type: String},
    supplier_bank_name: { type: String},
    status: {type: String, enum: ['Approved', 'Pending','Rejected'], default: 'Pending'},
    supplier_documents: {type: Array},
    author: { type: String},
    supplier_rating: {type: Number},
    supplier_district: { type: String}
    
}, {timestamps:true})



const Supplier = mongoose.model('Supplier', SupplierSchema)
export default Supplier