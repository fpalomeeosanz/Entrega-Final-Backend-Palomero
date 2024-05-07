import { Router } from "express";;
import { checkRole } from "../middlewares/auth.js";
import { UserController } from "../controllers/users.controllres.js";

const router = Router(); 

router.put("/users/premium/:uid", checkRole(["admin"]), async (req, res) => {
  try {
    const userId = req.params.uid;

    await UserController.changeRolToPremium(userId);

    res.status(200).json({ message: "Rol actualizado exitosamente" });
    } catch (error) {
    console.error(error); 

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al actualizar el rol" });
  }
});

async function changeRolToPremium(userId) {
  const user = await UserController.findById(userId);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const newRole = user.role === "premium" ? "user" : "premium";

  await UserController.updateOne({ _id: userId }, { role: newRole });
};

export { router as usersRouter };