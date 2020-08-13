const { registerFont, createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')
const moment = require('moment');

registerFont('./fonts/Inter-Medium.ttf', { family: 'Inter', weight: 'Medium'  })
registerFont('./fonts/Inter-Bold.ttf', { family: 'Inter', weight: 'Bold'  })
registerFont('./fonts/Inter-Black.ttf', { family: 'Inter', weight: 'Black'  })



module.exports = function (app, db) {
    app.get('/api', (req, res) => {

        const { number, name, lastname, phone, price = '50 000' , date = moment().format("DD.MM.YY") } = req.query



        const canvas = createCanvas(1280, 1280)
        const ctx = canvas.getContext('2d')

        // Draw cat with lime helmet
        loadImage('./img/template.png').then((image) => {
            ctx.drawImage(image, 0, 0, 1280, 1280)

        ctx.shadowBlur = 17
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 6;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.24)'

        // Write Awesome!
        ctx.font =  'Medium 42px "Inter"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(date,1040,130)
        console.log(ctx.font);

        ctx.font =  'Medium 70px "Inter"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`Победитель дня`, 90, 390)
        console.log(ctx.font);

        ctx.font =  'Bold 70px "Inter"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`#${number}`, 640, 390)
        console.log(ctx.font);

        ctx.font =  'Black 120px "Inter"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`${lastname.capitalize()}. ${name.capitalize()}`, 90, 510)
        console.log(ctx.font);

        ctx.font =  'Medium 70px "Inter"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`+7 (***) *** **-${phone}`, 90, 600)
        console.log(ctx.font);

        ctx.font =  'Black 280px "Inter"' //'normal normal 50px Roboto-Bold'
        ctx.shadowColor = 'rgba(0, 0, 0, 0.0)'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`${price}₽`, 70, 850)
        console.log(ctx.font);
        // const text = ctx.measureText(`Билет: ${number}, ${name} ${lastname}, телефон: ${phone}`)
        // ctx.strokeStyle = 'rgba(0,0,0,0.5)'
        // ctx.beginPath()
        // // ctx.lineTo(50, 102)
        // // ctx.lineTo(50 + text.width, 102)
        // ctx.stroke()

            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync('./img/res.png', buffer)

            res.sendFile(path.resolve('img/res.png'))
        })
    })
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}