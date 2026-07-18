# O Cozinheiro de Ouro — Cardápio Digital

## 1. Antes de publicar

Abra `src/firebaseConfig.js` e cole a configuração que o Firebase te deu
(Console do Firebase → Configurações do projeto → Seus aplicativos → ícone `</>`).

## 2. Publicar de graça (escolha uma opção)

### Opção A — Vercel (recomendado)
1. Crie uma conta grátis em vercel.com (pode entrar com GitHub, Google ou e-mail)
2. Clique em "Add New… → Project"
3. Se tiver essa pasta num repositório do GitHub, conecte o repositório.
   Se não tiver, use `vercel.com/new` e arraste a pasta do projeto.
4. Deixe as configurações padrão (a Vercel detecta Vite automaticamente) e clique em "Deploy"
5. Em 1-2 minutos você recebe um link tipo `cozinheiro-de-ouro.vercel.app` — esse é o link do cliente
6. O link do admin é o mesmo + `#admin` (ex: `cozinheiro-de-ouro.vercel.app/#admin`)

### Opção B — Netlify
1. Crie uma conta grátis em netlify.com
2. Rode localmente (ou peça pra alguém rodar): `npm install` e depois `npm run build`
3. Arraste a pasta `dist` gerada para app.netlify.com/drop
4. Você recebe o link na hora

## 3. Importante sobre o Firestore (banco de dados)

Quando você criou o banco em "modo de teste", ele funciona livremente por 30 dias.
Depois disso, o Firebase pede pra você definir regras de segurança — me avise quando
chegar perto disso que eu te ajudo a configurar (é simples, mas fica de fora agora
pra não complicar o primeiro passo).

## 4. Rodando localmente (opcional, só se quiser testar antes de publicar)

```
npm install
npm run dev
```
