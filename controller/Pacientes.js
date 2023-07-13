import express, { query } from 'express';
import conx from './../config/db.js';
const router = express.Router();

//Obtener todos los pacientes alfabéticamente
router.get('/orden', (req, res)=>{
    let query = `SELECT * FROM usuario ORDER BY usu_nombre`;
    conx.query(query, (err, respuesta, fil)=>{
        if (err) {
            console.log("error en la consulta");
            res.send({"Message":"Error en la consulta", "Error":err})
        }else{
            res.send(respuesta);
        }
    });
});

//  Numero 5
//  Encontrar todos los pacientes que tienen citas con un 
//  médico específico (por ejemplo, el médico con **med_nroMatriculaProsional 1**)
router.get('/cita/:id_medico',(req,res)=>{
    let parametro = req.params.id_medico
    let query = `
    SELECT u.*,c.cit_codigo,m.med_nombreCompleto, m.med_nroMatriculaProsional
    FROM usuario u INNER JOIN cita c
    ON u.usu_id = c.cit_datosUsuario 
    INNER JOIN medico m 
    ON c.cit_medico = m.med_nroMatriculaProsional
    WHERE med_nroMatriculaProsional = ${parametro};
    `;
    conx.query(query,(err,respuesta,fil)=>{
        if (err) {
            console.log("Error en la consulta de pacientes ");
            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
        }else{
            if (respuesta.length === 0) {
                res.send({"Status":"200","Message":"No hay ningun medico con este id"});
            }
            res.send(respuesta);
        }
    });
});

router.get('/consultoria/:id_paciente', (req, res)=>{
    let parametro = req.params.id_paciente;
    let query = `SELECT u.usu_id id_usuario,u.usu_nombre,
        m.med_nroMatriculaProsional Codigo_medico, m.med_nombreCompleto,
        cs.cons_codigo Codigo_consultorio, cs.cons_nombre Nombre_consultorio
        FROM usuario u
        INNER JOIN cita c ON u.usu_id=cit_datosUsuario
        INNER JOIN medico m ON m.med_nroMatriculaProsional = c.cit_medico
        INNER JOIN consultorio cs ON cs.cons_codigo=m.med_consultorio
        WHERE u.usu_id = ${parametro};
`;
    conx.query(query,(err,respuesta,fil)=>{
        if (err){
            console.log("Error en la consulta de pacientes ");
            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
        }else{
            if (respuesta.length === 0) {
                res.send({"Status":"200","Message":"No hay consultorias para este paciente"});
            }
            res.send(respuesta);
        }
    });
})



export default router;