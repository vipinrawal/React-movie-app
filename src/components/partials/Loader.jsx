import loading from '/giphy.gif'

const Loader = () => {
  return (
    <div className='h-full w-full flex justify-center items-center bg-black'>
        <img className='invert' src={loading} alt="" />
    </div>
  )
}

export default Loader