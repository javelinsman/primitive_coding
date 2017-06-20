let black = new RGBA(0, 0, 0, 255)
let white = new RGBA(255, 255, 255, 255)

function Cell(){
    this.l = false
    this.r = false
    this.d = false
    this.u = false
    this.visited = false
    this.visited_solve = false
    this.visited_solve2 = false
    this.prev_i = -1
    this.prev_j = -1
    this.render = (left, top, width, height) => {
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        let pad_hor = 0.1 * width, pad_ver = 0.1 * height
        drawRect(left + pad_hor, top + pad_ver, left + width - pad_hor, top + height - pad_ver, white)
        if(this.l) drawRect(left, top + pad_ver, left + pad_hor, top + height - pad_ver, white)
        if(this.r) drawRect(left + width - pad_hor, top + pad_ver, left + width, top + height - pad_ver, white)
        if(this.d) drawRect(left + pad_hor, top + height - pad_ver, left + width - pad_hor, top + height, white)
        if(this.u) drawRect(left + pad_hor, top, left + width - pad_hor, top + pad_ver, white)
    }
    this.dye = (color) => {
        let left = this.left, top = this.top, width = this.width, height = this.height
        let pad_hor = 0.1 * width, pad_ver = 0.1 * height
        drawRect(left + pad_hor, top + pad_ver, left + width - pad_hor, top + height - pad_ver, color)
    }
}

function Maze(height, width, nRow, nCol){
    this.height = height
    this.width = width
    this.nRow = nRow
    this.nCol = nCol
    this.cells = []
    for(let i=0;i<nRow;i++){
        this.cells.push([])
        for(let j=0;j<nCol;j++){
            this.cells[this.cells.length-1].push(new Cell())
        }
    }

    this.render = () => {
        let margin_left = 50
        let margin_top = 50
        let cell_width = width / nCol
        let cell_height = height / nRow
        drawRect(margin_left, margin_top, margin_left + width, margin_top + height, black)
        for(let i=0;i<nRow;i++){
            for(let j=0;j<nCol;j++){
                let cell = this.cells[i][j]
                cell.render(margin_left + j * cell_width, margin_top + i * cell_height, cell_width, cell_height)
            }
        }
    }
}

let shuffle = (list) => {
    let n = list.length
    for(let i=0;i<n;i++){
        let ind = i + Math.floor(Math.random() * (n - i))
        let temp = list[ind]
        list[ind] = list[i]
        list[i] = temp
    }
}

let wait = true;

let dfs = (maze, si, sj) => {
    maze.cells[si][sj].visited = true
    let moves = [[-1, 0, 'u', 'd'], [1, 0, 'd', 'u'], [0, 1, 'r', 'l'], [0, -1, 'l', 'r']]
    shuffle(moves)
    for(let k=0;k<4;k++){
        let ni = si + moves[k][0], nj = sj + moves[k][1]
        if(0 <= ni && ni < maze.nRow && 0 <= nj && nj < maze.nCol && !maze.cells[ni][nj].visited){
            maze.cells[si][sj][moves[k][2]] = true
            maze.cells[ni][nj][moves[k][3]] = true
            dfs(maze, ni, nj)
        }
    }
    if(0 < si && si + 1 < maze.nRow && 0 < sj && sj + 1 < maze.nCol){
        let cell = maze.cells[si][sj]
        let dir = ['l', 'r', 'd', 'u'][Math.floor(Math.random() * 4)]
        cell[dir] = true
    }
}

let solve = (maze, si, sj, path) => {
    maze.cells[si][sj].visited_solve = true
    if(si == maze.nRow - 1 && sj == maze.nCol - 1){ path.push([si, sj]); return true }
    let moves = [[-1, 0, 'u', 'd'], [1, 0, 'd', 'u'], [0, 1, 'r', 'l'], [0, -1, 'l', 'r']]
    for(let k=0;k<4;k++){
        let ni = si + moves[k][0], nj = sj + moves[k][1]
        if(0 <= ni && ni < maze.nRow && 0 <= nj && nj < maze.nCol && !maze.cells[ni][nj].visited_solve && maze.cells[si][sj][moves[k][2]]){
            let det = solve(maze, ni, nj, path)
            if(det){
                path.push(moves[k][2])
                return true
            }
        }
    }
    return false
}

let maze = new Maze(500, 500, 50, 50)

dfs(maze, 0, 0)
maze.render()
renderFrame()

{
    let q = new Queue()
    q.push([0, 0, 0])
    maze.cells[0][0].visited_solve2 = true
    while(q.size() > 0){
        let si = q.ref()[0], sj = q.ref()[1], dist = q.ref()[2]; q.pop()
        if(si == maze.nRow - 1 && sj == maze.nCol - 1) break
        let moves = [[-1, 0, 'u', 'd'], [1, 0, 'd', 'u'], [0, 1, 'r', 'l'], [0, -1, 'l', 'r']]
        for(let k=0;k<4;k++){
            let ni = si + moves[k][0], nj = sj + moves[k][1]
            if(0 <= ni && ni < maze.nRow && 0 <= nj && nj < maze.nCol && !maze.cells[ni][nj].visited_solve2 && maze.cells[si][sj][moves[k][2]]){
                maze.cells[ni][nj].prev_i = si
                maze.cells[ni][nj].prev_j = sj
                maze.cells[ni][nj].visited_solve2 = true
                q.push([ni, nj, dist + 1])
            }
        }
    }

    let sol = []
    {
        let i = maze.nRow - 1, j = maze.nCol - 1
        while(!(i == 0 && j == 0)){
            sol.push([i, j])
            let cell = maze.cells[i][j]
            i = cell.prev_i
            j = cell.prev_j
        }
        sol.push([0, 0])
    }
    sol = sol.reverse()

    console.log(sol)
    console.log(sol.length)

    setTimeout(()=>{
        let si = 0, sj = 0, i = 0
        maze.cells[si][sj].dye(new RGBA(155, 0, 0, 150))
        renderFrame()
        setInterval(() => {
            if(i < sol.length){
                maze.cells[sol[i][0]][sol[i][1]].dye(new RGBA(155, 0, 0, 150))
                renderFrame()
                i += 1
            }
        }, 50)
    }, 3000)


}

let path = []
solve(maze, 0, 0, path)
path = path.reverse()

setTimeout(()=>{
    let ti = 0, tj = 0, j = 0
    setInterval(() => {
        if(j < path.length){
            let direction = path[j]
            if(direction === 'u'){
                ti -= 1
            }
            else if(direction === 'd'){
                ti += 1
            }
            else if(direction === 'l'){
                tj -= 1
            }
            else{
                tj += 1
            }
            maze.cells[ti][tj].dye(new RGBA(0, 0, 255, 150))
            renderFrame()
            j += 1
        }
    }, 50)
}, 3000)

