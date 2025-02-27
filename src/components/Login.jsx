/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from "axios"
import { backendUrl } from "../layout/LayoutDefault"
import { toast } from "react-toastify"

const Login = ({ setToken }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault()
      const reponse = await axios.post(backendUrl + 'api/user/admin', {email, password})
      if (reponse.data.success) {
        setToken(reponse.data.token)
      } else {
        toast.error(reponse.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-md">
        <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        </div>
        <form onSubmit={onSubmitHandle}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email:</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="email" placeholder="Nhập email..." required/>
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password:</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="password" placeholder="Nhập mật khẩu..." required/>
          </div>
          <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black">Đăng Nhập</button>
        </form>
      </div>
    </div>
  )
}

export default Login