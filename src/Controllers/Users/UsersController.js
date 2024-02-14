const bcrypt = require("bcrypt");
const UserService = require("../../Services/Users/UserService");

module.exports = {
  getUsers: async (req, res) => {
    const json = {
      error: "",
      result: [],
    };

    const users = await UserService.getUsers();

    for (const i in users) {
      json.result.push({
        id: users[i].id,
        name: users[i].name,
        nameRBX: users[i].nameRBX,
        email: users[i].email,
        active: users[i].active,
      });
    }

    res.json(json);
  },

  insert: async (req, res) => {
    const { email, name, nameRBX, password } = req.body;

    if (!email || !name || !nameRBX || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    try {
      const existingUser = await UserService.getUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await UserService.insert(
        name,
        nameRBX,
        email,
        hashedPassword
      );

      res.json({
        message: "Usuário registrado com sucesso",
        user: {
          name,
          nameRBX,
          email,
        },
      });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  },

  update: async (req, res) => {
    const json = {
      error: "",
      results: {},
    };

    const idUser = req.params.id;
    const nameUser = req.body.name;
    const nameRBXUser = req.body.nameRBX;
    const emailUser = req.body.email;
    const activeUser = req.body.active;

    if (idUser && nameUser && nameRBXUser && emailUser && activeUser) {
      try {
        await UserService.update(
          idUser,
          nameUser,
          nameRBXUser,
          emailUser,
          activeUser
        );

        json.results = {
          id: idUser,
          name: nameUser,
          nameRBX: nameRBXUser,
          email: emailUser,
          active: activeUser,
        };

        res.status(200).json(json);
      } catch (error) {
        json.error = "Erro ao atualizar usuário";
        res.status(400).json(json);
      }
    } else {
      json.error = "Parâmetros inválidos";
      res.status(400).json(json);
    }
  },
};
