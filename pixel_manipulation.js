let mainCanvas = document.getElementById('main_canvas')
let ctx = mainCanvas.getContext('2d')
let width = mainCanvas.width
let height = mainCanvas.height

let interface = ctx.createImageData(width, height)

let renderFrame = () => {
    ctx.putImageData(interface, 0, 0)
}

let getRawFrame = () => {
    return interface.data
}

let getPixel = (x, y) => {
    let index = width * x * 4 + y * 4
    return new RGBA(...interface.data.slice(index, index + 4))
}

let setPixel = (x, y, color) => {
    if(color instanceof RGBA){
        let index = width * x * 4 + y * 4
        interface.data[index + 0] = color.r
        interface.data[index + 1] = color.g
        interface.data[index + 2] = color.b
        interface.data[index + 3] = color.a
    }
    else console.log('setPixel(' + [x, y, color].join(', ') + ') is called, but ' + color + ' is not in expected type.')
}

let clearAllPixels = () => {
    interface.data.fill(0)
}

function RGBA(r, g, b, a){
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    this.toString = () => {return 'rgba(' + [r, g, b, a].join(', ') + ')';}
}
