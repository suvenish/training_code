import './Homepage.css'
import video from '../../assests/video.mp4'

const Background = () => {
  
    return (
      <video className='background fade-in' autoPlay muted loop>
        <source src={video} type='video/mp4' />
      </video>
    );
  }
export default Background;
