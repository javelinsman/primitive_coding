let drawRect = (x1, y1, x2, y2, color) => {
    for(let i=x1;i<=x2;i++){
        for(let j=y1;j<=y2;j++){
            setPixel(i, j, color)
        }
    }
}
