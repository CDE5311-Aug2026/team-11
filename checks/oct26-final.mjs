import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'chrome'});
try{const page=await browser.newPage({viewport:{width:393,height:852}});const issues=[];page.on('console',m=>{if(m.type()==='error')issues.push(m.text())});
for(const screen of ['home','month','quarter','year','visit','bleeding']){await page.goto('http://127.0.0.1:5174/?screen='+screen);await page.waitForTimeout(250);const content=page.locator('.screen-content');await content.evaluate(e=>e.scrollTop=650);await page.screenshot({path:'checks/oct26-final-'+screen+'.png'});const bad=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth||i.getBoundingClientRect().width===0).map(i=>i.src));if(bad.length)throw Error(screen+JSON.stringify(bad));}
await page.goto('http://127.0.0.1:5174/?screen=home');for(const [tab,headline] of [['Mood','Your mood has been low for 3 days.'],['Cramps','Cramps have been stronger for 3 days.'],['Fatigue','Your energy has been low for 3 days.'],['Sleep','Your sleep has been short for 3 nights.']]){await page.getByRole('button',{name:tab,exact:true}).first().click();await expect(page.getByText(headline,{exact:true})).toBeVisible();}
await page.getByRole('button',{name:/Start a wind-down routine/}).click();await page.getByRole('button',{name:'Start timer',exact:true}).click();await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeVisible();console.log('PASS care tabs and timer, image load and geometry checks',issues);
}finally{await browser.close()}
