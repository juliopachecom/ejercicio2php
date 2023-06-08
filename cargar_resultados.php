<?php

$alumnos = file_exists('alumnos.json') ? json_decode(file_get_contents('alumnos.json'), true) : [];

$totalMatematicas = 0;
$totalFisica = 0;
$totalProgramacion = 0;
$aprobadosMatematicas = 0;
$aprobadosFisica = 0;
$aprobadosProgramacion = 0;
$aplazadosMatematicas = 0;
$aplazadosFisica = 0;
$aplazadosProgramacion = 0;

foreach ($alumnos as $alumno) {
    $totalMatematicas += $alumno['matematicas'];
    $totalFisica += $alumno['fisica'];
    $totalProgramacion += $alumno['programacion'];

    if ($alumno['matematicas'] >= 10) {
        $aprobadosMatematicas++;
    } else {
        $aplazadosMatematicas++;
    }

    if ($alumno['fisica'] >= 10) {
        $aprobadosFisica++;
    } else {
        $aplazadosFisica++;
    }

    if ($alumno['programacion'] >= 10) {
        $aprobadosProgramacion++;
    } else {
        $aplazadosProgramacion++;
    }
}

$promedioMatematicas = $totalMatematicas / count($alumnos);
$promedioFisica = $totalFisica / count($alumnos);
$promedioProgramacion = $totalProgramacion / count($alumnos);

$resultados = [
    'promedio_matematicas' => round($promedioMatematicas, 2),
    'promedio_fisica' => round($promedioFisica, 2),
    'promedio_programacion' => round($promedioProgramacion, 2),
    'aprobados_matematicas' => $aprobadosMatematicas,
    'aprobados_fisica' => $aprobadosFisica,
    'aprobados_programacion' => $aprobadosProgramacion,
    'aplazados_matematicas' => $aplazadosMatematicas,
    'aplazados_fisica' => $aplazadosFisica,
    'aplazados_programacion' => $aplazadosProgramacion
];

echo json_encode($resultados);
?>
