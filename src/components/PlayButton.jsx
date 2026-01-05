import {Link} from 'react-router-dom';

function PlayButton(props) {
  if (props.id === 'ah'){
    return (
      <Link className="btn btn-primary form-control" to="/playAH">Play now!</Link>
    )
  }
  return (
    <Link className="btn btn-primary form-control" to="/playMF">Play now!</Link>
  )
}

export default PlayButton