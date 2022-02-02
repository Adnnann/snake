import React, { useEffect, useState, useRef } from 'react';
import Snake from './Snake';
import Food from './Food';
import SnakeGif from './SnakeGif'
import SnakeScore from './SnakeScore'
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Item from '@mui/material/Grid';


import './snake.css';

const  HEIGHT = 10;
const  WIDTH  = 10;
const LEFT  = 37; 
const UP    = 38;
const RIGHT = 39; 
const DOWN  = 40;


const getRandom = () => {
    return  { 
        x: Math.floor(Math.random() *WIDTH),
        y: Math.floor(Math.random() *HEIGHT) 
    }
}

const emptyRows = () => [...Array(WIDTH)].map((_) => [...Array(HEIGHT)].map((_)=> 'grid-item'));
const SnakeGame = () => {
  const [reset, setReset] = useState(true);

  const [food, setFood] = useState(getRandom());
  const [direction, setDirection] = useState(RIGHT);
  const [snakeSpeed, setSnakeSpeed] = useState(200)
  const [changeSnakeSpeed, setChangeSnakeSpeed] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState([getRandom()])
  const [rows, setRows] = useState(emptyRows())

  useEffect(()=>{
  update()
  },[])



useInterval(()=>{

    document.addEventListener('keydown', changeDirection)
     isEaten()
     moveSnake()
     isCollapsed()
     }, snakeSpeed)


const moveSnake = () => {
    let snakeCopy = snake;
    let head  =  {...snakeCopy[snakeCopy.length-1]};
    switch (direction) {
        case LEFT:  head.y += -1; break;    
        case UP:    head.x += -1; break;
        case RIGHT: head.y += 1;  break;
        case DOWN:  head.x += 1;  break;
        default: return;
    }

    head.x += HEIGHT * ((head.x<0)-(head.x>=HEIGHT));
    head.y += WIDTH * ((head.y<0)-(head.y>=WIDTH));
    
    snakeCopy.push(head); 
    snakeCopy.shift()
    setSnake(snakeCopy)
    update(); 
}   

const isEaten = () => {
    let snakeCopy  = [...snake];
    let head  =  {...snakeCopy[snakeCopy.length-1]};
    let newFood = food;

    console.log(head, newFood)
    if ((head.x === newFood.x) &&(head.y === newFood.y)) {
        setSnake([...snake, snake.push(head)])
        setFood(getRandom())
        setScore(score+1)
        setChangeSnakeSpeed(true)
}
}
const update = () => {
    let newRows = emptyRows(); 
    snake.forEach(element => newRows[element.x][element.y] = 'snake')
    newRows[food.x][food.y] = 'food';
    setRows(newRows)
}

const isCollapsed = () => {
    let newSnake = snake;
    console.log(newSnake.length)
    let head  = {...newSnake[newSnake.length-1]} 
    for (let i=0; i<newSnake.length-3; i++) {
        if ((head.x === newSnake[i].x) &&(head.y === newSnake[i].y)) {
          alert('gameOver')
            setGameOver(true)
        }
    }
}

const changeDirection = ({keyCode}) => { 
    switch (keyCode) {
        case LEFT:        
        setDirection(LEFT)
            break;
        case RIGHT:
            setDirection(RIGHT)
            break;
        case UP:
            setDirection(UP)
            break;
        case DOWN:
            setDirection(DOWN)
            break;
        default:
            break;
    }
   
}    
  useInterval(() => {

    if(changeSnakeSpeed){
      if(snakeSpeed < 30){
        return
      }else if(snakeSpeed >= 50 && snakeSpeed <= 100){
        setSnakeSpeed(snakeSpeed - 5)
      }else if(snakeSpeed > 100 && snakeSpeed <= 150){
        setSnakeSpeed(snakeSpeed - 7)  
      }else{
        setSnakeSpeed(snakeSpeed - 10)
      }
      setChangeSnakeSpeed(false)
    }
     
  });
  function useInterval(callback, snakeSpeed) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      let id = setInterval(tick, snakeSpeed);
      return () => clearInterval(id);
    }, [snakeSpeed]);
  }


  return (
    <Grid container justifyContent={'center'}>
    
    <Button  style={{borderStyle:'solid', backgroundColor:'white', visibility:gameOver ? 'visible':'hidden'}}>You lost. Would you like to play again?</Button> 
    <Grid item xs={12} md={12} lg={12} xl={12} marginBottom={0}>
      <Item marginBottom={0}>
      <SnakeGif />
      </Item>

    </Grid>
    
   
   
    <Grid item xs={12} md={12} lg={12} xl={12} marginTop={0} alignItems={'center'}>
    <Item>

      <div className="grid" style={{margin:'0 auto'}}>
     { rows.map((row, i) => row.map((value, j) =>  <div name={`${i}=${j}`} className={value}></div>))}
      </div>

      </Item>
      </Grid>
     
      <SnakeScore score={score}/>

      </Grid>
  );
};
export default SnakeGame;


