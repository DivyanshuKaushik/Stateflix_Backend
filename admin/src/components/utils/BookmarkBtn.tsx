import {FiPocket} from 'react-icons/fi'

interface Props {
    size?: string;
}
const BookmarkBtn = ({size}:Props) => {
  return (
    <button className={`text-${size?.length ? size : "xs"} text-primary flex items-center`}> <FiPocket className='mr-1' /> Read Later</button>
  )
}

export default BookmarkBtn