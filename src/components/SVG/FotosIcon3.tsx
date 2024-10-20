const FotosIcon3 = ({ width="64", height="64", styles={}}: {width:string, height:string, styles?:object}) => {
  return (
    <svg 
    width={width} 
    height={height} 
    style={{...styles}}
    fill="#000000" 
    stroke="#000000"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"><path d="M2 5v18h4v4h24V9h-4V5Zm2 2h20v14H4Zm2 2v10h16V9Zm2 2h12v6H8Zm18 0h2v14H8v-2h18Z"/>
    </svg>
  )
}

export default FotosIcon3