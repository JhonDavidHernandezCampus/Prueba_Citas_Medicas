import Express  from "express";
import conx from './../config/db.js';
const router = Express.Router();

// Consultorio 
// 10. Obtener los consultorio donde se aplicó las citas de un paciente

router.get('/citas/:id_paciente',(req,res)=>{
    let parametros = Object.values(req.params);
    let query = `SELECT cs.*,u.usu_id Id_paciente,u.usu_nombre
                FROM usuario u
                INNER JOIN cita c ON u.usu_id = c.cit_datosUsuario
                INNER JOIN medico m ON m.med_nroMatriculaProsional = c.cit_medico
                INNER JOIN consultorio cs ON cs.cons_codigo = med_consultorio
                WHERE c.cit_estadoCita = 4 AND u.usu_id = ?;`;
    conx.query(query,parametros,(err, respuesta, fil)=>{
                if (err){
            console.log("Error en la consulta de pacientes ");
            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
        }else{
            if (respuesta.length === 0) {
                res.send({"Status":"200","Message":"No hay ningun paciente que cumpla los requerimientos"});
            }
            res.send(respuesta);
        }
    });
});

export default router;