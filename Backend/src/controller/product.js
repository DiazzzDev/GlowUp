import productModel from "../model/products.js";
import { v2 as cloudinary } from "cloudinary";

const productController = {};

productController.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

productController.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

productController.postProduct = async (req, res) => {
    try {
        console.log(req.file);
        const { productName, brand, category, subCategory, skinType, description, stock, status, price } = req.body

        const newProduct = new productModel({
            productName,
            brand, 
            category, 
            subCategory, 
            skinType, 
            description, 
            stock, 
            status, 
            price,
            image: req.file.path,
            public_id: req.file.filename,
        });

        //#3- Guardamos en la base de datos
        await newProduct.save();

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

productController.updateProduct = async (req, res) => {
    try {
        const { productName, brand, category, subCategory, skinType, description, stock, status, price } = req.body

        const existingProduct = await productModel.findById(req.params.id);

        if (!existingProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const updatedData = { 
            productName, 
            brand, 
            category, 
            subCategory, 
            skinType, 
            description, 
            stock, 
            status, 
            price 
        }

        //Si viene una imagen
        if (req.file) {
            //Eliminar la imagen anterior
            await cloudinary.uploader.destroy(existingProduct.public_id);

            //Guardo la imagen nueva
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

productController.deleteProduct = async (req, res) => {
    try {
        const existingProduct = await productModel.findById(req.params.id);
        
        if (!existingProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await cloudinary.uploader.destroy(existingProduct.public_id);

        await productModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
}
export default productController;