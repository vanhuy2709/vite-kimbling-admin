import ContentHeader from "./ContentHeader"
import './Content.css';
import Card from "../Card/Card";

const Content = () => {

  return (
    <div className="content">
      <ContentHeader />
      <Card />
    </div>
  )
}

export default Content