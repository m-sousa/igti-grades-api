import { db } from "../models/index.js";
import { logger } from "../config/logger.js";

const Grade = db.grade;

const create = async (req, res) => {
  logger.info(`POST /grade - ${JSON.stringify()}`);
  const { name, subject, type, value } = req.body;
  const grade = new Grade({ name, subject, type, value });
  try {
    await grade.save(grade);
    return res.send({ message: "Grade inserido com sucesso" });
  } catch (error) {
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
    return res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
  }
};

const findAll = async (req, res) => {
  logger.info(`GET /grade`);
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const grades = await Grade.find(condition);
    return res.send(grades);
  } catch (error) {
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    return res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  logger.info(`GET /grade - ${id}`);

  try {
    const data = await Grade.findById({ _id: id });
    if (!data)
      return res.send({ message: "Nenhum Grade encontrado com o id: " + id });
    return res.send(data);
  } catch (error) {
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    return res
      .status(500)
      .send({ message: "Erro ao buscar o Grade id: " + id });
  }
};

const update = async (req, res) => {
  logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);

  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data)
      return res.status(500).send({
        message: "Nenhum Grade encontrado para atualização com id: " + id,
      });

    return res.send({ message: "Grade atualizado com sucesso" });
  } catch (error) {
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
    return res
      .status(500)
      .send({ message: "Erro ao atualizar a Grade id: " + id });
  }
};

const remove = async (req, res) => {
  logger.info(`DELETE /grade - ${id}`);
  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndDelete({ _id: id });
    if (!data) return res.send({ message: "Grade não localizado" });
    return res.send({ message: "Grade excluido com sucesso" });
  } catch (error) {
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    return res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
  }
};

const removeAll = async (_, res) => {
  logger.info(`DELETE /grade`);
  try {
    const data = await Grade.deleteMany();
    logger.info(`data - ${data.deletedCount}`);

    if (data.deletedCount === 0)
      return res.send({ message: "Nenhum grade encontrado para exclusão" });

    return res.send({ message: `Grades excluidos` });
  } catch (error) {
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    return res.status(500).send({ message: "Erro ao excluir todos as Grades" });
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
