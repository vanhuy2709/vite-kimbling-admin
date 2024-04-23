import { Button } from "antd"
import Header from "../../components/Header/Header"
import {BiPlus} from 'react-icons/bi'

const Brand = () => {
  return (
    <>
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:'1rem'
      }}> 
        <Header title="Brand" />
        <Button
          style={{display: 'flex', alignItems:'center'}}
          icon={<BiPlus/>}
        >
          Add New Brand
        </Button>
      </div>
    </>
  )
}

export default Brand