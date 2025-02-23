let input = document.querySelector('#passwordChecker')
let formGroup = document.querySelector('.form-group')
let message = document.querySelector('.message')
let passTypeToggle = document.querySelector('.passTypeToggle')
let strongPassword = new RegExp('(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[^A-Za-z0-9])(?=.{6,}))|((?=.[a-z])(?=.[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

document.body.addEventListener('click', function (e) {
    if (input.contains(e.target)) {
        formGroup.classList.add('focus')
    } else {
        if(input.value == ''){
            formGroup.classList.remove('focus')
        }
    }
});

let checkPasswordStrength = (password) => {
    let message = {}

    if(strongPassword.test(password)) {
        message = {
            strength : 'strong'
        }
    } else if(mediumPassword.test(password)) {
        message = {
            strength : 'medium'
        }
    } else {
        message = {
            strength : 'weak'
        }
    }
    return message
}

input.addEventListener('keyup', e => {
    let password = e.target.value

    password != "" ? passTypeToggle.style.display = 'block' : passTypeToggle.style.display = 'none'

    if(password == ''){
        message.classList.remove('weak')
        message.classList.remove('medium')
        message.classList.remove('strong')

        formGroup.classList.remove('weak')
        formGroup.classList.remove('medium')
        formGroup.classList.remove('strong')

        message.innerHTML = ''
    }else{
        let result = checkPasswordStrength(password)

        if(result.strength == 'weak'){
            message.classList.remove('medium')
            message.classList.remove('strong')
            formGroup.classList.remove('medium')
            formGroup.classList.remove('strong')
            message.classList.add('weak')
            formGroup.classList.add('weak')
            message.innerHTML = 'Your Password is weak.'
        }else if(result.strength == 'medium'){
            formGroup.classList.remove('weak')
            formGroup.classList.remove('strong')
            message.classList.remove('weak')
            message.classList.remove('strong')
            message.classList.add('medium')
            formGroup.classList.add('medium')
            message.innerHTML = 'Your Password is medium.'
        }else{
            formGroup.classList.remove('weak')
            formGroup.classList.remove('medium')
            message.classList.remove('weak')
            message.classList.remove('medium')
            message.classList.add('strong')
            formGroup.classList.add('strong')
            message.innerHTML = 'Your Password is Strong.'
        }
    }

})

passTypeToggle.addEventListener('click', e => {
    input.getAttribute('type') == 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password')
    input.getAttribute('type') == 'password' ? passTypeToggle.setAttribute('title', 'Show') : passTypeToggle.setAttribute('title', 'Hide')
    document.querySelector('.passTypeToggle i').classList.toggle('fa-eye')
    document.querySelector('.passTypeToggle i').classList.toggle('fa-eye-slash')
})