const { registerFont, createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')
const moment = require('moment');

registerFont('./fonts/Inter-Medium.ttf', { family: 'Inter', weight: 'Medium'  })
registerFont('./fonts/Inter-Bold.ttf', { family: 'Inter', weight: 'Bold'  })
registerFont('./fonts/Inter-Black.ttf', { family: 'Inter', weight: 'Black'  })

registerFont('./fonts/TTCommons-Medium.ttf', { family: 'TT Commons Medium'})
registerFont('./fonts/TTCommons-Bold.ttf', { family: 'TT Commons Bold'})
registerFont('./fonts/TTCommons-Black.ttf', { family: 'TT Commons Black'})



module.exports = function (app, db) {
    app.get('/api', (req, res) => {

        const { number, name, lastname, phone, price = '50 000' , date = moment().format("DD.MM.YY") } = req.query



        const canvas = createCanvas(1280, 1280)
        const ctx = canvas.getContext('2d')

        // Draw cat with lime helmet
        loadImage('./img/template_test.png').then((image) => {
            ctx.drawImage(image, 0, 0, 1280, 1280)

        ctx.shadowBlur = 17
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 6;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.24)'

        // Write Awesome!
        ctx.font =  '42px "TT Commons Bold"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(date,1050,130)
        console.log(ctx.font);

        ctx.font =  '70px "TT Commons Medium"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`Победитель дня`, 92, 390)
        console.log(ctx.font);

        ctx.font =  '70px "TT Commons Bold"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`#${number}`, 612, 390)
        console.log(ctx.font);

        ctx.font =  '120px "TT Commons Black"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`${lastname.capitalize()}. ${name.capitalize()}`, 90, 508)
        console.log(ctx.font);

        ctx.font =  '70px "TT Commons Medium"' //'normal normal 50px Roboto-Bold'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`+7 (***) *** **-${phone}`, 104, 597)
        console.log(ctx.font);

        ctx.font =  '280px "TT Commons Black"' //'normal normal 50px Roboto-Bold'
        ctx.shadowColor = 'rgba(0, 0, 0, 0.0)'
        ctx.fillStyle = "#FFF"
        ctx.fillText(`${price}₽`, 83, 833)
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