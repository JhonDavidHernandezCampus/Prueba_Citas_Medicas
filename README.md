
### Explicacion de los endpoinds 

###### Tabla Pacientes 
- Endpoind #1
- Method = GET 
http://127.121.12.6:9102/pacientes/orden
- Este endponidn me muestra todos los pacientes ordenados alfabeticamente

- Endpoind #2
- Method = GET 
http://127.121.12.6:9102/pacientes/citas/parameto_id_medico

Ejemplo:http://127.121.12.6:9102/citas/pacientes/123456
- Este endponidn me muestra todos los pacientes que tienen citas con un médico específico


###### Tabla Citas
- Endpoind #1
- Method = GET 
http://127.121.12.6:9102/citas/orden
- Este endponidn me muestra todos las citas ordenados por su campo codigo de cita

- Endpoind #2
- Method = GET 
http://127.121.12.6:9102/citas/:id_paciente

Ejemplo :http://127.121.12.6:9102/citas/1
- Este endponidn me muestra la próxima cita para un paciente específico





###### Tabla Medico
- Endpoind #1
- Method = GET 
http://127.121.12.6:9102/Medico/:especialiad

Ejemplo :http://127.121.12.6:9102/Medico/Cardiología
- Este endponidn me muestra todos los médicos de una especialidad específica





