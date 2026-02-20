import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'

const Profile = () => {
  const user = useSelector((store) => store.user)

  return (
    user && (
      <div className="min-h-screen flex items-center justify-center px-4">
        {<EditProfile user={user} />}
      </div>
    )
  );
}

export default Profile