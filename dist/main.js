"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Canvas = window.document.querySelector('canvas');
const Context = Canvas.getContext('2d');
class Maze {
    constructor(squareSize) {
        this.squareSize = squareSize;
        this.vertexWidth = 0;
        this.vertexHeigth = 0;
        this.col = 0;
        this.row = 0;
        this.Colors = {
            Win: {
                Background: ['#efb1b1', '#c78383', '#b34d4d'],
                Border: ['#d89c9c', '#efb1b1']
            },
            Default: {
                Background: ['#d0efb1', '#9dc783', '#b39c4d'],
                Border: ['#b3d89c', '#d0efb1']
            }
        };
        this.CurrentMap = [[]];
        this.Map = [
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
        ];
    }
    Draw(backgroundColor, borderColor, x, y) {
        Context.lineWidth = 1;
        Context.fillStyle = backgroundColor;
        Context.strokeStyle = borderColor;
        Context.strokeRect(x, y, this.squareSize, this.squareSize);
        Context.fillRect(x, y, this.squareSize, this.squareSize);
    }
    Center(width, heigth) {
        this.vertexWidth = width / 2 - (this.CurrentMap[0].length / 2) * this.squareSize;
        this.vertexHeigth = heigth / 2 - (this.CurrentMap.length / 2) * this.squareSize;
    }
    GetPosition(measure, position) {
        return position * this.squareSize + measure;
    }
    Random() {
        return Math.floor(Math.random() * this.Map.length);
    }
    RandomMap() {
        this.CurrentMap = this.Map[this.Random()];
    }
    View() {
        this.Center(window.innerWidth, window.innerHeight);
        this.CurrentMap.forEach((row, rowIndex) => row.forEach((col, colIndex) => this.Draw(this.Colors.Default.Background[col], this.Colors.Default.Border[col], this.GetPosition(this.vertexWidth, colIndex), this.GetPosition(this.vertexHeigth, rowIndex))));
    }
    WinView() {
        if (this.row == this.CurrentMap.length) {
            this.row = 0;
            this.col = 0;
            return;
        }
        this.CurrentMap[this.row].forEach((collunm, index) => this.Draw(this.Colors.Win.Background[collunm], this.Colors.Win.Border[collunm], this.GetPosition(this.vertexWidth, index), this.GetPosition(this.vertexHeigth, this.row)));
        this.row++;
        requestAnimationFrame(this.WinView.bind(this));
    }
    AnimatedView() {
        if (this.row == this.CurrentMap.length) {
            this.row = 0;
            this.col = 0;
            return;
        }
        this.Draw(this.Colors.Default.Background[this.CurrentMap[this.row][this.col]], this.Colors.Default.Border[this.CurrentMap[this.row][this.col]], this.GetPosition(this.vertexWidth, this.col), this.GetPosition(this.vertexHeigth, this.row));
        if (this.col == this.CurrentMap[0].length - 1)
            this.row++;
        this.col = (this.col + 1) % this.CurrentMap[0].length;
        requestAnimationFrame(this.AnimatedView.bind(this));
    }
}
class Game {
    constructor(Canvas, Context, Player, Maze) {
        this.Canvas = Canvas;
        this.Player = Player;
        this.Maze = Maze;
        this.Directions = {
            X: { ArrowLeft: -1, ArrowUp: 0, ArrowRight: 1, ArrowDown: 0 },
            Y: { ArrowLeft: 0, ArrowUp: -1, ArrowRight: 0, ArrowDown: 1 }
        };
        this.Context = Canvas.getContext(Context);
        this.Init();
    }
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Maze.RandomMap();
            this.Canvas.width = window.innerWidth;
            this.Canvas.height = window.innerHeight;
            this.Maze.Center(window.innerWidth, window.innerHeight);
            yield this.Maze.AnimatedView();
            setTimeout(() => {
                window.addEventListener('keydown', this.Move.bind(this));
                this.Player.Draw(this.Maze.vertexWidth, this.Maze.vertexHeigth);
            }, 12500);
        });
    }
    Win() {
        return this.Maze.CurrentMap[this.Player.y][this.Player.x] == 2;
    }
    View() {
        this.Clear();
        this.Player.Draw(this.Maze.vertexWidth, this.Maze.vertexHeigth);
    }
    Move(Key) {
        Key = Key.key ? Key : { key: Key.target.attributes.value.value };
        console.log(Key);
        console.log(this.Can(Key));
        if (this.Can(Key)) {
            this.Player.LastPositions.x = this.Player.x;
            this.Player.LastPositions.y = this.Player.y;
            if (Key.key == 'ArrowUp' || Key.key == 'ArrowDown')
                this.Player.y = this.Direction(this.Player.y, Key.key, 'Y');
            else
                this.Player.x = this.Direction(this.Player.x, Key.key, 'X');
            this.View();
            if (this.Win()) {
                console.log(window);
                window.removeEventListener('keydown', this.Move.bind(this), false);
                this.Maze.WinView();
                setTimeout(() => window.location.reload(), 2500);
            }
        }
    }
    Direction(position, key, direction) {
        return position + this.Directions[direction][key];
    }
    Can(Key) {
        var _a;
        if (!(Key.key == "ArrowLeft" || Key.key == "ArrowUp" || Key.key == "ArrowRight" || Key.key == "ArrowDown"))
            return false;
        return ((_a = this.Maze.CurrentMap[this.Direction(this.Player.y, Key.key, 'Y')][this.Direction(this.Player.x, Key.key, 'X')]) !== null && _a !== void 0 ? _a : true) != 1;
    }
    Clear() {
        this.Context.fillStyle = this.Maze.Colors.Default.Background[0];
        this.Context.strokeStyle = this.Maze.Colors.Default.Border[0];
        this.Context.strokeRect(this.Player.LastPositions.x * this.Maze.squareSize + this.Maze.vertexWidth, this.Player.LastPositions.y * this.Maze.squareSize + this.Maze.vertexHeigth, this.Maze.squareSize, this.Maze.squareSize);
        this.Context.fillRect(this.Player.LastPositions.x * this.Maze.squareSize + this.Maze.vertexWidth, this.Player.LastPositions.y * this.Maze.squareSize + this.Maze.vertexHeigth, this.Maze.squareSize, this.Maze.squareSize);
    }
    Resize() {
        this.Canvas.width = window.innerWidth;
        this.Canvas.height = window.innerHeight;
        this.Maze.View();
        this.View();
    }
}
class Player {
    constructor(skin, scale, x = 0, y = 0) {
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.LastPositions = { x: 0, y: 0 };
        this.skin = new Image();
        this.skin.src = skin;
        this.LastPositions.x = x;
        this.LastPositions.y = y;
    }
    Draw(x, y) {
        Context.drawImage(this.skin, (this.x * this.scale + x), (this.y * this.scale + y), this.scale, this.scale);
    }
}
(() => {
    const Canvas = window.document.querySelector('canvas');
    const TheLittlePrince = new Player('./principe.png', 20, 1, 1);
    const B612 = new Maze(20);
    const TheGame = new Game(Canvas, '2d', TheLittlePrince, B612);
    const Buttons = (window.document.querySelectorAll('.button'));
    Buttons.forEach((key) => key.addEventListener('click', TheGame.Move.bind(TheGame)));
    window.addEventListener('resize', TheGame.Resize.bind(TheGame));
})();
