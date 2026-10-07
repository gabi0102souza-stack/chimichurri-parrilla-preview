const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
async function main() {
  const jobs = [
    ['brasa', [720,1440], false, true], ['burger', [480,750], false, true],
    ['cortes', [480,800], true, false], ['empanadas', [480,800], true, false],
    ['choripan', [480,800], true, false], ['casa', [480,844], false, false]
  ];
  for (const [name,widths,square,avif] of jobs) {
    for (const width of widths) {
      const input = path.join('.work', name+'.jpg');
      const pipeline = sharp(input).rotate().resize({width,height:square?width:undefined,fit:'cover',position:'attention',withoutEnlargement:true});
      await pipeline.clone().webp({quality:80,effort:5}).toFile(path.join('assets',`${name}-${width}.webp`));
      if(avif) await pipeline.clone().avif({quality:53,effort:5}).toFile(path.join('assets',`${name}-${width}.avif`));
    }
  }
  const files=await fs.readdir('assets');
  for(const file of files) console.log(file,(await fs.stat(path.join('assets',file))).size);
}
main().catch(error=>{console.error(error);process.exitCode=1});
