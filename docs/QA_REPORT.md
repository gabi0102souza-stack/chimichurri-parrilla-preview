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

VERIFIED: https://gabi0102souza-stack.github.io/chimichurri-parrilla-preview/ respondeu HTTP 200. GitHub Pages e build retornaram `built`. Branch `main`, pasta raiz.

| Tela no Chrome | Resultado |
|---|---|
| Desktop 1440×1000 | PASS: imagens, fontes, navegação, metadados e ausência de overflow. |
| Tablet 768×1024 | PASS: composição em colunas, imagens e navegação. |
| Mobile 360×800 | PASS: menu, Escape, âncoras, atalhos fixos, fontes e ausência de overflow. |
| Mobile 390×844 | PASS: mesmas verificações e leitura visual. |

Nenhuma exceção JavaScript, foto quebrada, resposta de asset >=400 ou âncora sem destino nas quatro telas. Capturas da URL pública inspecionadas. Ampliação de texto por CSS e preferência por movimento reduzido também verificadas; não é uma aferição de zoom físico de navegador.

Os links de fila, Maps e Instagram foram clicados na prévia e abriram os destinos corretos em novas abas. A fila apresentou formulário da casa; nenhum dado foi preenchido. O Maps apresentou Chimichurri Parrilla no número 730. O perfil do Instagram apresentou a biografia da casa. O destaque Cardápio foi identificado pelo link na página oficial; leitura integral de stories pode exigir login.

Fila, Maps, Instagram, Linktree, CNN e VEJA responderam HTTP 200 em verificação de rede. Telefone e e-mail estão em protocolos `tel:` e `mailto:` corretos. Documentos e licenças estão versionados.

### Performance medida

Uma execução na URL pública em Chrome, viewport 390px, rede simulada com RTT 150ms e download 500 kB/s, CPU desacelerada 4×, cache vazio:

- LCP: 1,384 s.
- CLS: 0.
- Transferência inicial observada: aproximadamente 133 kB, incluindo HTML, recursos próximos à dobra, fontes e cabeçalhos.
- JavaScript transferido: 664 bytes com compressão e cabeçalhos.

São medidas de laboratório de uma execução, não dados de usuários reais nem pontuação Lighthouse. Reutilização das medidas após a inclusão de horários/cardápio é limitada ao hero e recursos iniciais, que não mudaram.

Evidências: `docs/qa/final-qa.json` (reteste da versão bd7f3c1 após horários e cardápio), `docs/qa/public-qa.json`, `docs/qa/performance-links.json` e `docs/qa/link-clicks.json`. Capturas completas em `.work/`, não enviadas ao Git.

## Limites

Não é auditoria WCAG integral nem teste em iPhone/Android físico. Filas, cardápio, Instagram e Maps são canais externos, sujeitos ao acesso, disponibilidade e autenticação das plataformas. Nenhum dado foi enviado à fila; nenhum telefone foi chamado. Links `tel:` e `mailto:` foram validados estruturalmente.

NEEDS OWNER CONFIRMATION: horários e atendimento, menu atual, endereço da entrada e direitos das fotografias. A interface não afirma que esses itens foram aprovados.
