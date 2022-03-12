import { useState, useEffect } from 'react';
import profile from '../assets/images/icons/profile.png';
import Camera from '../components/Camera';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
function Profile() {
  const [img, setImg] = useState('');
  console.log(img);
  useEffect(() => {
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );

        const snap = await uploadBytes(imgRef, img);
        console.log(snap.ref.fullPath);
      };

      uploadImg();
    }
  }, [img]);

  return (
    <section>
      <div className="profile-container">
        <div className="image-container">
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
          <h3>User name</h3>
          <p>User email</p>
          <hr />
          <small>Joined on: ....</small>
        </div>
      </div>
    </section>
  );
}

export default Profile;
