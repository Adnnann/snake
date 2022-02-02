import React, { useEffect, useState, useRef } from 'react';
import SnakeGif from './SnakeGif'
import SnakeScore from './SnakeScore'
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Item from '@mui/material/Grid';
import '../styles/snake.css';


const  GRID_HEIGHT = 10;
const  WIDTH_HEIGHT  = 10;
const LEFT  = 37; 
const UP    = 38;
const RIGHT = 39; 
const DOWN  = 40;


const setRandomCoordinates = () => {
    return  { 
        x: Math.floor(Math.random() * WIDTH_HEIGHT),
        y: Math.floor(Math.random() * GRID_HEIGHT) 
    }
}



const cleanGrid = () => [...Array(WIDTH_HEIGHT)].map((_) => [...Array(GRID_HEIGHT)].map((_)=> 'grid-item'));
const SnakeGame = () => {

 
  const [direction, setDirection] = useState();
  const [snakeSpeed, setSnakeSpeed] = useState()
  const [changeSnakeSpeed, setChangeSnakeSpeed] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState([])
  const [rows, setRows] = useState([])
  const [food, setFood] = useState([]);

  const initState = () => {
    setRows(cleanGrid())
    setSnake([{x:9, y:0}])
    setFood(setRandomCoordinates())
    setDirection(RIGHT)
    setSnakeSpeed(300)
  }

  useEffect(()=>{
    initState()

return() => {
  setRows()
    setSnake()
    setFood()
    setDirection()
    setSnakeSpeed(0)
}
  },[])



useInterval(()=>{
if(gameOver) return
    document.addEventListener('keydown', changeDirection)
     feedSnake()
     moveSnake()
     snakeCollapsed()
     }, snakeSpeed)

     useInterval(() => {
      if(gameOver) return
      console.log(snakeSpeed)
      if(changeSnakeSpeed){
        if(snakeSpeed < 50){
          return
        }else if(snakeSpeed >= 50 && snakeSpeed <= 100){
          setSnakeSpeed(snakeSpeed - 3)
        }else if(snakeSpeed > 100 && snakeSpeed <= 150){
          setSnakeSpeed(snakeSpeed - 5)  
        }else{
          setSnakeSpeed(snakeSpeed - 7)
        }
        setChangeSnakeSpeed(false)
      }
       
    });


const moveSnake = () => {
  if(gameOver) return
    let snakeCopy = snake;
    let head  =  {...snakeCopy[snakeCopy.length-1]};
    switch (direction) {
        case LEFT:  
          head.y += -1; 
          break;    
        case UP:    
          head.x += -1; 
          break;
        case RIGHT:
          head.y += 1;  
          break;
        case DOWN:  
          head.x += 1;  
          break;
        default: 
          return;
    }

    head.x += GRID_HEIGHT * ((head.x<-1)-(head.x>GRID_HEIGHT));
    head.y += WIDTH_HEIGHT * ((head.y<-1)-(head.y>WIDTH_HEIGHT));
    if ( head.y > 9 || head.x > 9 || head.y < 0 || head.x < 0 ) {
      setRows(cleanGrid())
      setGameOver(true)
         setScore(0)
         
         return
    }
    snakeCopy.push(head); 
    snakeCopy.shift()
    setSnake(snakeCopy)
    update(); 
}   

const feedSnake = () => {
  if(gameOver) return
    let snakeCopy  = [...snake];
    let head  =  {...snakeCopy[snakeCopy.length-1]};
    let newFood = food;

    if ((head.x === newFood.x) &&(head.y === newFood.y)) {
        setSnake([...snake, snake.push(head)])
        setFood(setRandomCoordinates())
        setScore(score+1)
        setChangeSnakeSpeed(true)
}
}
const update = () => {
  if(gameOver) return
    let newRows = cleanGrid(); 
    snake.forEach(element => {newRows[element.x][element.y] = 'snake'})
    newRows[food.x][food.y] = 'food';
    setRows(newRows)
}

const snakeCollapsed = () => {
  if(gameOver) return
    let newSnake = snake;
    let head  = {...newSnake[newSnake.length-1]} 
    for (let i=0; i<newSnake.length-3; i++) {
        if ((head.x === newSnake[i].x) &&(head.y === newSnake[i].y)) {
         setScore(0)
         setRows(cleanGrid())
         setGameOver(true)
         return
        }
    }
}

const startNewGame = () => {
    setSnake([{x:9, y:0}])
    setFood(setRandomCoordinates())
    setDirection(RIGHT)
    setGameOver(false)
    setSnakeSpeed(300)

 }
const changeDirection = ({keyCode}) => { 
    switch (keyCode) {
        case 37:        
        setDirection(LEFT)
            break;
        case 39:
            setDirection(RIGHT)
            break;
        case 38:
            setDirection(UP)
            break;
        case 40:
            setDirection(DOWN)
            break;
        default:
            break;
    }

   
}    

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
    
    <Button onClick={startNewGame} style={{borderStyle:'solid', backgroundColor:'white', visibility:gameOver ? 'visible':'hidden'}}>You lost. Would you like to play again?</Button> 
    <Grid item xs={12} md={12} lg={12} xl={12} marginBottom={0}>
      <Item marginBottom={0}>
      <SnakeGif />
      </Item>

    </Grid>
    
   
   
    <Grid item xs={12} md={12} lg={12} xl={12} marginTop={0} alignItems={'center'}>
    <Item>

      <div className="grid" style={{margin:'0 auto', marginBottom:"20px"}}>
     { rows.map((row, i) => row.map((value, j) =>  <div name={`${i}=${j}`} className={value} key={j}></div>))}
      </div>

      </Item>
      </Grid>
     
      <SnakeScore score={score}/>

      </Grid>
  );
};
export default SnakeGame;


