import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { addRequests, removeRequest } from "../utils/requestSlice"
import { useState } from "react"

const Requests = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const reviewRequest = async (status, _id) => {
        setError("")
        try{
            const res = axios.post(
                BASE_URL + "/request/review/" +status +"/"+ _id, {}, {withCredentials:true}
            );
            dispatch(removeRequest(_id))
        }
        catch (err) {
            setError(err.response.data);
        }
    }

    const fetchRequest = async () => {
        setError("")
        try{
        const res = await axios.get(BASE_URL + "/user/requests/received", {
            withCredentials: true
        })
        dispatch(addRequests(res.data.data))
    }
    catch (err) {
        setError(err.response.data);
    }
    }

    useState(() => {
        fetchRequest();
    },[])

    if(!requests) return

    if(requests.length === 0 ) return <h1 className="flex justify-center my-10">No Request Found</h1>
    return (
      <div className="text-center my-10">
        <h1 className="text-bold text-2xl">Requests</h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
            >
              <div>
                <img
                  src={photoUrl}
                  alt="Photo"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
              </div>
              <div>
                <button
                  className="btn btn-active btn-primary mx-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-active btn-secondary mx-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
        <p className="text-red-500">{error}</p>
      </div>
    );
}

export default Requests