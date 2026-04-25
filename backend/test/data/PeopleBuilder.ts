import People, { PeopleProps } from "@/core/people/People";
import generator from "cpf_and_cnpj-generator";
import { randFullName, randEmail, randAddress } from '@ngneat/falso';
import Id from "@/core/shared/Id";

export default class PeopleBuilder {
    private constructor(private props: PeopleProps) {
    }

    static create() {
        return new PeopleBuilder({
            id: Id.generate().value,
            cpf: generator.generateCpf(),
            name: randFullName()
        })
    }

    public withId(id: string) {
        this.props.id = id
        return this
    }

    withName(name: string) {
        this.props.name = name
        return this
    }

    withCpf(cpf: string) {
        this.props.cpf = cpf
        return this
    }

    withUndefinedCpf() {
        this.props.cpf = undefined
        return this
    }

    withUndefinedId() {
        this.props.id = undefined
        return this
    }

    withUndefinedName() {
        this.props.name = undefined
        return this
    }

    build(): People {
        return new People(this.props)
    }
}