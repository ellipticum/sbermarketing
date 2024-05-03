import { encoded, translations } from './data.js'

const decode = (encoded) => {
    return encoded.map((item) => {
        let decodedItem = {}
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                if (key.endsWith('Id') && translations[item[key]] !== undefined) {
                    decodedItem[key] = translations[item[key]]
                } else {
                    decodedItem[key] = item[key]
                }
            }
        }
        return decodedItem
    })
}

const decoded = decode(encoded)

console.log(decoded)
