# Relatório de QA

Data: 07/10/2026. Prévia independente do Chimichurri Parrilla.

## Ambiente

Chrome real em modo headless, Playwright, Windows. Capturas por viewport e de página completa, inspecionadas visualmente. A ferramenta de navegador interativo falhou ao inicializar o kernel local; o teste de desenvolvimento foi executado com Chrome instalado, sem depender daquela ferramenta.

## QA local

VERIFIED: HTTP 200 em `http://127.0.0.1:4173/`. Larguras 360×800, 390×844, 768×1024 e 1440×1000.

- Nenhum erro JavaScript, resposta de asset >=400, âncora inválida ou rolagem horizontal nas quatro larguras.
- Seis fotos carregadas, texto alternativo em todas; Anton e DM Sans confirmadas carregadas.
- Menu móvel abre, fecha após navegação e fecha com Escape. Estado `aria-expanded` conferido.
- Navegação desktop até A casa conferida.
- Primeiro foco de teclado é Pular para o conteúdo; foco visível.
- `prefers-reduced-motion` muda a rolagem para `auto`.
- Ampliação de texto a 200% não cria overflow horizontal.
- Metadados em português, um H1 e robots `noindex, nofollow`.
- Atalhos móveis com altura de 60px e largura mínima de 72px.

## QA pública

Pendente até a conclusão do deploy. Este bloco será substituído pelo resultado real.

## Limites

Não é auditoria WCAG integral nem teste em iPhone/Android físico. Filas, cardápio, Instagram e Maps são canais externos, sujeitos ao acesso, disponibilidade e autenticação das plataformas. Nenhum dado foi enviado à fila; nenhum telefone foi chamado. Links `tel:` e `mailto:` foram validados estruturalmente.

NEEDS OWNER CONFIRMATION: horários e atendimento, menu atual, endereço da entrada e direitos das fotografias. A interface não afirma que esses itens foram aprovados.
