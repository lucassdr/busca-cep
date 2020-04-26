import axios from 'axios'

export const getCEP = async (cep) => {
    try {
        return await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    } catch (err) {
        return console.log('err =>', err)
    }
}
