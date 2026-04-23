import Entity from "@/core/shared/Entity"
import Id from "@/core/shared/Id"

export interface TestProps {
    id?: string
    name?: string
    idade?: number
}

class Test extends Entity<Test, TestProps> {
    props: TestProps

    constructor(props: TestProps) {
        super(props)
        this.props = props
    }
}

test('Deve comparar duas entidades iguais', ()=>{
    const t1 = new Test({name: 'teste 1', idade: 16})
    const t2 = t1.clone()
    expect(true).toBe(t2.equals(t1))
    expect(false).toBe(t2.diferent(t1))
})

test('Deve comparar duas entidades diferentes', ()=>{
    const t1 = new Test({name: 'teste 1', idade: 16})
    const t2 = new Test({name: 'teste 2', idade: 17})
    expect(false).toBe(t1.equals(t2))
    expect(true).toBe(t1.diferent(t2))
})

test('Deve clonar uma entidade com nome diferente', ()=>{
    const t1 = new Test({name: 'teste 1', idade: 16})
    const t2 = t1.clone({name: 'Maria Silva'})
    expect('Maria Silva').toEqual(t2.props.name)
    expect(16).toEqual(t2.props.idade)
})

test('Deve clonar uma entidade com id diferente', ()=>{
    const t1 = new Test({name: 'teste 1', idade: 16})
    const t2 = t1.clone({id: Id.generate().value})
    expect('teste 1').toEqual(t2.props.name)
    expect(16).toEqual(t2.props.idade)
    expect(true).toBe(t1.diferent(t2))
})

