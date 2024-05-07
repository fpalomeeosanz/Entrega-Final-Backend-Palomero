import productsModel from "../dao/models/productsModel.js";

class ProductsController {
    static getAllProducts = async (req, res) => {
      try {
        const products = await productsModel.find();
        res.send(products);
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
    };
  
    static getProductById = async (req, res) => {
      try {
        const productId = req.params.id;
        const product = await productsModel.findById(productId);
        if (!product) return res.status(404).send("Producto no encontrado :( ");
        res.send(product);
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
    };
  
    static createProduct = async (req, res) => {
      try {
        if (req.user.rol !== "premium") {
          return res.status(403).send("Solo usuarios premium pueden crear productos :( ");
        }
  
        const newProduct = new productsModel({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          owner: req.user._id, 
        });

        await newProduct.save();
        res.send("Producto creado");

      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
    };
  
    static updateProduct = async (req, res) => {
      try {
        const productId = req.params.id;
        const product = await productsModel.findById(productId);
        if (!product) return res.status(404).send("Producto no encontrado");
        
        //VERIFICO
        if (req.user.rol === "premium" && product.owner != req.user._id) {
          return res.status(403).send("Solo puedes modificar tus propios productos");
        }
  
        //ADMIN PASS
        if (req.user.rol === "admin") {

          res.send("Producto actualizado");
          return;
        }
  
        return res.status(403).send("No tienes permisos para modificar este producto :( ");

      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
    };
  
    static deleteProduct = async (req, res) => {
      try {
        const productId = req.params.id;
        const product = await productsModel.findById(productId);
        if (!product) return res.status(404).send("Producto no encontrado :( ");
  
        //VERIFICACION
        if (req.user.rol === "premium" && product.owner != req.user._id) {
          return res.status(403).send("Solo puedes eliminar tus propios productos :) ");
        }
  
        //ADMIN PASS
        if (req.user.rol === "admin") {
          await productsModel.findByIdAndDelete(productId);
          res.send("Producto eliminado");
          return;
        }
  
        return res.status(403).send("No tienes permisos para eliminar este producto :( ");
      
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
    };
}

export { ProductsController }