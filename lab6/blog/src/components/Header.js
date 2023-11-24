import bookImage from '../images/booksimage.jpg'
import './Header.css'

function Header() {
    return <div className="image-style"><img src={bookImage} alt="header" /></div> //<img src={bookImage} alt="header" />
}

export default Header;