import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({headless:true,channel:'chrome'});
try{const page=await browser.newPage({viewport:{width:393,height:852}});await page.goto('http://127.0.0.1:5173/?screen=bleeding');
await page.getByRole('button',{name:'STEP 3',exact:true}).click();await page.getByLabel('Add notes').fill('Keep this draft');
await page.getByRole('button',{name:'STEP 2',exact:true}).click();await page.getByRole('button',{name:'Cramps severity 3',exact:true}).click();
await page.getByRole('button',{name:'STEP 1',exact:true}).click();
for(const product of ['Tampon','Mooncup']){await page.getByLabel('Sanitary product').selectOption(product);await expect(page.locator('[data-name="Pad shape"]')).toHaveCount(0);await expect(page.locator('.flow-text-only')).toHaveText('Light flow');await expect(page.getByRole('slider',{name:'Flow amount'})).toBeVisible();await page.getByRole('button',{name:'Spotting',exact:true}).click();await expect(page.locator('.spotting-pad')).toHaveCount(0);}
await page.getByLabel('Sanitary product').selectOption('Pad');await expect(page.locator('[data-name="Pad shape"]')).toHaveCount(1);
await page.getByRole('button',{name:'STEP 3',exact:true}).click();await expect(page.getByLabel('Add notes')).toHaveValue('Keep this draft');await page.getByRole('button',{name:'STEP 2',exact:true}).click();await expect(page.getByRole('button',{name:'Cramps severity 3',exact:true})).toHaveClass(/chosen/);console.log('PASS direct step navigation, draft retention and product-specific illustration visibility');}finally{await browser.close()}
