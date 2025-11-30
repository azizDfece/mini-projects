const gBtn = document.getElementById('g-btn')
const range = document.getElementById('range')
const Upperlatter = document.getElementById('Upperlatter')
const Lowerlatter = document.getElementById('Lowerlatter')
const Numbers = document.getElementById('Numbers')
const Symblechar = document.getElementById('Symblechar')
const length = document.querySelector('.length')
const showPassword = document.querySelector('.showPassword')

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
const numberChars = "0123456789"
const symbolChars = "!@#$%^&*()_+"

let includeUpperCase = true
let includeLowerCase = true
let includeSymble = true
let includeNumber = true

let availableChar = ""
passwordLength = 10
let password = ''




gBtn.addEventListener('click', generatePassword)
range.addEventListener('input', (e) => {
    length.textContent = `length: ${e.target.value}`
})




function shuffleString(str) {
    let array = str.split('') //تفكك النص الى مصفوفة 
    let currentIndex = array.length // تستخرج الاندكس الحالي 
    let randomIndex // تسوي متغير لاندكس العشوائي 

    while (currentIndex !== 0) { // تسوي لوب شرط الاندكس لا يساوي 0 
        // تستخرج رقم عشوائي بعدد الاندكس الحالي
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex-- // تنقص الاندكس 

        // تبدل القيم الاندكس الحالي بالعشوائي والعشوائي بالحالي 
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]

    }
    return array.join('') // تحول المصفوفة الى نص بستخدم جوين 
}

function generatePassword() {
    document.querySelector(".showPassword").textContent = ' '
    password = ''
    passwordLength = range.value

    if (Upperlatter.checked) {
        includeUpperCase = true

    } else {
        includeUpperCase = false
    }
    if (Lowerlatter.checked) {
        includeLowerCase = true

    } else {
        includeLowerCase = false
    }
    if (Numbers.checked) {
        includeNumber = true

    } else {
        includeNumber = false
    }
    if (Symblechar.checked) {
        includeSymble = true

    } else {
        includeSymble = false
    }

    if (!includeLowerCase && !includeNumber
        && !includeSymble && !includeUpperCase || passwordLength == 0
    ) {
        console.log("error");
        showPassword.textContent = 'Error try agian'
        console.log(showPassword);
        return


    }


    if (includeUpperCase) {
        availableChar += uppercaseChars
    }
    if (includeLowerCase) {
        availableChar += lowercaseChars
    }
    if (includeSymble) {
        availableChar += symbolChars
    }
    if (includeNumber) {
        availableChar += numberChars
    }
    console.log(availableChar);

    let shuffledAvailableChar = shuffleString(availableChar)
    console.log(shuffledAvailableChar)
    for (let i = 0; i < passwordLength; i++) {
        let randowIndex = Math.floor(Math.random() * availableChar.length - 1)

        password += shuffledAvailableChar.charAt(randowIndex)



    }
    document.querySelector(".showPassword").textContent = password
}
