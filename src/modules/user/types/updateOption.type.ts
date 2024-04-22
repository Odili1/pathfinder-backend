import { MentorBioDataDto } from "../dtos/user.dto";

// let obj: unknown | MentorBioDataDto

// function isMentorBioDataDto(obj: any): obj is MentorBioDataDto{
//     return 'name' in MentorBioDataDto
// }

// const checkType = (obj: any) => {
//     if (isMentorBioDataDto(obj)){
//         return MentorBioDataDto
//     }else{
//         return Object
//     }
// }

export type updateOption = object | MentorBioDataDto