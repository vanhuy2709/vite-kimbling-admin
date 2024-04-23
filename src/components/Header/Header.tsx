import './Header.css';

interface IProps {
  title: string
}

const Header = (props: IProps) => {

  const { title } = props;

  return (
    <div className="content--header">
      <h1 className="header--title">{title}</h1>
    </div>
  )
}

export default Header