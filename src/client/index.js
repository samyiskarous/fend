import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'

import {handleSubmit} from './js/formHandler'
import {checkForName} from './js/nameChecker'
import {validateURL} from './js/formValidation'

export {
    handleSubmit,
    checkForName,
    validateURL
}