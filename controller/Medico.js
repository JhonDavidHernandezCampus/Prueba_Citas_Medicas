import express from 'express';
import conx from './../config/db.js';
const router = express.Router();

// Obtener todos los médicos de una especialidad específica (por ejemplo, **'Cardiología'**):
router.get('/:especialidad', (req, res)=>{
    let especialidad = req.params.especialidad;
    let query = `
    SELECT e.esp_id id_especialidad,e.esp_nombre Nombre_especialidad,m.med_nroMatriculaProsional Matricula_medico, m.med_nombreCompleto Nombre_medico
    FROM especialidad e INNER JOIN medico m 
    ON m.med_especialidad = e.esp_id 
    WHERE esp_nombre = '${especialidad}';`;
    conx.query(query, (err, respuesta, fil)=>{
        if (err) {
            console.log("Error en la consulta de medicos");
            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
        }else{
            res.send(respuesta)
        }
    });
})

export default router;