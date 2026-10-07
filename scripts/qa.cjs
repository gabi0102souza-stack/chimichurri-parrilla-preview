const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const base = process.argv[2] || 'http://127.0.0.1:4173/';
const tag = process.argv[3] || 'local';
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const results=[];
  for(const [width,height] of [[1440,1000],[360,800],[390,844],[768,1024]]){
    const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:width<500,hasTouch:width<500});
    const page=await context.newPage();const errors=[],failures=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failures.push({url:r.url(),status:r.status()})});
    const response=await page.goto(base,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=600){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(40)}
    await page.waitForTimeout(350);
    const checks=await page.evaluate(()=>({
      title:document.title,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
      overflowing:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.left>=0&&r.right>innerWidth+1}).map(e=>e.tagName+'.'+e.className).slice(0,12),
      images:[...document.images].map(i=>({src:i.currentSrc.split('/').pop(),loaded:i.complete&&i.naturalWidth>0,alt:!!i.alt})),
      fonts:{anton:document.fonts.check('20px Anton'),dm:document.fonts.check('20px "DM Sans"')},
      missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href')),
      robots:document.querySelector('meta[name="robots"]').content,
      mobileActions:[...document.querySelectorAll('.mobile-actions a')].map(a=>({text:a.textContent,height:a.getBoundingClientRect().height,width:a.getBoundingClientRect().width})),
      htmlLang:document.documentElement.lang,h1s:document.querySelectorAll('h1').length
    }));
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:`.work/${tag}-${width}-top.png`});
    await page.screenshot({path:`.work/${tag}-${width}-full.png`,fullPage:true});
    if(width<500){
      await page.getByRole('button',{name:/Navegar/}).click();
      checks.mobileNavOpen=await page.getByRole('button',{name:/Navegar/}).getAttribute('aria-expanded')==='true';
      await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'A casa',exact:true}).click();
      checks.mobileNavClosed=await page.getByRole('button',{name:/Navegar/}).getAttribute('aria-expanded')==='false';
      await page.getByRole('button',{name:/Navegar/}).click();await page.keyboard.press('Escape');
      checks.escapeCloses=await page.getByRole('button',{name:/Navegar/}).getAttribute('aria-expanded')==='false';
    }else{
      await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'A casa',exact:true}).click();
      checks.desktopAnchor=await page.evaluate(()=>location.hash==='#casa');
    }
    await page.goto(base);await page.keyboard.press('Tab');
    checks.firstKeyboardFocus=await page.evaluate(()=>document.activeElement.textContent.trim());
    checks.visibleKeyboardOutline=await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle!=='none');
    await page.emulateMedia({reducedMotion:'reduce'});
    checks.reducedMotion=await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior==='auto');
    await page.addStyleTag({content:'html{font-size:200%}body{font-size:2rem}'});
    checks.zoomOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    results.push({width,height,status:response.status(),errors,failures,...checks});
    await context.close();
  }
  await browser.close();
  await fs.writeFile(`.work/${tag}-qa.json`,JSON.stringify({base,checkedAt:new Date().toISOString(),results},null,2));
  console.log(JSON.stringify(results,null,2));
  if(results.some(r=>r.status!==200||r.errors.length||r.failures.length||r.scrollWidth>r.width||r.missingAnchors.length||r.images.some(i=>!i.loaded)||!r.fonts.anton||!r.fonts.dm||r.zoomOverflow))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
