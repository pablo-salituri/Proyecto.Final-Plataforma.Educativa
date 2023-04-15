const { Materias } = require("../../db");

const postMateria = async (namemateria, anio, temas) => {
  try {
    if (
      await Materias.findOne({
        where: { namemateria: namemateria.toLowerCase(), anio: anio },
      })
    )
      return {
        error: `No se pudo completar la carga. Ya existe ${namemateria} de ${anio} año.`,
      };

    const newMateria = await Materias.create({
      namemateria: namemateria.toLowerCase(),
      anio: anio,
      temas: temas,
    });
    return { message: "Materia creada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: "No se pudo agregar la materia solicitada." };
  }
};

module.exports = { postMateria };
