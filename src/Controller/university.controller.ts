import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()


export const getUniversity = (req: Request,res: Response)=>{
    res.json({
        message: "Hello From University controller"
    })

}



// Creates A New University 🖣

export const  addNewUniversity = async(req: Request,res: Response)=>{
    const{name, address, zipcode, latitude, longitude, category, description, universityLogo,userCount } = req.body

    try {
        if (
            !name || name.trim() === "" ||
            !address || address.trim() === "" ||
            !zipcode  ||
            !latitude ||
            !longitude  ||
            !category || category.trim() === "" ||
            !description || description.trim() === "" ||
            !universityLogo || universityLogo.trim() === "" ||
            !userCount|| userCount === null
        ) {
            res.status(400).json({
                message: "All fields are required!"
            });
            return;
        }
    } catch (error) {
        res.json({
            message: "Error in field validation check the data"
        })
        
    }

    try {
        const newUniversity = await prisma.university.create({
            data:{
                name,
                address,
                zipcode,
                latitude,
                longitude,
                category,
                description,
                universityLogo,
                userCount
            }
        })
        if(!newUniversity){
            res.status(400).json({
                message: "Failed to create university"
            })
            return;
        }
        res.status(200).json({
            message: `Successfully Added new ${category.toUpperCase()}`
        })
    } catch (error) {
        const err = error as Error
        res.status(400).json({
            message: err
        })
        
    }


} 