const fs = require("fs")

function Escolhidos(){
    const rawjson = fs.readFileSync("../scraping/produtos.json")
    const produtos = JSON.parse(rawjson)
    const produtoEscolhido = []

    for(let i = 0; i < produtos.length; i++){
        let item = produtos[i]
        if(item.escolhido == true){
            produtoEscolhido.push(item)
        }
    }

    fs.writeFile("produtosEscolhido.json", JSON.stringify(produtoEscolhido), {flag: "a+"}, () => {})
}

function GerarLink(){
    const rawjson = fs.readFileSync("../ProdutosEscolhidos/produtosEscolhido.json")
    const produtos = JSON.parse(rawjson)
    const links = []
    

    const LinksAtuaisraw = fs.readFileSync("../ProdutosEscolhido/links.json")
    let LinksAtuais;
    if(!!LinksAtuaisraw != false ){
        LinksAtuais = JSON.parse(LinksAtuaisraw)
    }

    for(let i = 0; i < produtos.length; i++){
        let item = produtos[i]
        if(LinksAtuais[i].link != item[i].link)
            links.push({link: item.link})
        else break
    }

    fs.writeFile("links.json", JSON.stringify(links), {flag: "a+"}, () => {})
}

//GerarLink()
Escolhidos()