import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='pt-10 bg-slate-950 flex justify-center  items-center text-sm '>
      <p className="text-slate-400">Copyright &copy; {currentYear}-All right reserve-GetMeAChai$</p>
    </footer>
  )
}

export default Footer
