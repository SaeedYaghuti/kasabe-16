// import { CreatePersonInput } from "../../../../kasabe/models/person/dto/create_person.input";
// import { PersonRole } from '../../../../kasabe/models/person/person_role.enum';
import { CreatePersonInput } from "../../../../kasabe/models/person/dto/create_person.input";
import { PersonRole } from '../../../../kasabe/models/person/person_role.enum';


export const CreatePersonInputs: CreatePersonInput[] = [
    {
        person_name: "John",
        person_role: PersonRole.CUSTOMER,
    },
    
    
]
