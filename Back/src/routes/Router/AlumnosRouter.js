const { Router } = require("express");
const { getAllAlumnos } = require("../../Controllers/Alumnos/getAllAlumnos");
const { postAlumno } = require("../../Controllers/Alumnos/postAlumno");
const { deleteAlumno } = require("../../Controllers/Alumnos/deleteAlumno");
const { getAlumnos } = require("../../Controllers/Alumnos/getAlumno");
const { filterAlumnos } = require("../../Controllers/Alumnos/alumnofilter");
const { updateAlumno } = require("../../Controllers/Alumnos/updateAlumno");

const alumnos = Router();

alumnos.get("/", async (req, res) => {
  const respuesta = await getAllAlumnos(req.query);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(500).json(respuesta);
});

alumnos.get("/getalumno", async (req, res) => {
  const username = req.query.username.toLocaleLowerCase();
  if (!username) return res.status(400).json({ message: "No se ingreso un username" });
  const respuesta = await getAlumnos(username);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

alumnos.get("/filtro", async (req, res) => {
  const criterios = req.query;
  if (Object.keys(criterios).length === 0)
    return res.status(400).json({ message: "No se ingreso correctamente el filtro" });
  const respuesta = await filterAlumnos(criterios);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

alumnos.post("/", async (req, res) => {
  const { name, apellido, nacionalidad, datebirth, email, username, password, division, anio } =
    req.body;
  const respuesta = await postAlumno(
    name,
    apellido,
    nacionalidad,
    datebirth,
    email,
    username,
    password,
    division,
    anio
  );
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});
alumnos.delete("/:username", async (req, res) => {
  const { username } = req.params;
  const respuesta = await deleteAlumno(username.toLowerCase());
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

alumnos.put("/:currentusername", async (req, res) => {
  const { currentusername } = req.query;
  const changes = req.body;
  if (!currentusername) {
    res.status(400).json({ message: "No se envio username a modificar" });
  }
  if (Object.keys(changes).length === 0) {
    res.status(400).json({ message: "No se ingresaron modificaciones a realizar" });
  }
  const respuesta = await updateAlumno(currentusername, changes);
  if (!respuesta.erro) res.status(200).json(respuesta);
  res.status(503).json(respuesta);
});

module.exports = alumnos;
