import { useEffect, useState } from "react"
import axios from "axios"
import { backendUrl, currency } from "../layout/LayoutDefault"
import { toast } from "react-toastify"
import { useToken } from "../context/TokenContext"

const List = () => {
  const [list, setList] = useState([])
  const { token } = useToken();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + 'api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.messsage)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.messsage)
    }
  }

  const removeProduct = async (id) => {
    try {
      const reponse = await axios.post(backendUrl + 'api/product/remove', {id}, {headers: {token}})
      if (reponse.data.message) {
        toast.success(reponse.data.message)
        await fetchList()
      }
      else {
        toast.error(reponse.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const formatMoney = (number) => {
    return number.toLocaleString('vi-VN')
  }


  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2">All Product List</p>
      <div className="flex flex-col gap-2">

        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm">
          <b>Ảnh</b>
          <b>Tên Sản Phẩm</b>
          <b>Loại Sản Phẩm</b>
          <b>Giá</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product list  */}

        {
          list.map((item, index) => (
            <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm" key={index}>
                <img className="w-12" src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{formatMoney(item.price)} {currency}</p>
                <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List