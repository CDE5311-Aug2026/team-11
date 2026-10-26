import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({headless:true,channel:'chrome'});
try {
const page=await browser.newPage({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
await page.goto('http://127.0.0.1:5174/?screen=bleeding');
const slider=page.getByLabel('Flow amount');await slider.scrollIntoViewIfNeeded();
const b=await slider.boundingBox();const x=v=>b.x+b.width*(22+(281*v/10))/325;const y=b.y+b.height/2;
const cdp=await page.context().newCDPSession(page);
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x(0),y}]});
for(const v of [2,4,6,8,10,7,3,0]){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x(v),y}]});await expect(slider).toHaveValue(String(v));}
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
await page.touchscreen.tap(x(5),b.y+2);await expect(slider).toHaveValue('5');
await slider.focus();await page.keyboard.press('ArrowRight');await expect(slider).toHaveValue('6');
await page.goto('http://127.0.0.1:5174/?screen=visit');await page.getByRole('button',{name:'View my pattern',exact:true}).click();await expect(page.getByText('Your flow · September',{exact:true})).toBeVisible();
console.log('PASS continuous touch drag both directions, enlarged tap area, keyboard, and Visit Pattern destination');
}finally{await browser.close()}
