module.exports = function (app, db) {
    app.get('/api', (req, res) => {

        let { number, name, lastname, phone } = req.query


        const { createCanvas, loadImage } = require('canvas')
        const fs = require('fs')
        const path = require('path');

        const canvas = createCanvas(500, 500)
        const ctx = canvas.getContext('2d')

        // Write "Awesome!"
        ctx.font = '30px Impact'
        ctx.rotate(0.1)
        ctx.fillText(`Билет: ${number}, ${name} ${lastname}, телефон: ${phone}`, 50, 100)

        // Draw line under text
        var text = ctx.measureText('Awesome!')
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'
        ctx.beginPath()
        ctx.lineTo(50, 102)
        ctx.lineTo(50 + text.width, 102)
        ctx.stroke()

        // Draw cat with lime helmet
        loadImage('./img/lime-cat.jpg').then((image) => {
            ctx.drawImage(image, 50, 0, 70, 70)

            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync('./img/test.png', buffer)

            res.sendFile(path.resolve('img/test.png'));
        })



        console.log()

    });
};