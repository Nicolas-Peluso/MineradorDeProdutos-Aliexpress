const fs = require("fs/promises")
const fsDeafult = require("fs")
const puppeter = require("puppeteer")
const rawPro = fsDeafult.readFileSync("../../ProdutosEscolhidos/produtosescolhido.json")
const Product = JSON.parse(rawPro)

async function BuscarPorProdutosDetail(){
    let produtosDetalhados = []
    let quantidade_disponivel, frete, come_from, garantia = "", descricao, fotos_Details = [];
    let imagens = []
    
    const browse = await puppeter.launch({
        headless: false,
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    })
    const page = await browse.newPage()
    
    for(let i = 0; i < Product.length; i++){
        imagens = []
        await page.goto("https:"+Product[i].link)
        try{
            await page.waitForSelector("div.img-view-wrap")
            const listimages = Array.from(await page.$$("div.img-view-wrap > div > div > div.images-view-wrap > ul li"))
            // loop pelas imagens para habilitar o link de cada uma
            for(let j = 0; j < listimages.length; j++){
                await listimages[j].hover()
                await page.waitForSelector("div.img-view-wrap")
                const imageLink = await page.$eval("div.img-view-wrap > div > div > div.image-view-magnifier-wrap > img", el => el.getAttribute("src"))
                imagens.push(imageLink)
            }
       }catch(erro){
        come_from = "sem informações"
        }

        try{
            quantidade_disponivel = await page.$eval("div.product-info > div.product-quantity.clearfix > div.product-quantity-info > div.product-quantity-tip > span > span", qnt => qnt.textContent)            
        } catch{
            quantidade_disponivel = await page.$eval("div.product-info > div.product-quantity.clearfix > div.product-quantity-info > div.product-quantity-tip > span", qnt => qnt.textContent)
        }
        //frete só rodar tenho que esperar o cris pra ver como vamos calcular
        //try{
        //    frete = await page.$eval("div.product-info > div.product-dynamic-shipping > div > div > div.dynamic-shipping-line.dynamic-shipping-titleLayout > span > span", qnt => qnt.textContent)            
      //  } catch(e){
      //   frete = "sem informações"

      //  }
      try{
            come_from = await page.$eval("div.product-info > div.product-dynamic-shipping > div > div > div:nth-child(2) > span > span:nth-child(2)", come => come.textContent)
      } catch(e){
        come_from = "sem informações"
        }
      
        try{
            const raw_text = await page.$$("div.product-info > div.buyer-pretection > div > a > div.buyer-pretection-content > div")
            for(let i = 0; i < raw.length; i++){
               garantia += ` ${await raw[i].evaluate(el => el.textContent)} `
            }

      } catch(e){
            garantia = "sem informações"
        }

        try{
            fotos_Details = []
            const raw_fotos = await page.$$("#product-description > div > div > div > p > img")
            for(let i = 0; i < raw_fotos.length; i++){
                fotos_Details.push(await raw_fotos[i].evaluate(foto => foto.getAttribute("src")))
            }
            } catch(e){
                fotos_Details = "sem informação"
        }

        produtosDetalhados.push({
            nome: Product[i].nome,
            preco: Product[i].preco,
            quantia_vendas: Product[i].quantidade_vendidos,
            imagens: imagens,
            quantidade_disponivel,
            come_from,
            descricao: {
                problema: "",
                solução: "",
                tecnologia: "",
                Design_e_outros: "",
                Exclusividade: "",
                Especificações: ""
            },
            fotos_Details
        })
    }

    await fs.writeFile("produtos_para_pagina.json", JSON.stringify(produtosDetalhados))
}

BuscarPorProdutosDetail()