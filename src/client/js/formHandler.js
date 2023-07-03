import { toHumanReadable } from './scoreMapper'

function handleSubmit(event) {
    event.preventDefault();
    updateFormResults();
    updateForm();

    // check what text was put into the form field
    console.log(document);
    const urlInput = document.getElementById('url').value;

    const valid = validateInput(urlInput);
    if (!valid) {
        updateFormResults('Not a valid input');
        return;
    }

    console.log('::: Form Submitted :::')

    updateFormResults('requested')

    return fetch(`/process?url=${urlInput.trim()}`)
        .then(res => res.json())
        .then(res => updateUI(res))
        .catch(e => {
            console.log(e);
            updateFormResults('failed')
        });
}

function validateInput(url) {
    if (!url) {
        console.log('No Url');
        return false;
    }
    const trimmedUrl = url.trim();
    if (trimmedUrl === '') {
        console.log('No url')
        return false;
    }
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
        return true;
    }
    return false;
}

const updateUI = async (res) => {
    console.log(res);
    processResponse(res);
}

function processResponse(res) {
    updateFormResults(res.status.msg);
    if (res.status.code === '0') {
        updateForm(res.agreement, res.confidence, res.subjectivity, res.irony, res.score_tag);
    }
}

function updateForm(agreement = '', confidence = '', subjectivity = '', irony = '', score = '') {
    document.getElementById('agreement').innerHTML = agreement;
    document.getElementById('confidence').innerHTML = confidence;
    document.getElementById('subjectivity').innerHTML = subjectivity;
    document.getElementById('irony').innerHTML = irony;
    document.getElementById('score').innerHTML = toHumanReadable(score);
}

function updateFormResults(msg = '') {
    console.log(msg.toUpperCase());
    document.getElementById('form_results').innerHTML = msg.toUpperCase();
}

export { handleSubmit, validateInput }
