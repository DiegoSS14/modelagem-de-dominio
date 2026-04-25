import Errors from "@/core/constants/Errors"
import People from "@/core/people/People"
import Id from "@/core/shared/Id"
import PeopleBuilder from "../../data/PeopleBuilder"

test('Deve criar uma pessoa corretamente', () => {
    const people = PeopleBuilder.create().withName('Diego Sousa').build()
    expect(people.name.firstName).toBe('Diego')
})

test('Deve criar uma pessoa passando ID no construtor', () => {
    const id = Id.generate().value
    const people = PeopleBuilder.create().withName('Diego Sousa da Silva').withCpf('99974602009').withId(id).build()
    expect(people.id.value).toBe(id)
})

test('Deve retornar erro ao tentar criar pessoa passando id inválido', () => {
    const id = "asdknand"
    expect(() => PeopleBuilder.create().withName('Diego Sousa da Silva').withCpf('99974602009').withId(id).build()).toThrow(Errors.INVALID_ID)
})

test('Deve retornar erro ao tentar criar pessoa passando cpf inválido', () => {
    expect(() => PeopleBuilder.create().withName('Diego Sousa da Silva').withCpf('dskad512').build()).toThrow(Errors.INVALID_CPF)
})

test('Deve lançar erro ao tentar criar uma pessoa com nome vazio', () => {
    expect(() => PeopleBuilder.create().withCpf('99974602009').withName(' ').build()).toThrow(Errors.EMPTY_NAME)
})

test('Deve gerar um ID automático quando não informado', () => {
    const people = PeopleBuilder.create().withName('Diego Sousa da Silva').withCpf('99974602009').withUndefinedId().build()
    expect(people.id.value).toBeDefined()
    expect(people.id.new).toBe(true)
})

test('Deve lançar erro ao tentar criar pessoa com CPF inválido', () => {
    expect(() => PeopleBuilder.create().withName('Diego Sousa da Silva').withCpf('12345678901').build()).toThrow()
})

test('Deve lançar erro ao tentar criar pessoa com nome undefined', () => {
    expect(() => PeopleBuilder.create().withCpf('99974602009').withUndefinedName().build()).toThrow(Errors.EMPTY_NAME)
})

test('Deve lançar erro ao tentar criar pessoa com CPF undefined', () => {
    expect(() => PeopleBuilder.create().withName('Diego Sousa da Silva').withUndefinedCpf().build()).toThrow(Errors.INVALID_CPF)
})

test('Deve retornar CPF formatado corretamente', () => {
    const people = PeopleBuilder.create().withName('Diego Sousa da Silva').withCpf('99974602009').build()
    expect(people.cpf.formatCPF).toBe('999.746.020-09')
})

test('Deve marcar new como false quando ID é informado', () => {
    const id = Id.generate().value
    const people = PeopleBuilder.create().withName('Diego Sousa da Silva').withCpf('99974602009').withId(id).build()
    expect(people.id.new).toBe(false)
})

test('Deve retornar nome completo corretamente', () => {
    const people = PeopleBuilder.create().withName('Diego Sousa da Silva').withCpf('99974602009').build()
    expect(people.name.fullName).toBe('Diego Sousa da Silva')
    expect(people.name.lastName).toEqual(['Sousa', 'da', 'Silva'])
})

test('Deve armazenar props corretamente', () => {
    const props = { name: 'Diego Sousa da Silva', cpf: '99974602009' }
    const people = PeopleBuilder.create().withName(props.name).withCpf(props.cpf).build()
    expect(people.props.name).toBe(props.name)
    expect(people.props.cpf).toBe(props.cpf)
})

test('Deve clonar uma pessoa com nome alterado', () => {
    const props = { name: 'Diego Sousa da Silva', cpf: '99974602009' }
    const people = PeopleBuilder.create().withName(props.name).withCpf(props.cpf).build()
    const newPeople = people.clone({name: "Filipe Sousa da Silva", cpf: "00000000000"})
    expect("Filipe Sousa da Silva").toBe(newPeople.name.fullName)
    expect("00000000000").toBe(newPeople.cpf.value)
})

test('Deve comparar duas pessoas iguais', () => {
    const props = { name: 'Diego Sousa da Silva', cpf: '99974602009' }
    const people = PeopleBuilder.create().withName(props.name).withCpf(props.cpf).build()
    const newPeople = people.clone()
    expect(true).toBe(people.equals(newPeople))
    expect(false).toBe(people.diferent(newPeople))
})

test('Deve comparar duas pessoas iguais', () => {
    const props = { name: 'Diego Sousa da Silva', cpf: '99974602009' }
    const people = PeopleBuilder.create().withName(props.name).withCpf(props.cpf).build()
    const newPeople2 = PeopleBuilder.create().withName(props.name).withCpf(props.cpf).build()
    expect(false).toBe(people.equals(newPeople2))
    expect(true).toBe(people.diferent(newPeople2))
})