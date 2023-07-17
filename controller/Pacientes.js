import express, { query } from 'express';
import conx from './../config/db.js';
import { IsDefined, isNumber } from 'class-validator';
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
            }else{
                res.send(respuesta);
            }
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
            }else{
                res.send(respuesta);
            }
        }
    });
})

// Insertar paciante validando su edad y si esta registrado

router.post('/insertar', (req,res)=>{
    let data = req.body;
    if(isNumber(data.usu_acudiente) && data.edad > 17){
        conx.query(`SELECT * FROM acudiente WHERE acu_codigo= ${data.usu_acudiente}`,(err,respuesta)=>{
            if(err){
                console.log("Error en la consulta de pacientes ");
                res.send({"Status":"400","Message":"Error en la consulta","Info":err});
            }else{
                if(respuesta.length > 0){
                    let query = `INSERT INTO usuario SET ?`;
                    conx.query(query,req.body, (err,respuestainsert,fil)=>{
                        if (err){
                            console.log("Error en la consulta de pacientes ");
                            res.send({"Status":"400","Message":"Error en la consulta","Info":err});
                        }else{
                                res.send(respuestainsert);
                        }
                    });
                }
            }
        });
    }else{
        console.log(data.acu_codigo);
        console.log(data.acu_codigo === undefined && isNaN(data.acu_codigo));
        if(data.acu_codigo === undefined && isNaN(data.acu_codigo)){
            res.send({"Message":"Usuario menor de edad se esperaban datos de su acudiente"})
        }else{
            conx.query(`INSERT INTO acudiente SET ? `, req.body, (err,respuestainsertacudiente, fil)=>{
                if (err){
                    console.log("Error en la consulta de pacientes ");
                    res.send({"Status":"400","Message":"Error en la consulta","Info":err});
                }else{
                        res.send({"Message":"La data del acudiente se ha insertado corractamente ahora puede insertar el usuario menor de edad"});
                    
                }
            });
        }
    }

});
/* 
Usuario
{
    "usu_id":1098432,
    "edad":17,
    "usu_nombre":"Daniel",
    "usu_segdo_nombre":"Stiven",
    "usu_primer_apellido_usuar":"Hernandez",
    "usu_segdo_apellido_usuar":"Ferrer",
    "usu_telefono":"3022910748",
    "usu_direccion":"Floridablanca",
    "usu_email":"jhherdaferrer@gmail.com",
    "usu_tipodoc":"Precedula",
    "usu_genero":2,
    "usu_acudiente":1
}


Acudiente 
{
    "acu_codigo":7,
    "acu_nombreCompleto":"jhon david hernandez ferrer",
    "acu_telefono":"322121221",
    "acu_direccion":"Bucaramanga"

}
 */
export default router;