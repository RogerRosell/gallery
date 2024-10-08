import React from 'react'
import { TDirectoryItem } from '@/app/types'
import Link from 'next/link';
import OpenFolderIcon from '@/components/SVG/OpenFolderIcon';

const Album = ({ folder }: { folder: TDirectoryItem }): JSX.Element => {
  return (
    <Link href={`/${folder.name}`} className='flex items-center'>
    <OpenFolderIcon width='60' height='60' />
      {folder.name}
    </Link>
    
  )
}

export default Album

{/* {folder.children && <FolderLinks folders={folder.children} />} */}