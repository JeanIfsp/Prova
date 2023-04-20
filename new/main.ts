
const Canvas = <HTMLCanvasElement>window.document.querySelector('canvas')
const Context = <CanvasRenderingContext2D>Canvas.getContext('2d')

type DrawSetting = [x: number, y: number]

type Key = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown'
type Direction = 'X' | 'Y'



class Maze {

    public vertexWidth: number = 0;  public vertexHeigth: number = 0;

    private col = 0;  private row = 0;

    public Colors = {
        Win: {
            Background: ['#efb1b1', '#c78383', '#b34d4d'],
            Border:     ['#d89c9c', '#efb1b1']
        },
        Default: {
            Background: ['#d0efb1', '#9dc783', '#b39c4d'],
            Border:     ['#b3d89c', '#d0efb1']
        }
    }


    public CurrentMap: number[][] = [[]];

    public Map: number[][][] = [
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    ]

    constructor(public squareSize: number) { }


    private Draw(backgroundColor: string, borderColor: string, x: number, y: number): void {

        Context.lineWidth   = 1
        Context.fillStyle   = backgroundColor
        Context.strokeStyle = borderColor

        Context.strokeRect(x, y, this.squareSize, this.squareSize)
        Context.fillRect(x, y, this.squareSize, this.squareSize)

    }

    public Center(width: number, heigth: number): void {

        this.vertexWidth  = width / 2  - (this.CurrentMap[0].length / 2) * this.squareSize
        this.vertexHeigth = heigth / 2 - (this.CurrentMap.length    / 2) * this.squareSize

    }


    private GetPosition(measure: number, position: number): number {
        return position * this.squareSize + measure
    }


    private Random(): number {
        return Math.floor(Math.random() * this.Map.length)
    }


    public RandomMap(): void {
        this.CurrentMap = this.Map[this.Random()];
    }


    public View(): void {

        this.Center(window.innerWidth, window.innerHeight)

        this.CurrentMap.forEach((row: number[], rowIndex: number): void =>
            row.forEach((col: number, colIndex: number): void =>
                this.Draw(this.Colors.Default.Background[col], this.Colors.Default.Border[col],this.GetPosition(this.vertexWidth, colIndex), this.GetPosition(this.vertexHeigth, rowIndex))
            )
        )
    }


    public WinView(): void {

        if (this.row == this.CurrentMap.length){
            this.row = 0
            this.col = 0
            return
        }


        this.CurrentMap[this.row].forEach((collunm: number, index: number) =>
            this.Draw(this.Colors.Win.Background[collunm], this.Colors.Win.Border[collunm], this.GetPosition(this.vertexWidth, index), this.GetPosition(this.vertexHeigth, this.row))
        )


        this.row++


        requestAnimationFrame(this.WinView.bind(this))

    }


    public AnimatedView(): void {


        if (this.row == this.CurrentMap.length){
            this.row = 0
            this.col = 0
            return
        }

        this.Draw(
            this.Colors.Default.Background[this.CurrentMap[this.row][this.col]],
            this.Colors.Default.Border[this.CurrentMap[this.row][this.col]],
            this.GetPosition(this.vertexWidth, this.col),
            this.GetPosition(this.vertexHeigth, this.row)
        )

        if (this.col == this.CurrentMap[0].length - 1)
            this.row++

        this.col = (this.col + 1) % this.CurrentMap[0].length

        requestAnimationFrame(this.AnimatedView.bind(this))



    }
}





class Game {

    private Context;
    private Directions = {
        X: { ArrowLeft: -1, ArrowUp: 0, ArrowRight: 1, ArrowDown: 0 },
        Y: { ArrowLeft: 0, ArrowUp: -1, ArrowRight: 0, ArrowDown: 1 }
    }

    constructor(private Canvas: HTMLCanvasElement, Context: string, private Player: Player, private Maze: Maze) {
        this.Context = <CanvasRenderingContext2D>Canvas.getContext(Context)
        this.Init()
    }


    public async Init() {
        this.Maze.RandomMap();

        this.Canvas.width = window.innerWidth
        this.Canvas.height = window.innerHeight

        this.Maze.Center(window.innerWidth, window.innerHeight)

        await this.Maze.AnimatedView()

        setTimeout(() => {
            window.addEventListener('keydown', this.Move.bind(this))
            this.Player.Draw(this.Maze.vertexWidth, this.Maze.vertexHeigth)
        }, 12500)


    }

    private Win(): boolean {
        return this.Maze.CurrentMap[this.Player.y][this.Player.x] == 2
    }


    private View() {
        this.Clear()
        this.Player.Draw(this.Maze.vertexWidth, this.Maze.vertexHeigth)
    }


    public Move(Key: KeyboardEvent | PointerEvent): void {


        Key = Key.key ? Key : {key: Key.target.attributes.value.value}

        console.log(Key)
        console.log(this.Can(Key))

        if (this.Can(Key)) {


            this.Player.LastPositions.x = this.Player.x
            this.Player.LastPositions.y = this.Player.y


            if (Key.key == 'ArrowUp' || Key.key == 'ArrowDown')
                this.Player.y = this.Direction(this.Player.y, Key.key as Key, 'Y')

            else
                this.Player.x = this.Direction(this.Player.x, Key.key as Key, 'X')


            this.View()


            if(this.Win()){
                console.log(window)
                window.removeEventListener('keydown', this.Move.bind(this), false)

                this.Maze.WinView()
                setTimeout(() => window.location.reload(), 2500)

            }

        }

    }

    private Direction(position: number, key: Key, direction: 'X' | 'Y'): number {

        return position + this.Directions[direction as Direction][key as Key]

    }


    private Can(Key: KeyboardEvent | object): boolean {

        if (!(Key.key == "ArrowLeft" || Key.key == "ArrowUp" || Key.key == "ArrowRight" || Key.key == "ArrowDown"))
            return false



        return (this.Maze.CurrentMap[this.Direction(this.Player.y, Key.key, 'Y')][this.Direction(this.Player.x, Key.key, 'X')] ?? true) != 1

    }


    private Clear(): void {

        this.Context.fillStyle   = this.Maze.Colors.Default.Background[0]
        this.Context.strokeStyle = this.Maze.Colors.Default.Border[0]

        this.Context.strokeRect(
            this.Player.LastPositions.x * this.Maze.squareSize + this.Maze.vertexWidth,
            this.Player.LastPositions.y * this.Maze.squareSize + this.Maze.vertexHeigth,
            this.Maze.squareSize, this.Maze.squareSize
        )

        this.Context.fillRect(
            this.Player.LastPositions.x * this.Maze.squareSize + this.Maze.vertexWidth,
            this.Player.LastPositions.y * this.Maze.squareSize + this.Maze.vertexHeigth,
            this.Maze.squareSize, this.Maze.squareSize
        )


    }

    public Resize(): void {

        this.Canvas.width = window.innerWidth
        this.Canvas.height = window.innerHeight

        this.Maze.View()
        this.View()

    }
}


class Player {

    private skin;

    public LastPositions = { x: 0, y: 0 }

    constructor(skin: string, public scale: number, public x: number = 0, public y: number = 0) {
        this.skin = new Image()
        this.skin.src = skin

        this.LastPositions.x = x
        this.LastPositions.y = y
    }



    public Draw(x: number, y: number): void {
        Context.drawImage(this.skin, (this.x * this.scale + x), (this.y * this.scale + y), this.scale, this.scale)
    }



}


(() => {


    const Canvas = <HTMLCanvasElement>window.document.querySelector('canvas')

    const TheLittlePrince = new Player('./principe.png', 20, 1, 1)

    const B612 = new Maze(20);

    const TheGame = new Game(Canvas, '2d', TheLittlePrince, B612)





    const Buttons = (window.document.querySelectorAll('.button'))

    Buttons.forEach((key: any) => key.addEventListener('click', TheGame.Move.bind(TheGame)))

    window.addEventListener('resize', TheGame.Resize.bind(TheGame))

})()





