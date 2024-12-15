require('dotenv').config();

const cors = require('cors');
const express = require('express')
const axios = require('axios');
const listener = express();
const PORT = process.env.PORT;

const apiNuvem = axios.create({
    baseURL: `https://api.nuvemshop.com.br/v1/${process.env.ID_STORE}`,
    headers: {
        'User-Agent': `${process.env.USER_AGENT}`,
        'Authentication': `bearer ${process.env.AUTHENTICATION_TOKEN}`
    }
})

async function updateOrder(data) {
    if (data.name == "Enviado") {
        const order_id = data.seller_id;
        const tracking_url = data.tracking_url.replace("\/", "/")
        try {
            await apiNuvem.put(`/orders/${order_id}`, {
                shipping_tracking_number: tracking_url,
                shipping_status: "fulfilled"
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
    const data = req.body;
    const hasOrderBeenUpdated = await updateOrder(data);
    if (hasOrderBeenUpdated == "Updated") {
        console.log(`Order: ${data.seller_id}, updated successfully`)
        res.status(200).send(`Order: ${data.seller_id}, updated successfully`).end()
    } else if (hasOrderBeenUpdated == "Not Updated")  {
        console.log(`Order: ${data.seller_id} does not need to be updated`)
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

listener.use(cors());

listener.use(express.json());

listener.listen(PORT, () => {
    console.log("Listener Dimona Iniciado. \n Rodando na porta:" + PORT)
})