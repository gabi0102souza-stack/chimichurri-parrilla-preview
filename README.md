# Chimichurri Parrilla: prévia independente

Website estático para prospecção comercial. Conceito independente desenvolvido para apresentação; não aprovado pelo restaurante.

- Publicação prevista: https://gabi0102souza-stack.github.io/chimichurri-parrilla-preview/
- Repositório previsto: https://github.com/gabi0102souza-stack/chimichurri-parrilla-preview
- Branch de publicação: `main`, pasta raiz, GitHub Pages.
- HTML, CSS e JavaScript nativos. Sem framework, build obrigatório, cookies próprios, analytics, formulários ou biblioteca no navegador.
- Fotos reais identificadas na imprensa. Fontes Anton e DM Sans locais, com licenças SIL OFL incluídas.
- `noindex, nofollow` em todas as páginas HTML. A prévia é pública e não pretende representar um canal aprovado da empresa. Noindex é uma orientação a robôs, não controle de acesso.

## Desenvolvimento

Node.js 18 ou superior. Execute `node scripts/serve.cjs` e abra http://127.0.0.1:4173/.

O site funciona sem JavaScript, com exceção do botão de navegação compacta. Os atalhos fixos de celular permanecem disponíveis.

## QA

O script de teste usa Playwright apenas no desenvolvimento. Instale com `npm install --no-save playwright`, com Chrome instalado. Execute `node scripts/qa.cjs http://127.0.0.1:4173/ local` ou informe a URL pública e o identificador `public`. As capturas e evidências ficam em `.work/`, excluída do Git.

Para gerar novamente as imagens, coloque os JPGs originais em `.work/` com os nomes indicados em `scripts/optimize-images.cjs`, instale Sharp com `npm install --no-save sharp` e execute `node scripts/optimize-images.cjs`. Não é necessário para servir o site. Os arquivos finais já estão versionados.

## Atualização e publicação

Edite os arquivos, execute a QA, faça commit e envie para `main`. O Pages publica a pasta raiz. Todos os caminhos de assets são relativos para funcionar no subdiretório do projeto. `.nojekyll` evita processamento desnecessário.

Antes de converter a proposta em site oficial: obtenha autorização da empresa e dos titulares das fotos; confirme horários, menu, atendimento e endereço operacional; revise a marca com a casa. Não adicionar reservas ou delivery sem confirmação.

## Documentação

- [Pesquisa](docs/RESEARCH.md)
- [Fontes de imagens](docs/ASSET_SOURCES.md)
- [Relatório de QA](docs/QA_REPORT.md)
- [Estratégia](SITE_STRATEGY.md)
- [Direção criativa](CREATIVE_DIRECTION.md)
- [Autocrítica](SELF_CRITIQUE.md)
