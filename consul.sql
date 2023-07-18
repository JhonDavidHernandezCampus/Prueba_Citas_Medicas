
use sistema_citas;
show databases;

CREATE TABLE especialidad(
    esp_id INT PRIMARY KEY,
    esp_nombre VARCHAR(20)
);

CREATE TABLE consultorio(
    cons_codigo INT PRIMARY KEY,
    cons_nombre VARCHAR(50)
);

CREATE TABLE medico(
    med_nroMatriculaProsional INT PRIMARY KEY,
    med_nombreCompleto VARCHAR(120),
    med_consultorio INT,
    med_especialidad INT,
    CONSTRAINT fk_medico_especialidad FOREIGN KEY (med_especialidad) REFERENCES especialidad(esp_id),
    CONSTRAINT fk_medico_consultorio FOREIGN KEY (med_consultorio) REFERENCES consultorio(cons_codigo)
);

CREATE TABLE estado_cita(
    estcita_id INT PRIMARY KEY,
    estcita_nombre VARCHAR(20)
);

CREATE TABLE tipo_documento(
    tipdoc_id INT PRIMARY KEY,
    tipdoc_nombre VARCHAR(20),
    tipdoc_abreviatura VARCHAR(20)
);
CREATE TABLE genero(
    gen_id INT PRIMARY KEY,
    gen_nombre VARCHAR(20),
    gen_abreviatura VARCHAR(20)
);

CREATE TABLE acudiente(
    acu_codigo INT PRIMARY KEY,
    acu_nombreCompleto VARCHAR(100),
    acu_telefono VARCHAR(100),
    acu_direccion VARCHAR(200)
);
CREATE TABLE usuario(
    usu_id INT PRIMARY KEY,
    usu_nombre VARCHAR(50),
    usu_segdo_nombre VARCHAR(45),
    usu_primer_apellido_usuar VARCHAR(50),
    usu_segdo_apellido_usuar VARCHAR(50),
    usu_telefono VARCHAR(50),
    usu_direccion VARCHAR(100),
    usu_email VARCHAR(100),
    usu_tipodoc INT,
    usu_genero INT,
    usu_acudiente INT,
    CONSTRAINT fk_tipodoc_usuario FOREIGN KEY (usu_tipodoc) REFERENCES tipo_documento(tipdoc_id),
    CONSTRAINT fk_genero_usuario FOREIGN KEY (usu_genero) REFERENCES genero(gen_id),
    CONSTRAINT fk_acudiente_usuario FOREIGN KEY (usu_acudiente) REFERENCES acudiente(acu_codigo)
);

CREATE TABLE cita (
    cit_codigo INT PRIMARY KEY,
    cit_fecha DATE,
    cit_estadoCita INT,
    cit_medico INT,
    cit_datosUsuario INT,
    CONSTRAINT fk_estaCita_cita FOREIGN KEY (cit_estadoCita) REFERENCES estado_cita(estcita_id),
    CONSTRAINT fk_usuario_cita FOREIGN KEY (cit_datosUsuario) REFERENCES usuario(usu_id)
);

ALTER TABLE cita ADD CONSTRAINT fk_medico_cita FOREIGN KEY (cit_medico) REFERENCES medico(med_nroMatriculaProsional);

#consultas de los endpoinds
# Obtener todos los médicos de una especialidad específica (por ejemplo, **'Cardiología'**):
# Numero 3
SELECT e.esp_id id_especialidad,e.esp_nombre Nombre_especialidad,m.med_nroMatriculaProsional Matricula_medico, m.med_nombreCompleto Nombre_medico
FROM especialidad e INNER JOIN medico m 
ON m.med_especialidad = e.esp_id 
WHERE esp_nombre = 'Cardiología';

# Numero 4
# Encontrar la próxima cita para un paciente
# específico (por ejemplo, el paciente con **usu_id 1**):
SELECT c.*,u.usu_nombre, u.usu_id id_usuario
FROM  cita c INNER JOIN usuario u
ON c.cit_datosUsuario = u.usu_id
INNER JOIN estado_cita ec 
ON c.cit_estadoCita = ec.estcita_id
WHERE usu_id = 1 AND ec.estcita_nombre = 'Pendiente'
ORDER BY c.cit_fecha ASC LIMIT 1;

# Numero 5
# Encontrar todos los pacientes que tienen citas con un 
# médico específico (por ejemplo, el médico con **med_nroMatriculaProsional 1**)

SELECT u.*,c.cit_codigo,m.med_nombreCompleto, m.med_nroMatriculaProsional
FROM usuario u INNER JOIN cita c
ON u.usu_id = c.cit_datosUsuario 
INNER JOIN medico m 
ON c.cit_medico = m.med_nroMatriculaProsional
WHERE med_nroMatriculaProsional = 123456;

# Numero 6
# 6. Obtener las consultorías para un paciente específico 
# (por ejemplo, paciente **con usu_id 1**)o
SELECT u.usu_id id_usuario,u.usu_nombre,
        m.med_nroMatriculaProsional Codigo_medico, m.med_nombreCompleto,
        cs.cons_codigo Codigo_consultorio, cs.cons_nombre Nombre_consultorio
FROM usuario u
INNER JOIN cita c ON u.usu_id=cit_datosUsuario
INNER JOIN medico m ON m.med_nroMatriculaProsional = c.cit_medico
INNER JOIN consultorio cs ON cs.cons_codigo=m.med_consultorio
WHERE u.usu_id = 2;

# Numero 7
# 7. Encontrar todas las citas para un día específico (por ejemplo, **'2023-07-12'**)

SELECT * FROM citas 
WHERE cit_fecha = '2023-07-12';

#Numero 8  
# 8. Obtener los médicos y sus consultorios
SELECT c.cons_codigo Codigo_consultorio,c.cons_nombre Nombre_Consultorio,
        m.med_nroMatriculaProsional Matricula_Medico,m.med_nombreCompleto Nombre_Medico,
        m.med_consultorio Consultorio_del_medico,m.med_especialidad Especialidad
FROM medico m
INNER JOIN consultorio c ON c.cons_codigo = m.med_consultorio;


#Tabla Citas 
# 9. Contar el número de citas que un médico tiene en un día específico 
# (por ejemplo, el médico con **med_nroMatriculaProsional 1 en '2023-07-12'**)
SELECT COUNT(c.cit_codigo) numumero_citas, c.cit_fecha,m.med_nombreCompleto,
m.med_nroMatriculaProsional,m.med_consultorio,m.med_especialidad
FROM medico m
INNER JOIN cita c ON m.med_nroMatriculaProsional = c.cit_medico
WHERE c.cit_fecha = '2023-07-12' AND m.med_nroMatriculaProsional = '123456'
GROUP BY c.cit_fecha,m.med_nombreCompleto,m.med_nroMatriculaProsional;


#Consultorio 
#10. Obtener los consultorio donde se aplicó las citas de un paciente
SELECT cs.*,u.usu_id Id_paciente,u.usu_nombre
FROM usuario u
INNER JOIN cita c ON u.usu_id = c.cit_datosUsuario
INNER JOIN medico m ON m.med_nroMatriculaProsional = c.cit_medico
INNER JOIN consultorio cs ON cs.cons_codigo = med_consultorio
WHERE c.cit_estadoCita = 4 AND u.usu_id = 1;
# Tabla Citas
# 11. Obtener todas las citas realizadas por los 
# pacientes de un genero si su estado de la cita fue atendidad
SELECT * 
FROM cita c INNER JOIN usuario u 
ON  c.cit_datosUsuario = u.usu_id
WHERE c.cit_estadoCita = 4 AND u.usu_genero = 2;

# Numero 12 
# Insertar un paciente a la tabla usuario pero si es menor de edad solicitar
# primero que ingrese el acudiente y validar si ya estaba registrado el acudiente.
INSERT INTO usuario (usu_id, usu_nombre, usu_segdo_nombre, usu_primer_apellido_usuar, usu_segdo_apellido_usuar, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente) VALUES (1, 'Juan', 'David', 'Pérez', 'Gómez', '1234567890', 'Calle 123, Ciudad', 'juan@example.com', 1, 1, 1);

SELECT * FROM cita;
SELECT * FROM medico;
SELECT * FROM usuario;
SELECT * from acudiente;
SELECT * FROM estado_cita;

;
# Tabla citas
# 13. Mostrar todas las citas que fueron rechazadas y en un mes específico, mostrar 
# la fecha de la cita, el nombre del usuario y el médico.
SELECT * FROM cita 
WHERE cit_estadoCita = 3 
AND DATE_FORMAT(cit_fecha,'%Y-%m') = '2023-07' ; 


INSERT INTO cita (cit_codigo, cit_fecha, cit_estadoCita, cit_medico, cit_datosUsuario) VALUES (8, '2023-07-12', 4, 123456, 2);
SELECT * FROM acudiente;
SELECT * FROM medico;
SELECT * FROM usuario;
SELECT * FROM tipo_documento;
SELECT * FROM genero;
SELECT * FROM estado_cita;

UPDATE usuario SET usu_genero = 0 WHERE usu_id = 2;





# inserciones para las tablas

INSERT INTO especialidad (esp_id, esp_nombre) VALUES (1, 'Cardiología');
INSERT INTO especialidad (esp_id, esp_nombre) VALUES (2, 'Dermatología');
INSERT INTO especialidad (esp_id, esp_nombre) VALUES (3, 'Pediatría');
INSERT INTO especialidad (esp_id, esp_nombre) VALUES (4, 'Oftalmología');
INSERT INTO especialidad (esp_id, esp_nombre) VALUES (5, 'Gastroenterología');



INSERT INTO consultorio (cons_codigo, cons_nombre) VALUES (1, 'Consultorio A');
INSERT INTO consultorio (cons_codigo, cons_nombre) VALUES (2, 'Consultorio B');
INSERT INTO consultorio (cons_codigo, cons_nombre) VALUES (3, 'Consultorio C');
INSERT INTO consultorio (cons_codigo, cons_nombre) VALUES (4, 'Consultorio D');
INSERT INTO consultorio (cons_codigo, cons_nombre) VALUES (5, 'Consultorio E');



INSERT INTO medico (med_nroMatriculaProsional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES (123456, 'Dr. Juan Pérez', 1, 1);
INSERT INTO medico (med_nroMatriculaProsional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES (234567, 'Dra. Ana Rodríguez', 2, 2);
INSERT INTO medico (med_nroMatriculaProsional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES (345678, 'Dr. Luis Martínez', 3, 3);
INSERT INTO medico (med_nroMatriculaProsional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES (456789, 'Dra. Laura Gómez', 4, 4);
INSERT INTO medico (med_nroMatriculaProsional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES (567890, 'Dr. Carlos Sánchez', 5, 5);

INSERT INTO estado_cita (estcita_id, estcita_nombre) VALUES (1, 'Pendiente');
INSERT INTO estado_cita (estcita_id, estcita_nombre) VALUES (2, 'Confirmada');
INSERT INTO estado_cita (estcita_id, estcita_nombre) VALUES (3, 'Cancelada');
INSERT INTO estado_cita (estcita_id, estcita_nombre) VALUES (4, 'Realizada');
INSERT INTO estado_cita (estcita_id, estcita_nombre) VALUES (5, 'Ausente');



INSERT INTO tipo_documento (tipdoc_id, tipdoc_nombre, tipdoc_abreviatura) VALUES (1, 'Cédula de Ciudadanía', 'CC');
INSERT INTO tipo_documento (tipdoc_id, tipdoc_nombre, tipdoc_abreviatura) VALUES (2, 'Tarjeta de Identidad', 'TI');
INSERT INTO tipo_documento (tipdoc_id, tipdoc_nombre, tipdoc_abreviatura) VALUES (3, 'Cédula de Extranjería', 'CE');
INSERT INTO tipo_documento (tipdoc_id, tipdoc_nombre, tipdoc_abreviatura) VALUES (4, 'Pasaporte', 'PAS');
INSERT INTO tipo_documento (tipdoc_id, tipdoc_nombre, tipdoc_abreviatura) VALUES (5, 'Registro Civil', 'RC');



INSERT INTO genero (gen_id, gen_nombre, gen_abreviatura) VALUES (1, 'Masculino', 'M');
INSERT INTO genero (gen_id, gen_nombre, gen_abreviatura) VALUES (2, 'Femenino', 'F');
INSERT INTO genero (gen_id, gen_nombre, gen_abreviatura) VALUES (3, 'Otro', 'O');
INSERT INTO genero (gen_id, gen_nombre, gen_abreviatura) VALUES (4, 'No especificado', 'NE');
INSERT INTO genero (gen_id, gen_nombre, gen_abreviatura) VALUES (5, 'Prefiero no decirlo', 'PND');



INSERT INTO acudiente (acu_codigo, acu_nombreCompleto, acu_telefono, acu_direccion) VALUES (1, 'Luisa Pérez', '1234567890', 'Calle 123, Ciudad');
INSERT INTO acudiente (acu_codigo, acu_nombreCompleto, acu_telefono, acu_direccion) VALUES (2, 'Pedro Gómez', '9876543210', 'Avenida 456, Ciudad');
INSERT INTO acudiente (acu_codigo, acu_nombreCompleto, acu_telefono, acu_direccion) VALUES (3, 'María Rodríguez', '5555555555', 'Carrera 789, Ciudad');
INSERT INTO acudiente (acu_codigo, acu_nombreCompleto, acu_telefono, acu_direccion) VALUES (4, 'Andrés Torres', '9999999999', 'Calle Principal, Ciudad');
INSERT INTO acudiente (acu_codigo, acu_nombreCompleto, acu_telefono, acu_direccion) VALUES (5, 'Laura Sánchez', '1111111111', 'Avenida Central, Ciudad');



INSERT INTO usuario (usu_id, usu_nombre, usu_segdo_nombre, usu_primer_apellido_usuar, usu_segdo_apellido_usuar, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente) VALUES (1, 'Juan', 'David', 'Pérez', 'Gómez', '1234567890', 'Calle 123, Ciudad', 'juan@example.com', 1, 1, 1);
INSERT INTO usuario (usu_id, usu_nombre, usu_segdo_nombre, usu_primer_apellido_usuar, usu_segdo_apellido_usuar, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente) VALUES (2, 'María', 'Fernanda', 'Rodríguez', 'García', '9876543210', 'Avenida 456, Ciudad', 'maria@example.com', 2, 2, 2);
INSERT INTO usuario (usu_id, usu_nombre, usu_segdo_nombre, usu_primer_apellido_usuar, usu_segdo_apellido_usuar, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente) VALUES (3, 'Carlos', '', 'González', 'Sánchez', '5555555555', 'Carrera 789, Ciudad', 'carlos@example.com', 1, 1, 3);
INSERT INTO usuario (usu_id, usu_nombre, usu_segdo_nombre, usu_primer_apellido_usuar, usu_segdo_apellido_usuar, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente) VALUES (4, 'Ana', 'María', 'López', 'Torres', '9999999999', 'Calle Principal, Ciudad', 'ana@example.com', 3, 2, 4);
INSERT INTO usuario (usu_id, usu_nombre, usu_segdo_nombre, usu_primer_apellido_usuar, usu_segdo_apellido_usuar, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente) VALUES (5, 'Pedro', '', 'Ramírez', 'Sánchez', '1111111111', 'Avenida Central, Ciudad', 'pedro@example.com', 4, 3, 5);



INSERT INTO cita (cit_codigo, cit_fecha, cit_estadoCita, cit_medico, cit_datosUsuario) VALUES (1, '2023-07-13', 1, 123456, 1);
INSERT INTO cita (cit_codigo, cit_fecha, cit_estadoCita, cit_medico, cit_datosUsuario) VALUES (2, '2023-07-14', 2, 234567, 2);
INSERT INTO cita (cit_codigo, cit_fecha, cit_estadoCita, cit_medico, cit_datosUsuario) VALUES (3, '2023-07-15', 3, 345678, 3);
INSERT INTO cita (cit_codigo, cit_fecha, cit_estadoCita, cit_medico, cit_datosUsuario) VALUES (4, '2023-07-16', 4, 456789, 4);
INSERT INTO cita (cit_codigo, cit_fecha, cit_estadoCita, cit_medico, cit_datosUsuario) VALUES (5, '2023-07-17', 5, 567890, 5);