# Listener Dimona

API desenvolvida utilizando o padrão Observer e o Webhook da Dimona para atualizar automaticamente as vendas na NuvemShop com os links de rastreamento dos pedidos.

## Visão Geral
Esta API resolve um problema comum enfrentado por lojistas que utilizam a Dimona como fornecedora de *print-on-demand*. Atualmente, a integração da NuvemShop com a Dimona, via DropSimples, permite apenas a importação de pedidos gerados na NuvemShop para a Dimona. No entanto, as atualizações de status e links de rastreamento não são enviadas automaticamente da Dimona para a NuvemShop. Este processo acaba exigindo que o lojista faça essas atualizações manualmente, resultando em um trabalho adicional.

A API Listener Dimona automatiza este processo, integrando as duas plataformas e garantindo que os links de rastreamento sejam atualizados automaticamente na NuvemShop sempre que um pedido for enviado pela Dimona.

## Benefícios
- Elimina o trabalho manual de atualizar links de rastreamento.
- Garante que os clientes recebam as informações de rastreamento em tempo hábil.
- Libera tempo do lojista para outras atividades, como atendimento ao cliente, marketing e criação de novos produtos.

---

## Requisitos

Antes de configurar a API Listener Dimona, é necessário atender aos seguintes requisitos:

1. **Loja na NuvemShop**
   - Sua loja deve estar integrada com a [Dimona via DropSimples](https://dimona.devapi.com.br/).

2. **Aplicativo API NuvemShop**
   - É necessário criar um aplicativo na [NuvemShop](https://www.nuvemshop.com.br/parceiros/tecnologicos) para consumir a [API da NuvemShop](https://dev.nuvemshop.com.br/docs/developer-tools/nuvemshop-api).

3. **Configuração do Webhook da Dimona**
   - Você deve configurar o link do Webhook gerado para sua API nas configurações da [Dimona](https://api.camisadimona.com.br/#95c8b196-d8de-4321-81cd-a6889fece040).

---

## Funcionamento

O Webhook da Dimona envia um POST para sua API a cada atualização de pedido. Quando o status de um pedido muda para "Enviado", a API Listener Dimona atualiza automaticamente o pedido correspondente na NuvemShop, inserindo o link de rastreamento gerado pela Dimona.

Fluxo:
1. Pedido gerado na NuvemShop é importado para a Dimona via DropSimples.
2. O pedido é produzido e enviado pela Dimona.
3. O Webhook da Dimona notifica a API Listener Dimona sobre o status "Enviado".
4. A API Listener Dimona atualiza o pedido na NuvemShop com o link de rastreamento.

---

## Configuração

### Passo 1: Clonar o Repositório
Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/seurepositorio/listener-dimona.git
cd listener-dimona
```

### Passo 2: Configurar o Arquivo `.env`

1. Renomeie o arquivo `.env.example` para `.env`:
   ```bash
   mv .env.example .env
   ```

2. Edite o arquivo `.env` e preencha as variáveis conforme indicado:

   ```env
   PORT="COLOQUE O NÚMERO DA PORTA DO SERVIDOR"
   ID_STORE="COLOQUE O ID DA SUA LOJA DA NUVEMSHOP"
   USER_AGENT="COLOQUE O NOME DO SEU APLICATIVO API DA NUVEMSHOP"
   AUTHENTICATION_TOKEN="COLOQUE O AUTHENTICATION TOKEN DA SUA API DA NUVEMSHOP"
   ```

### Passo 3: Instalar Dependências

Instale as dependências do projeto utilizando o **npm** ou **yarn**:

```bash
npm install
# ou
yarn install
```

### Passo 4: Iniciar o Servidor

Inicie o servidor localmente:

```bash
npm start
```

O servidor estará rodando na porta especificada no arquivo `.env`.

---

## Hospedagem
Para que o Listener Dimona esteja sempre ativo e acessível, recomenda-se hospedar a API em uma plataforma como [Railway](https://railway.app/):

1. Configure o projeto no Railway seguindo as instruções da plataforma.
2. A URL gerada pelo Railway deve ser configurada como o link do Webhook na Dimona.

---

## Exemplos de Uso

### Exemplo de Corpo do POST Enviado pela Dimona

```json
{
  "name": "Enviado",
  "seller_id": "123",
  "tracking_url": "http://status.ondeestameupedido.com/tracking/1168/462424866"
}
```

### Atualização Automática na NuvemShop
A API irá atualizar o pedido correspondente na NuvemShop com o seguinte payload:

```json
{
  "shipping_tracking_number": "http://status.ondeestameupedido.com/tracking/1168/462424866",
  "shipping_status": "fulfilled"
}
```

---

## Tecnologias Utilizadas
- **Node.js**
- **Express**
- **Axios**

---

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias e novas funcionalidades.

---

## Licença
Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

