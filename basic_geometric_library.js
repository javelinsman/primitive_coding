let drawRect = (x1, y1, x2, y2, color) => {
    for(let i=y1;i<=y2;i++){
        for(let j=x1;j<=x2;j++){
            setPixel(i, j, color)
        }
    }
}
