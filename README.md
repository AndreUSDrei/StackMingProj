# 🌐 Stack Ming Web - Pipeline de Dados IoT em Nuvem

[![Pitch do Projeto](https://img.shields.io/badge/YouTube-Assistir_Pitch-red?style=for-the-badge&logo=youtube)](https://youtu.be/AWXHPBVEfeA)

Este repositório contém o código-fonte do Trabalho de Conclusão de Curso (TCC) focado na construção de um **Pipeline de Dados IoT de ponta a ponta**. O sistema foi projetado para coletar, rotear, processar e exibir telemetria de sensores em tempo real, aplicando regras de negócio e rodando inteiramente na nuvem (AWS EC2) de forma conteinerizada.

---

## 🎬 Vídeo de Apresentação (Pitch)
Clique na imagem abaixo para assistir ao Pitch do projeto, demonstrando a arquitetura e o funcionamento em tempo real:

[![Assista ao Pitch](https://img.youtube.com/vi/AWXHPBVEfeA/maxresdefault.jpg)](https://youtu.be/AWXHPBVEfeA)

---

## 🏗️ Arquitetura e Tecnologias (Stack MING + Web)

O projeto utiliza a **Stack MING** para a infraestrutura de IoT, acrescida de uma **Camada de Aplicação** customizada para regras de negócio:

### 1. Camada de Borda (Edge)
* **Simulador (Python/Wokwi):** Atua como um microcontrolador ESP32 enviando dados simulados de Temperatura e Umidade.

### 2. Camada de Ingestão e Roteamento (Stack MING)
* **M (Mosquitto / MQTT):** Protocolo leve de mensageria para receber os dados do hardware.
* **N (Node-RED):** Orquestrador *low-code* que assina os tópicos MQTT e injeta os dados no banco.
* **I (InfluxDB):** Banco de dados *Time-Series* de alta performance, otimizado para salvar a telemetria bruta.
* **G (Grafana):** Painel de visualização técnica dos dados brutos em tempo real.

### 3. Camada de Aplicação (Regras de Negócio)
* **Backend (Node.js + Express):** API REST que roda *Cron Jobs* para buscar dados no InfluxDB, calcular médias (evitando oscilações) e verificar se o sensor está ativo.
* **Banco Relacional (MySQL):** Armazena o estado atual dos sensores (ex: `ONLINE` ou `OFFLINE`) e o cadastro dos dispositivos.

### 4. Camada de Apresentação
* **Frontend (React.js):** Dashboard interativo e responsivo que consome a API do Node.js, exibindo os dados mastigados e os status reais dos equipamentos para o usuário final.

---

## ⚙️ Regras de Negócio Implementadas
Para garantir que o Dashboard não seja sobrecarregado com dados caóticos, o Backend aplica as seguintes regras:
1. **Consolidação de Dados:** O sistema agrupa as leituras do InfluxDB a cada janela de 5 minutos, calculando médias de temperatura e umidade.
2. **Heartbeat (Status Online/Offline):** Se o banco InfluxDB registrar leituras recentes, o MySQL é atualizado marcando o sensor como `ONLINE`. A ausência prolongada de dados muda o status para `OFFLINE` automaticamente.

---

## 🚀 Como executar o projeto localmente (ou na nuvem)

O projeto está 100% conteinerizado. Siga os passos abaixo para rodar toda a infraestrutura com um único comando:

### Pré-requisitos
* [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados na máquina.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/AndreUSDrei/StackMingProj.git](https://github.com/AndreUSDrei/StackMingProj.git)
   cd StackMingProj
