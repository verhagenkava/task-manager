# Task Manager
Task Manager é uma simples aplicação de tarefas.

## Resumo Técnico
O front-end é construído em [React](https://reactjs.org/) (versão 17.0.0), utilizando-se do framework [Material-UI](https://material-ui.com/) para componentes estilizados, date-picker e ícones. Utiliza-se, também, [React Router](https://reactrouter.com/) para rotas entre componentes. O projeto foi iniciado através da ferramenta [Create React App](https://github.com/facebook/create-react-app).  
O back-end é uma simples API em [Python](https://www.python.org/) (versão 3.8.2) com o [Flask Framework](https://flask.palletsprojects.com/en/1.1.x/), sem conexão com banco de dados.

## Instalação
### Front-end
Certifique-se de possuir [Node.js](https://nodejs.org/en/) instalado em sua máquina.  
Então, navegue até a pasta "front" e utilize o gerenciador de pacotes [npm](https://www.npmjs.com/) para instalar as dependências
```bash
npm install
```

E então, rode a aplicação.

```bash
npm start
```
### Back-end
Certifique-se de possuir Python instalado em sua máquina.  
Então, navegue até a pasta "back" e utilize o gerenciador de pacotes [pip](https://pypi.org/project/pip/) para instalar as dependências
```bash
pip install -r requirements.txt
```
E então, rode a aplicação.
```bash
python server.py
```
