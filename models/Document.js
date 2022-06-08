import mongoose from "mongoose"

const DocumentSchema = new mongoose.Schema({
    document_name: { type: String},
    document_tag: { type: String},
    document_link: { type: String},
    supplier_id: { type: String},
    
}, {timestamps:true})



const Document = mongoose.model('Document', DocumentSchema)
export default Document