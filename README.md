#como funciona

você pode adicionar o link de um produto no arquivo script.js dentro de scraping, o link deve ser de uma pagina com varios produtos ex: https://pt.aliexpress.com/category/201000020/consumer-electronics.html
após rodar o codigo voce vai se deparar a com a criação de um arquivo chamado produtos.json. Essa fase voce vai ter que analisar os produtos que te interessam, um a um,
os produtos escolhidos devem ter o atributo "ESCOLHIDO" setado como true (isso é importamnte para aproxima fase)
Voce pode alterar os parâmetros do filtro os parâmentros padrão são: preço < 100, quantidade de produtos vendidos > 100 e estrelas maior que 4, isso é definido na linha 68
dentro.

na pasta ProdutosEscolhidos voce vai se deparar com duas funções GerarLink e Escolhidos. a primeira função gera um json com os links dos prdutos escolhidos e a segunda funçaõ 
voce vai gerar um json com apenas os produtos filtrados. essa parte parece codigo extra que da pra adicionar direto no script principal mas enfim

voce deve apenas rodar e se todos os json foram gerados corretamente voce vai ter outro arquivo chamado produtos_para_pagina.json com os detalhes do produto.
