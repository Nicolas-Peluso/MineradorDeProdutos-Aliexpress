const pupe = require("puppeteer")
const fs = require("fs/promises")

async function Call(){
  let jsonList = [];
    const browser = await pupe.launch({
        headless: false,
        defaultViewport: {
          width: 1920,
          height: 1080
        }
    })
    const page = await browser.newPage()
  
    page.goto("https://pt.aliexpress.com/category/201000020/consumer-electronics.html")
    await page.waitForSelector("div.right-menu")
    
    await page.evaluate(async () => {
      const distance = 100;
      const delay = 10;
      while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise(resolve => { setTimeout(resolve, delay); });
      }
    })
    
    let elemet = await page.$$("div.right-menu > div > div.JIIxO > a")

    for(let i = 0; i < elemet.length; i++){
      let nome, preco = "", imagem, quantidade_vendidos, frete, estrelas, link; 

      try{
        nome = await elemet[i].evaluate(nome => nome.querySelector("div._3GR-w div._1tu1Z h1").textContent, elemet[i])
      } catch {
        nome = "sem informações"
      }
      try{
        preco = await elemet[i].evaluate(preco => preco.querySelector("div._3GR-w div.mGXnE._37W_B > span:nth-child(2)").textContent)
      } catch {
        preco = "sem informações"
      }
      try{
        imagem = await elemet[i].evaluate(image => image.querySelector("div._3A0hz img").getAttribute("src"), elemet[i])
      } catch {
        imagem = "sem informações"
      }
      try{
        quantidade_vendidos = await elemet[i].evaluate(vendas => vendas.querySelector(`div.ZzMrp span._1kNf9`).textContent.replace("  vendido(s)", ""), elemet[i])   
      } catch {
        quantidade_vendidos = "sem informações"
      }
      try{
        estrelas = await elemet[i].evaluate(star => star.querySelector(`div.ZzMrp span.eXPaM`).textContent, elemet[i])
      } catch {
        estrelas = "sem informações"
      }
      try{
        frete = await elemet[i].evaluate(frete => frete.querySelector("div.KnIS>div span._2jcMA").textContent, elemet[i])
      } catch {
        frete = "sem informações"
      }
      try{
        link = await elemet[i].evaluate(el => el.getAttribute("href"), elemet[i])
      } catch {
        frete = "sem informações"
      }
      
      if(preco <= 100 && quantidade_vendidos >= 100 && estrelas >= 4) jsonList.push({nome, quantidade_vendidos, imagem, frete, estrelas, preco, link, escolhido: false})
}
await fs.writeFile("produtos.json", JSON.stringify(jsonList))
}

Call()