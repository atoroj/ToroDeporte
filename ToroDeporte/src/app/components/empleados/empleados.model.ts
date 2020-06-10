export class Empleado {
    idEmpleados: number;
    nombreEmpleados: string;
    apellidosEmpleados: string;
    contrasenaEmpleados: string;
    enabledEmpleados?: number;
    dniEmpleados: string;
    usernameEmpleados: string;
    cargoEmpleados: number;
    roles: Rol[];
}

export class Rol {
    [x: string]: any;
    idRol: number;
    nombreRol: string;
}