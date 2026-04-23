import Id from "./Id";

export interface EntityProps {
    id?: string
}

export default abstract class Entity<T, TProps extends EntityProps> {
    readonly id: Id
    readonly props: TProps

    constructor(props: TProps) {
        this.props = props
        this.id = this.id = props.id ? new Id(props.id) : Id.generate()
    }

    equals(otherEntity: Entity<T, TProps>) {
        return this.id.value === otherEntity.id.value
    }

    diferent(otherEntity: Entity<T, TProps>) {
        return !this.equals(otherEntity)
    }

    // Aceita passar novos argumentos diferentes com a propriedade "other"
    clone(newProps?: TProps, ...other: any): T {
        return new (this.constructor as any)({ // Forma diferente de chamar o construtor do filho sem especificar tipos
            ...this.props,
            ...newProps,
            ...other,
            id: this.id.value
        })
    }
}