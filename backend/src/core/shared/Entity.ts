import Id from "./Id";

export interface EntityProps {
    id?: string | undefined
}

export default abstract class Entity<T, TProps extends EntityProps> {
    readonly id: Id
    readonly props: TProps

    constructor(props: TProps) {
        this.props = props
        this.id = props.id ? new Id(props.id) : Id.generate()
    }

    equals(otherEntity: Entity<T, TProps>) {
        return this.id.value === otherEntity.id.value
    }

    diferent(otherEntity: Entity<T, TProps>) {
        return !this.equals(otherEntity)
    }

    clone(newProps?: Partial<TProps>): T {
        return new (this.constructor as any)({ // Forma diferente de chamar o construtor do filho sem especificar tipos
            ...this.props,
            ...newProps,
            id: newProps?.id ?? this.id.value
        })
    }
}