import Supplier from "../models/Supplier.js";
import { Router } from "express";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { authorizeUserAction } from "../middleware/authorizeUserAction.js";
import mongoose from "mongoose";
// var ObjectId = require('mongoose').Types.ObjectId;


const supplierRouter = Router();

// Public Routes 
supplierRouter.get("/", async (req, res) => {
    
    const suppliers = await Supplier.find();
    
    return res.status(200).json({
        success: true,
        suppliers: suppliers,
    })
});

supplierRouter.get("/:id", async (req, res) => {
    const sid = req.params.id;

    if(mongoose.Types.ObjectId.isValid(sid)){

        const supplier = await Supplier.findById(sid);
        
        if(!supplier){
            return res.status(401).json({
                success: false,
                message: 'There is no supplier matching the provided ID: '+sid
            })
        }
        return res.status(200).json({
            success: true,
            supplier: supplier,
        })
    }

    return res.status(401).json({
        success: false,
        message: 'There is no supplier matching the provided ID: '+sid
    })
});



// Protected Routes

supplierRouter.post('/create', tokenVerify, async(req, res) =>{
    
    const supplierObj = req.body;
    const newSupplier = new Supplier({...supplierObj, author:req.user.id})
    // console.log(req.user)

    try {
        
        const supplier = await newSupplier.save()
        if(supplier){
            return res.status(201).json({
                success: true,
                message: 'Supplier created successfully'
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occured, please try again later.',
            error
        })
    }
})

supplierRouter.put('/:id', tokenVerify, authorizeUserAction, async(req, res) =>{
    
    if(!req.body){
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Supplier.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {

            if(!data) {
                return res.status(404).json({
                    success: false,
                    message: `Cannot update Supplier with id=${id}. Maybe Supplier was not found!`
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Supplier was updated successfully.'
            })
        //   res.send({ message: "Supplier was updated successfully." });
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: "Error updating Supplier with ID: " + id
            });
        });
})

supplierRouter.delete('/:id', tokenVerify, authorizeUserAction, async(req, res) =>{
    
    
    const id = req.params.id;

    Supplier.findByIdAndRemove(id)
    .then(data => {
      if(!data) {

        return res.status(404).json({
            success: false,
            message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found!`
        });

      } else {
        return res.status(404).json({
            success: true,
            message: "Supplier was deleted successfully!"
        });
      }
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: "Could not delete Supplier with id=" + id
        });
    });
})




export default supplierRouter;