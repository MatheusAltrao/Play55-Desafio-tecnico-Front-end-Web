<h1 align="center">Play55 - Desafio Técnico Front-end Web</h1>

<p align="center">
  Projeto desenvolvido em <strong>Nuxt 3</strong> com <strong>Vue 3</strong>, utilizando o paradigma de <strong>Client-side Rendering</strong> (CSR) e foco em boas práticas de usabilidade, responsividade e organização de código.
</p>

<hr />

<h2>✅ Funcionalidades implementadas</h2>

<ul>
  <li>🔐 Login com Google integrado ao Firebase</li>
  <li>📨 Formulário "Fale conosco" com campos:
    <ul>
      <li>Nome</li>
      <li>Email</li>
      <li>Telefone</li>
      <li>Data de nascimento</li>
    </ul>
  </li>
  <li>🛡️ Integração com reCAPTCHA v3
    <ul>
      <li>Token gerado com <code>grecaptcha.execute</code> usando <strong>action: "form_submit"</strong></li>
      <li>Enviado em uma requisição POST para o endpoint fornecido</li>
    </ul>
  </li>
  <li>💬 Sistema de mensagens (chat offline) com suporte a:
    <ul>
      <li>Criação de mensagens próprias ou de terceiros (com nome)</li>
      <li>Filtro por mensagens mais antigas, mais recentes ou apenas minhas</li>
      <li>Edição de mensagens (somente se <code>mensagemPropria === true</code>)</li>
      <li>Incremento de curtidas ilimitado (sem controle de múltiplos cliques)</li>
    </ul>
  </li>
  <li>🧠 Persistência de mensagens usando <code>localStorage</code></li>
</ul>

<hr />

<h2>🧪 Tecnologias utilizadas</h2>

<ul>
  <li><strong>Nuxt 3</strong> - framework para Vue 3</li>
  <li><strong>Vue 3 Composition API</strong></li>
  <li><strong>TypeScript</strong></li>
  <li><strong>Firebase Auth</strong> - autenticação com Google</li>
  <li><strong>Google reCAPTCHA v3</strong></li>
  <li><strong>Tailwind CSS</strong> - estilização</li>
  <li><strong>Zod + Vee-Validate</strong> - validação de formulários</li>
</ul>

<hr />

<h2>📱 Responsividade</h2>

<p>
  A interface foi desenvolvida com foco em <strong>responsividade</strong>, adaptando-se perfeitamente a dispositivos móveis e desktops.
</p>

<hr />

<h2>🚀 Como executar</h2>

<pre>
# Instale as dependências
npm install

# Rode o projeto em modo de desenvolvimento
npm run dev
</pre>

<p>
  Certifique-se de configurar corretamente as variáveis de ambiente, como a chave do Firebase e a chave pública do reCAPTCHA.
</p>

<hr />

<h2>🔗 Links de entrega</h2>

<ul>
  <li><strong>Repositório no GitHub:</strong> <a href="https://github.com/MatheusAltrao/Play55-Desafio-tecnico-Front-end-Web" target="_blank">https://github.com/MatheusAltrao/Play55-Desafio-tecnico-Front-end-Web</a></li>
</ul>

<hr />

<h2>📧 Contato</h2>

<p>
  Projeto desenvolvido por <strong>Seu Nome</strong> para o processo seletivo da <strong>Play55</strong>. Em caso de dúvidas ou mais informações:
</p>

<ul>
  <li>Email: matheusaltrao2@gmail.com</li>
<li>Celular: (67) 999271900</li>
  <li>LinkedIn: <a href="https://www.linkedin.com/in/matheus-altrao/" target="_blank">https://www.linkedin.com/in/matheus-altrao/</a></li>
</ul>
