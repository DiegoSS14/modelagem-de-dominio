import CPF from "../shared/CPF";
import Entity from "../shared/Entity";
import PeopleName from "../shared/PeopleName";

export interface PeopleProps {
    id?: string | undefined
    name?: string | undefined
    cpf?: string | undefined
}

export default class People extends Entity<People, PeopleProps>{
    readonly name: PeopleName
    readonly cpf: CPF

    constructor(props: PeopleProps) {
        super(props)
        this.name = new PeopleName(props.name)
        this.cpf = new CPF(props.cpf)
    }

    // clone(newProps: Partial<PeopleProps>): People {
    //     return new People({...this.props, ...newProps, id: this.id.value})
    // }
}