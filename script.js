function validarCampos() {
    var cedula = document.getElementById("cedula").value;
    var nombre = document.getElementById("nombre").value;
    var matematicas = document.getElementById("matematicas").value;
    var fisica = document.getElementById("fisica").value;
    var programacion = document.getElementById("programacion").value;
  
    if (!/^[\d]+$/.test(cedula)) {
      alert("Por favor, ingresa una cedula válida (solo numeros).");
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      alert("Por favor, ingresa un nombre valido (solo letras y espacios).");
      return false;
    }
    if (matematicas < 0 || matematicas > 20) {
      alert("Por favor, ingresa una nota de Matematicas valida (entre 0 y 20).");
      return false;
    }
    if (fisica < 0 || fisica > 20) {
      alert("Por favor, ingresa una nota de Fisica valida (entre 0 y 20).");
      return false;
    }
    if (programacion < 0 || programacion > 20) {
      alert("Por favor, ingresa una nota de Programacion valida (entre 0 y 20).");
      return false;
    }
  
    return true;
  }

function registrarAlumno() {
    var cedula = document.getElementById('cedula').value;
    var nombre = document.getElementById('nombre').value;
    var matematicas = parseInt(document.getElementById('matematicas').value);
    var fisica = parseInt(document.getElementById('fisica').value);
    var programacion = parseInt(document.getElementById('programacion').value);

    

    $.ajax({
        url: 'registrar_alumno.php',
        type: 'POST',
        data: {
            cedula: cedula,
            nombre: nombre,
            matematicas: matematicas,
            fisica: fisica,
            programacion: programacion
        },
        success: function(response) {
            alert(response);
            cargarResultados();
            cargarAlumnos();
            document.getElementById('alumno-form').reset();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
function cargarResultados() {
    $.ajax({
        url: 'cargar_resultados.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            document.getElementById('promedio-matematicas').innerText = data.promedio_matematicas;
            document.getElementById('promedio-fisica').innerText = data.promedio_fisica;
            document.getElementById('promedio-programacion').innerText = data.promedio_programacion;
            document.getElementById('aprobados-matematicas').innerText = data.aprobados_matematicas;
            document.getElementById('aprobados-fisica').innerText = data.aprobados_fisica;
            document.getElementById('aprobados-programacion').innerText = data.aprobados_programacion;
            document.getElementById('aplazados-matematicas').innerText = data.aplazados_matematicas;
            document.getElementById('aplazados-fisica').innerText = data.aplazados_fisica;
            document.getElementById('aplazados-programacion').innerText = data.aplazados_programacion;
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function cargarAlumnos() {
    $.ajax({
        url: 'cargar_alumnos.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var table = document.getElementById('alumnos');

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (var i = 0; i < data.length; i++) {
                var alumno = data[i];

                var row = table.insertRow();
                row.insertCell().innerText = alumno.cedula;
                row.insertCell().innerText = alumno.nombre;
                row.insertCell().innerText = alumno.matematicas;
                row.insertCell().innerText = alumno.fisica;
                row.insertCell().innerText = alumno.programacion;
            }
        },  
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
$(document).ready(function() {
    cargarResultados();
    cargarAlumnos();
});