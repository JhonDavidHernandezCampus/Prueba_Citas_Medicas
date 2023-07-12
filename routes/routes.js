import express from 'express';
import PacienteController from './../controller/Pacientes.js';
import CitasController from './../controller/Citas.js';
import MedicoController from './../controller/Medico.js';

const Routes = express.Router();


Routes.use('/pacientes',PacienteController);
Routes.use('/citas', CitasController);
Routes.use('/medico', MedicoController);

export default Routes;