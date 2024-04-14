import './Header.css';

interface IProps {
  title: string
}

const Header = (props: IProps) => {

  const { title } = props;

  return (
    <div className="content--header">
      <h1 className="header--title">{title}</h1>

      {/* <div className="header--activity">

        <div className="search-box">
          <input type="text" placeholder="Search anything here..." />
          <BiSearch className="icon" />
        </div>

        <div className="notify">
          <BiNotification className="icon" />
        </div>
      </div> */}

    </div>
  )
}

export default Header