import express from 'express';
import conx from './../config/db.js';
const router = express.Router();

// Obtener todos los médicos de una especialidad específica (por ejemplo, **'Cardiología'**):
router.get('/especialidad/:especialidad', (req, res)=>{
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

//Numero 8  
// 8. Obtener los médicos y sus consultorios
router.get('/consultarios',(req,res)=>{
    let query = `SELECT c.cons_codigo Codigo_consultorio,c.cons_nombre Nombre_Consultorio,
    m.med_nroMatriculaProsional Matricula_Medico,m.med_nombreCompleto Nombre_Medico,
    m.med_consultorio Consultorio_del_medico,m.med_especialidad Especialidad
    FROM medico m
    INNER JOIN consultorio c ON c.cons_codigo = m.med_consultorio;`;
    conx.query(query,(err,respuesta,fil)=>{
        if (err) {
            console.log("Error en la consulta de medicos");
            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
        }else{
            res.send(respuesta)
        }
    });
});


export default router;