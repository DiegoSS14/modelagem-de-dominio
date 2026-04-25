import Errors from "../constants/Errors"
import Validator from "../utils/Validator"

export default class{
    private name: string

    constructor(name?: string) {
        this.name = (name ?? '').trim()
        const nameParts = this.name.split(/\s+/)

        let errors = Validator.combine(
            Validator.notEmpty(this.name, Errors.EMPTY_NAME),
            Validator.sizeSmallerThen(this.name, 4, Errors.VERY_SMALL_NAME),
            Validator.sizeLargerThen(this.name, 120, Errors.VERY_BIG_NAME),
            Validator.notEmpty(nameParts[1] ?? '', Errors.NO_LASTNAME),
            Validator.regex(this.name, /^[a-zA-Z-À-ù@#\s]+$/, Errors.INVALID_CHARACTERS),
        )

        if(errors) throw Error(errors.join(','))
    }

    get fullName() {
        return this.name
    }

    get firstName() {
        return this.name.split(' ')[0]
    }

    get lastName() {
        return this.name.split(' ').slice(1)
    }
}