import coin from '../assets/coin.gif'
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
const SnakeScore = ({score}) => {
    return(
        <>
        <Grid item xs={6} lg={6} md={6} xl={6}>
            <Item>
            <iframe src={coin} className='snake-gif' title='coin'></iframe>
            </Item>
        </Grid>

        <Grid item xs={6} lg={6} md={6} xl={6}>
            <Item>
                <h1 style={{color:"white"}}>{score}</h1> 
            </Item>
        </Grid>
        </>   
    )
}

export default SnakeScore