require('dotenv').config();

const cors = require('cors');
const express = require('express')
const axios = require('axios');
const listener = express();

listener.use(express.json());
listener.use(cors());

const PORT = process.env.PORT;

const apiNuvem = axios.create({
    baseURL: `https://api.nuvemshop.com.br/v1/${process.env.ID_STORE}`,
    headers: {
        'User-Agent': `${process.env.USER_AGENT}`,
        'Authentication': `bearer ${process.env.AUTHENTICATION_TOKEN}`
    }
})

async function updateOrder(data) {
    if (data.name == "Enviado" || data.name == "Aguardando coleta pela transportadora") {
        const order_id = data.seller_id;
        const tracking_number = data.dimona_id;
        const tracking_url = data.tracking_url.replace("\/", "/")
        try {
            await apiNuvem.post(`/orders/${order_id}/fulfill`, {
                shipping_tracking_url: tracking_url,
                shipping_tracking_number: tracking_number
            })
            return "Updated";
        } catch (error) {
            return error;
        }
    }
    return "Not Updated";
}

listener.post('/orders', async (req, res) => {
    console.log("New order to update");
    const json = req.body;
    const hasOrderBeenUpdated = await updateOrder(json);
    if (hasOrderBeenUpdated == "Updated") {
        console.log(`Order: ${json.seller_id}, updated successfully`)
        res.status(200).send(`Order: ${json.seller_id}, updated successfully`).end()
    } else if (hasOrderBeenUpdated == "Not Updated")  {
        console.log(`Order: ${json.seller_id} does not need to be updated`)
        res.status(204).end()
    } else {
        console.error(hasOrderBeenUpdated);
        res.status(500).send(hasOrderBeenUpdated).end()
    }
})

listener.get('/', (req, res) => {
    console.log("API is running!")
    res.send("API is running!").end()
})


listener.listen(PORT, () => {
    console.log("Listener Dimona Iniciado. \n Rodando na porta:" + PORT)
})