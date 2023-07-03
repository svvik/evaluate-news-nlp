import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/results.scss'
import './styles/header.scss'

import { handleSubmit } from './js/formHandler'

document.getElementById("process_form").addEventListener("submit", (e) => {
    return handleSubmit(e);
});