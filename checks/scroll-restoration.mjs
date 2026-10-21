import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,channel:'chrome'});
try {
 const page=await browser.newPage({viewport:{width:393,height:700}});
 await page.goto('http://127.0.0.1:5173/?screen=home');
 const content=page.locator('.screen-content');
 await page.locator('.recent .entry-card').first().scrollIntoViewIfNeeded();
 await page.waitForTimeout(100);
 const homePosition=await content.evaluate(el=>el.scrollTop);
 assert(homePosition>0);
 await page.locator('.recent .entry-card').first().click();
 await page.getByRole('button',{name:'Back to Home',exact:true}).click();
 await page.waitForTimeout(100);
 assert(Math.abs(await content.evaluate(el=>el.scrollTop)-homePosition)<2);
 await page.goto('http://127.0.0.1:5173/?screen=month');
 const summary=page.getByRole('button',{name:'Prepare consultation summary',exact:true});
 await summary.scrollIntoViewIfNeeded();await page.waitForTimeout(100);
 const patternPosition=await content.evaluate(el=>el.scrollTop);
 assert(patternPosition>0);
 await summary.click();
 await page.getByRole('button',{name:'Back to Your Pattern',exact:true}).click();
 await page.waitForTimeout(100);
 assert(Math.abs(await content.evaluate(el=>el.scrollTop)-patternPosition)<2);
 console.log('PASS Home → entry → Back and Pattern → consultation → Back restore scroll positions');
} finally {await browser.close()}
