const Etiqueta = ({ width="64", height="64", styles={}}: {width?:string, height?:string, styles?:object}) => {
  return (
    <svg 
    width={width} 
    height={height} 
    style={{...styles}}
    fill="none" 
    stroke="#000000"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"><path  fillRule="evenodd" d="M4 5a1 1 0 0 1 1-1h6.172a1 1 0 0 1 .707.293l8 8a1 1 0 0 1 0 1.414l-6.172 6.172a1 1 0 0 1-1.414 0l-8-8A1 1 0 0 1 4 11.172V5Zm1-3a3 3 0 0 0-3 3v6.172a3 3 0 0 0 .879 2.12l8 8a3 3 0 0 0 4.242 0l6.172-6.17a3 3 0 0 0 0-4.243l-8-8A3 3 0 0 0 11.172 2H5Zm3 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd"/>
    </svg>
  )
}

export default Etiqueta