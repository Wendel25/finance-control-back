const accountBankService = require("../../Services/Accounts/AccountsBankService");

module.exports = {
  getAccounts: async (req, res) => {
    const json = {
      error: "",
      result: [],
    };

    const account = await accountBankService.getAccount();

    for (const i in account) {
      json.result.push({
        holder: account[i].holder,
        typeAccount: account[i].type_account,
        numberAccount: account[i].number_account,
        agency: account[i].agency,
        bank: account[i].bank,
        active: account[i].active,
      });
    }

    res.json(json);
  },

  insetAccount: async (req, res) => {
    const { holder, type_account, number_account, agency, bank } = req.body;

    if (!holder || !type_account || !number_account || !agency || !bank) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    try {
      const accountBank = await accountBankService.insert(
        holder,
        type_account,
        number_account,
        agency,
        bank
      );

      res.json({
        message: "Conta bancária registrado com sucesso",
        account: {
          holder,
          type_account,
          number_account,
          agency,
          bank,
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

    const { id: idAccount } = req.params;
    const {
      holder: holderAccount,
      type_account: typeAccount,
      number_account: numberAccount,
      agency: agencyAccount,
      bank: bankAccount,
      active: activeAccount,
    } = req.body;

    const requiredFields = [
      holderAccount,
      typeAccount,
      numberAccount,
      agencyAccount,
      bankAccount,
      activeAccount,
    ];

    if (requiredFields.every((field) => field !== undefined && field !== "")) {
      try {
        await accountBankService.update(
          idAccount,
          holderAccount,
          typeAccount,
          numberAccount,
          agencyAccount,
          bankAccount,
          activeAccount
        );

        json.results = {
          id: idAccount,
          holder: holderAccount,
          type_account: typeAccount,
          number_account: numberAccount,
          agency: agencyAccount,
          bank: bankAccount,
          active: activeAccount,
        };

        res.status(200).json(json);
      } catch (error) {
        json.error = "Erro ao atualizar conta";
        res.status(400).json(json);
      }
    } else {
      json.error = "Preencha todos os campos!";
      res.status(400).json(json);
    }
  },
};
