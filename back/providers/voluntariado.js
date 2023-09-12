const { Voluntariado } = require('../models');

const createVoluntariado = async (idOrg, voluntariado) => {
  try {
    const newVoluntariado = await Voluntariado.create({...voluntariado, organizationId: idOrg });
    return newVoluntariado;
  } catch (error) {
    console.error('The volunteering could not be created due to an error.', error);
    throw error;
  }
};

const getVoluntariadosByCriteria = async (queryOptions, bodyOptions) => {
  try {
    const options = { ...queryOptions, ...bodyOptions }; // Combinar las opciones de bésqueda
    const where = {}; // Excluir registros eliminados lágicamente
    const validOptions = ['idVoluntariado', 'organizationId', 'descripcion', 'Reward'];

    validOptions.forEach((option) => {
      if (options[option]) where[option] = options[option];
    });
    where.deletedAt = null;

    const voluntariados = await Voluntariado.findAll({
      where,
      attributes: { exclude: ['deletedAt'] },
    });

    return voluntariados;
  } catch (error) {
    console.error('The volunteering/s could not be retrieved due to an error.', error);
    throw error;
  }
};

const updateVoluntariadoById = async (idOrg, idVoluntariado, voluntariado) => {
  try {
    const [affectedRows] = await Voluntariado.update(voluntariado, {
      where: { idVoluntariado, idOrg, deletedAt: null },
    });
    if (affectedRows === 0) {
      throw new Error('No se encontrò el registro.');
    }
    const volunteeringModified = await Voluntariado.findOne({
      where: { idVoluntariado },
    });
    return volunteeringModified;
  } catch (err) {
    console.error('The volunteering could not be updated due to an error.', err);
    throw err;
  }
};

const deleteVoluntariadoById = async (id) => {
  try {
    const volunteer = await Voluntariado.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!volunteer) {
      throw new Error('volunteer not found');
    }

    // Aplicar borrado lógico estableciendo la columna deletedAt
    await Voluntariado.update({ deletedAt: new Date() }, { where: { id } });

    // // todo! --Eliminar físicamente el registro de la tabla CestaRecompensas--
    // await CestaRecompensas.destroy({ where: { id } });

    return volunteer;
  } catch (error) {
    console.error('Ocurrió un error al eliminar el voluntariado.', error);
    throw error;
  }
};

module.exports = {
  getVoluntariadosByCriteria,
  createVoluntariado,
  updateVoluntariadoById,
  deleteVoluntariadoById,
};
