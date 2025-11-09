'use strict'

function getCars() {
    fetch('/api/car')
        .then(res => res.json())
        .then(cars => {
            const elCarList = document.querySelector('pre')
            elCarList.innerText = JSON.stringify(cars, null, 4)
        })
}