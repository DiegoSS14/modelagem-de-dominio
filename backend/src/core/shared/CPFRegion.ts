import Errors from "../constants/Errors"

export default class CPFRegion{
    static readonly ALL: CPFRegion[] = [
        new CPFRegion(0, ["RS"]),
        new CPFRegion(1, ["DF", "GO", "MS", "MT", "TO"]),
        new CPFRegion(2, ["AC", "AM", "AP", "PA", "RO", "RR"]),
        new CPFRegion(3, ["CE", "MA", "PI"]),
        new CPFRegion(4, ["AL", "PB", "PE", "RN"]),
        new CPFRegion(5, ["BA", "SE"]),
        new CPFRegion(6, ["MG"]),
        new CPFRegion(7, ["ES", "RJ"]),
        new CPFRegion(8, ["SP"]),
        new CPFRegion(9, ["PR", "SC"]),
    ]

    public static RS = CPFRegion.ALL[0]
    public static DF_GO_MS_MT_TO = CPFRegion.ALL[1]
    public static AC_AM_AP_PA_RO_RR = CPFRegion.ALL[2]
    public static CE_MA_PI = CPFRegion.ALL[3]
    public static AL_PB_PE_RN = CPFRegion.ALL[4]
    public static BA_SE = CPFRegion.ALL[5]
    public static MG = CPFRegion.ALL[6]
    public static ES_RJ = CPFRegion.ALL[7]
    public static SP = CPFRegion.ALL[8]
    public static PR_SC = CPFRegion.ALL[9]

    private constructor(readonly code: number, readonly states: string[]) {}

    static findByCode(code: number): CPFRegion{
        const region = CPFRegion.ALL[code]
        if (!region) throw new Error(Errors.INVALID_REGION)
        return region
    }

    static findByCPF(cpf: string){
        const onlyDigits = cpf.replace(/\D/g, '')
        const codeDigit = onlyDigits[8]

        if (codeDigit === undefined) throw new Error(Errors.INVALID_CPF)

        const code = Number(codeDigit)
        if (Number.isNaN(code)) throw new Error(Errors.INVALID_CPF)

        return this.findByCode(code)
    }

    equals(otherCode: number): boolean {
        return otherCode === this.code
    }
    
    diferent(otherCode: number): boolean {
        return otherCode !== this.code
    }
}