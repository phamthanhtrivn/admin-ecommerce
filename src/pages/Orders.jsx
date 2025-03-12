/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useToken } from "../context/TokenContext";
import axios from "axios";
import { backendUrl, currency } from "../layout/LayoutDefault";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = () => {
  const { token } = useToken();
  const [orders, setOrders] = useState([]);

  const formatMoney = (number) => {
    return number.toLocaleString('vi-VN')
  }

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + 'api/order/status', { orderId, status: e.target.value}, {headers: { token }})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Danh Sách Đơn Hàng</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-center border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-sm sm:text-base text-gray-700" key={index}>
            <img className="w-20" src={assets.parcel_icon} alt="parcel_icon" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span> {item.size} </span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span> {item.size} </span>
                        ,{" "}
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium text-xl" >{order.address.lastName + " " + order.address.firstName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {"phường " +
                    order.address.ward +
                    ", quận " +
                    order.address.district +
                    ", " +
                    order.address.city}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[18px]">Số Lượng: {order.items.length}</p>
              <p className="mt-3">Pp Thanh Toán: {order.paymentMethod}</p>
              <p>Đã Thanh Toán: {order.payment ? "Rồi" : "Chưa"}</p>
              <p>Ngày: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[18px]">{formatMoney(order.amount)} {currency}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className="p-2 font-semibold">
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đóng gói">Đóng gói</option>
              <option value="Đang được vận chuyển">Đang được vận chuyển</option>
              <option value="Đã giao">Đã giao</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
