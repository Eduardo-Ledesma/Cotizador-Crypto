const form = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded', () => {
    getCripto();
    form.addEventListener('submit', validateForm);
})

function validateForm(e) {
    e.preventDefault();

    const coin = document.querySelector('#moneda').value
    const criptocoin = document.querySelector('#cripto').value
    
    if(!coin || !criptocoin) {
        createAlert('Ambos campos son necesarios.', 'error')
        return;
    }
    createAlert('Cotizando, por favor espere...')
    clearHTML()
    setTimeout(() => {
        getResultCripto()
    }, 2500);
    
}

async function getCripto() {
    const url='https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'

    try {
        const response = await fetch(url)
        const result = await response.json()
        fillSelectCripto(result.Data)
    } catch (error) {
        console.log(error);
    }
}

function fillSelectCripto(result) {
    const criptocoin = document.querySelector('#cripto');

    result.forEach( cripto => { 
        const { CoinInfo } = cripto

        const option = document.createElement('OPTION');
        option.textContent = CoinInfo.FullName;
        option.value = CoinInfo.Name;

        criptocoin.appendChild(option);
    });
}

async function getResultCripto() {
    const coin = document.querySelector('#moneda').value
    const criptocoin = document.querySelector('#cripto').value

    const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptocoin}&tsyms=${coin}`

    try {
        const response = await fetch(url)
        const result = await response.json()
        showResult(result.DISPLAY[`${criptocoin}`][`${coin}`]);
    } catch (error) {
        console.log(error);
    }
}

function showResult(result) {
    const { PRICE, HIGHDAY, LOWDAY, OPENDAY } = result;
    
    const divResults = document.createElement('DIV');
    divResults.classList.add('border');

    const price = document.createElement('P');
    price.textContent = 'Precio Actual: ';
    price.classList.add('font-bold', 'size');

    const priceSpan = document.createElement('SPAN');
    priceSpan.textContent = PRICE;
    priceSpan.classList.add('font-normal');
    price.appendChild(priceSpan);

    const highday = document.createElement('P');
    highday.textContent = 'Máximo diario: ';
    highday.classList.add('font-bold')

    const highdaySpan = document.createElement('SPAN');
    highdaySpan.textContent = HIGHDAY;
    highdaySpan.classList.add('font-normal');
    highday.appendChild(highdaySpan);

    const lowday = document.createElement('P');
    lowday.textContent = 'Mínimo diario: ';
    lowday.classList.add('font-bold')

    const lowdaySpan = document.createElement('SPAN');
    lowdaySpan.textContent = LOWDAY;
    lowdaySpan.classList.add('font-normal');
    lowday.appendChild(lowdaySpan);

    const openday = document.createElement('P');
    openday.textContent = 'Precio Actual: ';
    openday.classList.add('font-bold')

    const opendaySpan = document.createElement('SPAN');
    opendaySpan.textContent = OPENDAY;
    opendaySpan.classList.add('font-normal');
    openday.appendChild(opendaySpan);

    divResults.appendChild(price)
    divResults.appendChild(highday)
    divResults.appendChild(lowday)
    divResults.appendChild(openday)

    document.querySelector('#result').appendChild(divResults)
}

function createAlert(message, type) {
    const fieldset = document.querySelector('.fieldset');
    const exist = document.querySelector('.alerta');
    if(!exist) {
        const alert = document.createElement('DIV');
        alert.textContent = message;
        alert.classList.add('alerta');
        if(type) {
            alert.classList.add('error')
        } else {
            alert.classList.add('success')
        }
        fieldset.insertBefore(alert, document.querySelector('.btn-enviar'))
        setTimeout(() => {
            alert.remove()
        }, 2500);
    }
}

function clearHTML() {
    const result = document.querySelector('#result');
    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }
}