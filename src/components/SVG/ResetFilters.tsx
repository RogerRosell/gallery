const ResetFilters = ({ width="32", height="32", styles={}}: {width?:string, height?:string, styles?:object}) => {
  return (
    <svg 
    width={width} 
    height={height} 
    viewBox="0 0 32 32" 
    style={{...styles}}
    xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5 9a7.452 7.452 0 0 0-6.5 3.792V8h-2v8h8v-2h-4.383a5.494 5.494 0 1 1 4.883 8H22v2h.5a7.5 7.5 0 0 0 0-15Z"/><path d="M26 6H4v3.171l7.414 7.414.586.586V26h4v-2h2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8l-7.414-7.415A2 2 0 0 1 2 9.171V6a2 2 0 0 1 2-2h22Z"/><path fill="none" d="M0 0h32v32H0z"/>
    </svg>
  )
}

export default ResetFilters