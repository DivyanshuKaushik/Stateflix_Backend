import { FiShare2} from 'react-icons/fi'

interface Props {
  size?: string;
}

const ShareBtn = ({size}:Props) => {
  return (
    <button className={`text-${size?.length ? size : "xs"} text-primary flex items-center`}><FiShare2 className='mr-1' /> Share</button>
  )
}

export default ShareBtn