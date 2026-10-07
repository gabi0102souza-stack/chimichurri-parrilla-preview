const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const base=process.argv[2];
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();
  await page.addInitScript(()=>{window.qaMetrics={lcp:0,cls:0};new PerformanceObserver(list=>{for(const item of list.getEntries())window.qaMetrics.lcp=item.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const item of list.getEntries())if(!item.hadRecentInput)window.qaMetrics.cls+=item.value}).observe({type:'layout-shift',buffered:true})});
  const cdp=await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:500000,uploadThroughput:250000});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  const loaded=await page.goto(base,{waitUntil:'networkidle'});
  await page.waitForTimeout(1500);
  const metrics=await page.evaluate(()=>({status:document.readyState,...window.qaMetrics,resources:performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').pop(),bytes:r.transferSize})),bytes:performance.getEntriesByType('resource').reduce((s,r)=>s+r.transferSize,0),navigation:performance.getEntriesByType('navigation')[0].toJSON()}));
  const externalLinks=await page.evaluate(()=>[...new Set([...document.querySelectorAll('a[href^="https:"]')].map(a=>a.href))]);
  const external=[];
  for(const url of externalLinks){try{const response=await fetch(url,{signal:AbortSignal.timeout(12000),headers:{'User-Agent':'Mozilla/5.0'}});external.push({url,status:response.status,finalUrl:response.url})}catch(e){external.push({url,error:e.message})}}
  const output={base,status:loaded.status(),simulatedConditions:'390px; RTT 150ms; download 500 kB/s; CPU 4x',metrics,external};
  await fs.writeFile('.work/public-performance-links.json',JSON.stringify(output,null,2));
  console.log(JSON.stringify(output,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
