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
            }
            res.send(respuesta);
        }
    });
});



export default router;