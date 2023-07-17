import express from 'express';
import conx from './../config/db.js';
const router = express.Router();

// Obtener todas las citas alfabéticamente
router.get('/orden', (req, res)=>{
    let query = `SELECT * FROM cita ORDER BY cit_codigo`
    conx.query(query, (err, respuesta, fil)=>{
        if (err) {
            console.log("error en la consulta");
            res.send({"Message":"Error en la consulta", "Error":err})
        }else{
            res.send(respuesta);
        }
    })
})

// Numero 4
// Encontrar la próxima cita para un paciente
// específico (por ejemplo, el paciente con **usu_id 1**):

router.get('/:id_paciente', (req,res)=>{
    let parametro = req.params.id_paciente;
    let query = `
    SELECT c.*,u.usu_nombre, u.usu_id id_usuario
    FROM  cita c INNER JOIN usuario u
    ON c.cit_datosUsuario = u.usu_id
    INNER JOIN estado_cita ec 
    ON c.cit_estadoCita = ec.estcita_id
    WHERE usu_id = ${parametro} AND ec.estcita_nombre = 'Pendiente'
    ORDER BY c.cit_fecha ASC LIMIT 1;`;
    conx.query(query,(err,respuesta, fil)=>{
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
// Numero 7
// 7. Encontrar todas las citas para un día específico (por ejemplo, **'2023-07-12'**)

router.get('/cita/:fecha', (req,res)=>{
    let parametro = req.params.fecha;
    let query = `SELECT * FROM cita 
    WHERE cit_fecha = '${parametro}';
    `;
    conx.query(query,(err,respuesta,fil)=>{
        if (err) {
            console.log("Error en la consulta de pacientes ");
            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
        }else{
            if (respuesta.length === 0) {
                res.send({"Status":"200","Message":"No hay ninguna cita para esta fecha"});
            }else{
                res.send(respuesta);
            }
        }
    });
});

// Tabla Citas 
//  9. Contar el número de citas que un médico tiene en un día específico 
//  (por ejemplo, el médico con **med_nroMatriculaProsional 1 en '2023-07-12'**)

router.get('/cantidad/:matri_medico/:fecha',(req,res)=>{
    let parametros = req.params;
    console.log(Object.values(parametros));
    let query = `
        SELECT COUNT(c.cit_codigo) numumero_citas, c.cit_fecha,m.med_nombreCompleto,
        m.med_nroMatriculaProsional,m.med_consultorio,m.med_especialidad
        FROM medico m
        INNER JOIN cita c ON m.med_nroMatriculaProsional = c.cit_medico
        WHERE m.med_nroMatriculaProsional = ? AND  c.cit_fecha = ?
        GROUP BY c.cit_fecha,m.med_nombreCompleto,m.med_nroMatriculaProsional
    `;
    conx.query(query,Object.values(parametros),(err,respuesta,fil)=>{
        if (err) {
            console.log("Error en la consulta de citas ");
            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
        }else{
            if (respuesta.length === 0) {
                res.send({"Status":"200","Message":"No hay ninguna cita asignada para este doctor en esta fecha"});
            }else{
                res.send(respuesta);
            }
        }
    })
});

// Tabla Citas
// 11. Obtener todas las citas realizadas por los 
// pacientes de un genero si su estado de la cita fue atendidad
router.get('/realizadas/:genero',(req,res)=>{
    let parametros = Object.values(req.params);
    let query = `
            SELECT * 
            FROM cita c INNER JOIN usuario u 
            ON  c.cit_datosUsuario = u.usu_id
            WHERE c.cit_estadoCita = 4 AND u.usu_genero = ?;`;
    conx.query(query,parametros,(err,respuesta,fil)=>{
        if (err){
            console.log("Error en la consulta de pacientes ");
            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
        }else{
            if (respuesta.length === 0) {
                res.send({"Status":"200","Message":"No se han realizado citas para pacientes de este genero"});
            }else{
                res.send(respuesta);
            }
        }
    });
})

export default router;