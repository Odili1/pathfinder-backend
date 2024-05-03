// import { Reflector } from "@nestjs/core";

import { SetMetadata } from "@nestjs/common";

// export const Roles = Reflector.createDecorator<string[]>()

export const Roles = (role: string) => SetMetadata('role', role)