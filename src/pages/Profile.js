import { useState, useEffect, useContext } from 'react';
import profile from '../assets/images/icons/avatar-orange.jpeg';
import Camera from '../components/Camera';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { AuthContext } from '../providers/Auth';
function Profile() {
  const [img, setImg] = useState('');

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );

        const snap = await uploadBytes(imgRef, img);
      };

      uploadImg();
    }
  }, [img]);

  return (
    <section>
      <div className="profile-container container d-flex">
        <div className="image-container d-flex">
          <img src={profile} alt="Avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="photo"
                onChange={e => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text-container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          <small>Joined on: {user.metadata.creationTime}</small>
        </div>
      </div>
    </section>
  );
}

export default Profile;
