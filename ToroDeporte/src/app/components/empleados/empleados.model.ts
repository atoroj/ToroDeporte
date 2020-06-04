export class Empleado {
    idEmpleados: number;
    nombreEmpleados: string;
    apellidosEmpleados: string;
    contrasenaEmpleados: string;
    enabledEmpleados?: string;
    dniEmpleados: string;
    usernameEmpleados: string;
    cargoEmpleados: string;
    roles: Rol[];
}

export class Rol {
    idRol: number;
    nombreRol: string;
}