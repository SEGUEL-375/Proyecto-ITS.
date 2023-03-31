export interface PlanEstudioInterface {
    materias: [
        {
            // nombre de la materia
            nombre_materia?: string;
    
            // detalle de la materia (anual / cuatrimestral)
            detalle?: string;
    
            // ubicacion de la materia (anual / primer-cuatrimestre / segundo-cuatrimestre)
            ubicacion?: string;
    
            // ubicacion de la materia en el diseño curricular (1er año / 2do año / 3er año)
            ubicacion_anual?: string;
        }
    ]
}

export interface CarreraInterface {
    id: string;
    nombre_carrera?: string;
    cant_anios?: number;
    cant_horas?: number;
    cant_materias?: number;
    resolucion?: number;
    plan_estudio?: PlanEstudioInterface;
}