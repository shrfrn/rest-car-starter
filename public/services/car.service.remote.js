const BASE_URL = '/api/car'
const PAGE_SIZE = 3

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(cars => {

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }
            
            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.speed >= filterBy.minSpeed)
            }

            if (filterBy.paginationOn) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                const endIdx = filterBy.pageIdx * PAGE_SIZE + PAGE_SIZE

                cars = cars.slice(startIdx, endIdx)
            }
            return cars
        })
}

function get(carId) {
    return axios.get(BASE_URL + '/' + carId)
        .then(res => res.data)
}

function remove(carId) {
    return axios.get(BASE_URL + '/' + carId + '/remove')
}

function save(car) {
    const queryStr = '/save?' +
        `vendor=${car.vendor}&` +
        `speed=${car.speed}&` +
        `_id=${car._id || ''}`

    return axios.get(BASE_URL + queryStr)
        .then(res => res.data)
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '', pageIdx: 0, paginationOn: true }
}