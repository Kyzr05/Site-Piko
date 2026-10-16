# 🥖 Padaria Piko - Site Institucional & Cardápio Online

Este é o projeto do site da **Padaria Piko**, desenvolvido com **HTML5, CSS3 e JavaScript puro (Vanilla)**, sem necessidade de banco de dados, login ou servidor complexo.

---

## 📁 Arquitetura de Pastas e Arquivos

```text
Site Piko/
│
├── index.html                     # Estrutura principal com todas as seções
├── README.md                      # Instruções de configuração e uso
│
└── assets/
    ├── css/
    │   ├── style.css              # Estilos principais e Variáveis de Cores (:root)
    │   └── responsive.css         # Ajustes de responsividade para celular e tablet
    │
    ├── js/
    │   ├── menu-data.js           # Lista de itens do cardápio (fácil de editar)
    │   ├── reviews-data.js        # Lista de comentários e avaliações dos clientes
    │   └── main.js                # Lógica interativa (filtros, menu mobile, WhatsApp, modal)
    │
    └── images/
        ├── logo/                  # Pasta para a sua logo (logo.png / logo.svg)
        ├── produtos/              # Pasta para fotos dos seus produtos locais
        └── galeria/               # Pasta para fotos do seu espaço físico
```

---

## 🎨 Como Personalizar as Suas Cores de Base

Abra o arquivo [style.css](file:///d:/Programa%C3%A7%C3%A3o/Projetos/Site%20Piko/assets/css/style.css) e localize o bloco `:root` no início do arquivo:

```css
:root {
  --primary-color: #8C4A2F;      /* Sua cor principal (botões, títulos) */
  --primary-hover: #733A23;      /* Cor ao passar o mouse */
  --secondary-color: #D4A373;    /* Cor de apoio / dourado do trigo */
  --secondary-light: #FAEDCD;    /* Fundo suave / creme */
  --accent-color: #C85A32;       /* Destaque de preços */
  --bg-page: #FAF7F2;            /* Fundo geral da página */
  --bg-dark: #231815;            /* Cor do rodapé */
}
```
Basta substituir os códigos hexadecimais (ex: `#8C4A2F`) pelas cores da sua marca!

---

## 🖼️ Como Inserir a Sua Logo

1. Salve o arquivo da sua logo dentro da pasta `assets/images/logo/` (por exemplo: `logo-piko.png`).
2. No arquivo [index.html](file:///d:/Programa%C3%A7%C3%A3o/Projetos/Site%20Piko/index.html), procure pela linha da logo e altere o `src`:
```html
<img src="assets/images/logo/logo-piko.png" alt="Padaria Piko Logo" class="logo-img">
```

---

## 🥐 Como Adicionar ou Alterar Itens no Cardápio

Abra o arquivo [menu-data.js](file:///d:/Programa%C3%A7%C3%A3o/Projetos/Site%20Piko/assets/js/menu-data.js). Você verá uma lista simples de produtos. Para adicionar um novo item, basta copiar e colar um bloco:

```javascript
{
  id: 14,
  name: "Bolo de Milho Cremoso",
  category: "doces",       // Opções: paes, doces, salgados, bebidas
  price: "R$ 12,00 / fatia",
  badge: "Caseiro",
  description: "Receita tradicional quentinha com milho fresco ralado.",
  image: "assets/images/produtos/bolo-milho.jpg"
}
```

---

## 💬 Como Alterar o Número de WhatsApp

Abra o arquivo [main.js](file:///d:/Programa%C3%A7%C3%A3o/Projetos/Site%20Piko/assets/js/main.js) e altere a constante no início:
```javascript
const BAKERY_WHATSAPP = "5511999999999"; // Coloque o DDI (55) + DDD + Telefone
```
Ao clicar em **"Pedir no WhatsApp"** em qualquer produto do cardápio, uma mensagem formatada com o nome do produto é gerada automaticamente para o cliente enviar!

---

## 🚀 Como Testar o Site

Basta abrir o arquivo [index.html](file:///d:/Programa%C3%A7%C3%A3o/Projetos/Site%20Piko/index.html) em qualquer navegador (Google Chrome, Microsoft Edge, Firefox) dando um clique duplo!
