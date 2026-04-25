import CPFRegion from "@/core/shared/CPFRegion"
import generator from "cpf_and_cnpj-generator";

test('Deve buscar uma região por código', ()=>{
    expect(CPFRegion.DF_GO_MS_MT_TO).toBe(CPFRegion.findByCode(1))
    expect(CPFRegion.ALL[1] == CPFRegion.findByCode(0)).toBeFalsy()
})

test('Deve buscar uma região por cpf', ()=>{
    const cpf = "25721487062"
    expect(CPFRegion.ALL[0]).toBe(CPFRegion.findByCPF(cpf))
    expect(CPFRegion.ALL[1] == CPFRegion.findByCPF(cpf)).toBeFalsy()
})

test('Deve comparar duas regiões', ()=>{
    expect(CPFRegion.ALL[1]?.diferent(CPFRegion.ALL[1]!.code)).toBeFalsy()
    expect(CPFRegion.ALL[1]?.diferent(CPFRegion.ALL[0]!.code)).toBeTruthy()
    expect(CPFRegion.ALL[2]?.equals(CPFRegion.ALL[2]!.code)).toBeTruthy()
    expect(CPFRegion.ALL[2]?.equals(CPFRegion.ALL[9]!.code)).toBeFalsy()
})

test('Deve retornar erro ao buscar região com código inválido', ()=>{
    expect(() => CPFRegion.findByCode(10)).toThrow()
})

test('Deve retornar erro ao buscar região com CPF curto', ()=>{
    expect(() => CPFRegion.findByCPF('12345678')).toThrow()
})

test('Deve retornar erro ao buscar região com dígito de região não numérico', ()=>{
    const fakeCpf = {
        replace: () => '12345678X12'
    } as unknown as string

    expect(() => CPFRegion.findByCPF(fakeCpf)).toThrow()
})