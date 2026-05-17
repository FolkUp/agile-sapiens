import puppeteer from 'puppeteer';

console.log('Testing Puppeteer PDF generation...');

async function testPDF() {
    try {
        console.log('1. Launching browser...');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 10000
        });

        console.log('2. Creating page...');
        const page = await browser.newPage();

        console.log('3. Setting content...');
        await page.setContent('<h1>Test PDF</h1><p>This is a test.</p>', {
            waitUntil: 'networkidle0'
        });

        console.log('4. Generating PDF...');
        await page.pdf({
            path: './test-output.pdf',
            format: 'A4'
        });

        console.log('5. Closing browser...');
        await browser.close();

        console.log('✅ PDF test successful!');
        return true;
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        return false;
    }
}

testPDF().then(() => process.exit(0));