// import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


// export const PUBLIC_KEY = 'isPublic';
// export const Public = () => SetMetadata(PUBLIC_KEY, true)
export const Public = Reflector.createDecorator<boolean>()
