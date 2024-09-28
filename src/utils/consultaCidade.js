const axios = require('axios')

async function consultaCidade(coordenadas_geo) {
    try {
        const [lat, lon] = coordenadas_geo.split(',')
        const busca = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)        

        if (busca.data.address && busca.data.address.postcode && busca.data.address.city && busca.data.address.state) {
            const cidade = busca.data.address.city
            const estado = busca.data.address.state
            const pais = busca.data.address.country
            const cep = busca.data.address.postcode
            return { cidade:cidade, estado:estado, pais:pais, cep:cep }
        } else {
            throw new Error('Dados do local não foram encontrados para as coordenadas fornecidas')
        }
    } catch (error) {
        throw new Error(`Erro ao consultar dados da localidade: ${error.message}`)
    }
}

module.exports = { consultaCidade }
