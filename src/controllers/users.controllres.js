import usersModel from "../dao/models/usersModel.js";

class UserController {
    static getAll = async (req, res) => {
      try {
        const users = await usersModel.find();
        res.send(users);
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
    };
  
    static getById = async (req, res) => {
      try {
        const userId = req.params.id;
        const user = await usersModel.findById(userId);
        if (!user) return res.status(404).send("Usuario no encontrado");
        res.send(user);
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
    };
  
    static changeRol = async (req, res) => {
      try {
        
        const checkAdmin = checkRole(["admin"]);
        checkAdmin(req, res, async () => {
          const userId = req.params.uid;
          const user = await usersModel.findById(userId);
          const userRol = user.rol;
  
          if (userRol === "user") {
            user.rol = "premium";
          } else if (userRol === "premium") {
            user.rol = "user";
          } else {
            return res.json({ status: "error", message: "No es posible cambiar el rol del usuario" });
          }
          await usersModel.updateOne({ _id: user._id }, user);
          res.send({ status: "success", message: "Rol modificado" });
        });
      } catch (error) {
        console.log(error.message);
        res.json({ status: "error", message: "Hubo un error al cambiar el rol del usuario" });
      }
    };
}

export { UserController }