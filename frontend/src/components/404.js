import ErrorImage from '../assets/imgs/error.png'

const NotFound = () => {
  return (
    <div>
      <img
        src={ErrorImage}
        width='100%'
        height='720px'
        alt='Error! Page Not Found'
      />
    </div>
  )
}

export default NotFound
