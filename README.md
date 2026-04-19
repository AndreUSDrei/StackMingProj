# 🌐 Stack Ming Web - Pipeline de Dados IoT em Nuvem

[![Pitch do Projeto](https://img.shields.io/badge/YouTube-Assistir_Pitch-red?style=for-the-badge&logo=youtube)](https://youtu.be/AWXHPBVEfeA)

Este repositório contém o código-fonte do Trabalho de Conclusão de Curso (TCC) focado na construção de um **pipeline de dados IoT de ponta a ponta**. O sistema foi projetado para coletar, rotear, processar e exibir telemetria de sensores em tempo real, aplicando regras de negócio e rodando inteiramente na nuvem (AWS EC2) de forma conteinerizada.

---

## 🎬 Vídeo de Apresentação (Pitch)

Clique na imagem abaixo para assistir ao pitch do projeto, demonstrando a arquitetura e o funcionamento em tempo real:

[![Assista ao Pitch](https://img.youtube.com/vi/AWXHPBVEfeA/maxresdefault.jpg)](https://youtu.be/AWXHPBVEfeA)

---

## 🏗️ Arquitetura e Tecnologias (Stack MING + Web)

O projeto utiliza a **Stack MING** para a infraestrutura de IoT, acrescida de uma **camada de aplicação** customizada para regras de negócio:

### 1. Camada de Borda (Edge)

- **Simulador (Python/Wokwi):** atua como um microcontrolador ESP32 enviando dados simulados de temperatura e umidade.

### 2. Camada de Ingestão e Roteamento (Stack MING)

- **M (Mosquitto / MQTT):** protocolo leve de mensageria para receber os dados do hardware.
- **N (Node-RED):** orquestrador *low-code* que assina os tópicos MQTT e injeta os dados no banco.
- **I (InfluxDB):** banco de dados *time-series* de alta performance, otimizado para salvar a telemetria bruta.
- **G (Grafana):** painel de visualização técnica dos dados brutos em tempo real.

### 3. Camada de Aplicação (Regras de Negócio)

- **Backend (Node.js + Express):** API REST que roda *cron jobs* para buscar dados no InfluxDB, calcular médias (evitando oscilações) e verificar se o sensor está ativo.
- **Banco Relacional (MySQL):** armazena o estado atual dos sensores (por exemplo, `ONLINE` ou `OFFLINE`) e o cadastro dos dispositivos.

### 4. Camada de Apresentação

- **Frontend (React.js):** dashboard interativo e responsivo que consome a API do Node.js, exibindo os dados processados e os status reais dos equipamentos para o usuário final.

---

## ⚙️ Regras de Negócio Implementadas

Para garantir que o dashboard não seja sobrecarregado com dados caóticos, o backend aplica as seguintes regras:

1. **Consolidação de Dados:** o sistema agrupa as leituras do InfluxDB a cada janela de 5 minutos, calculando médias de temperatura e umidade.
2. **Heartbeat (Status Online/Offline):** se o banco InfluxDB registrar leituras recentes, o MySQL é atualizado marcando o sensor como `ONLINE`. A ausência prolongada de dados muda o status para `OFFLINE` automaticamente.

---

## 🚀 Como executar o projeto localmente (ou na nuvem)

O projeto está 100% conteinerizado. Siga os passos abaixo para rodar toda a infraestrutura com um único comando:

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado.

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/AndreUSDrei/StackMingProj.git
cd StackMingProj
```

2. Suba os containers:

```bash
docker-compose up -d --build
```

3. Acesse os serviços no navegador:

- **Dashboard Web (React):** `http://localhost` ou o IP do seu servidor
- **API Backend:** `http://localhost:8080`
- **Node-RED:** `http://localhost:1880`
- **Grafana:** `http://localhost:8084`
- **InfluxDB:** `http://localhost:8086`

> Se estiver rodando em nuvem, libere as portas acima no *Security Group* do seu provedor, como a AWS.

---

## 📁 Estrutura do Repositório

- `/frontend` - código-fonte do dashboard em React.
- `/backend` - código-fonte da API em Node.js e scripts de consolidação.
- `/nodered` - configurações e fluxo (`flows.json`) exportado do Node-RED.
- `/mosquitto` - arquivo de configuração do broker MQTT.
- `docker-compose.yml` - orquestração de todos os serviços.
