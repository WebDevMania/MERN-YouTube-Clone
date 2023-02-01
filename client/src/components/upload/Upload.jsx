import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './upload.module.css'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ImageIcon from '@mui/icons-material/Image';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useEffect } from 'react';

const Upload = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const [thumbnailFileUrl, setThumbnailFileUrl] = useState(null)
  const [videoFileUrl, setVideoFileUrl] = useState(null)

  const [thumbnailPercentage, setThumbnailPercentage] = useState(0);
  const [videoPercentage, setVideoPercentage] = useState(0);

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState('')
  const [tags, setTags] = useState([])
  const [error, setError] = useState(false)

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleCategories = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadVideoAndThumbnail = (file, fileType) => {
    const storage = getStorage(app);
    const filename = crypto.randomUUID() + file.name;
    const storageRef = ref(storage, filename);
    const uploadFile = uploadBytesResumable(storageRef, file);

    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileType === "thumbnail" ? setThumbnailPercentage((progress).toFixed(1)) : setVideoPercentage((progress).toFixed(1));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused right now");
            break;
          case "running":
            console.log("Upload is running right now");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((fileUrl) => {
          if(fileType === 'thumbnail'){
            setThumbnailFileUrl(fileUrl)
          } else {
            setVideoFileUrl(fileUrl)
          }
        });
      }
    );
  };

  useEffect(() => {
    if(video){
      uploadVideoAndThumbnail(video, "video");
    }
  }, [video]);

  useEffect(() => {
    if(thumbnail){
      uploadVideoAndThumbnail(thumbnail, "thumbnail");
    }
  }, [thumbnail]);

  const handleUploadVideo = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/video", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          thumbnailImg: thumbnailFileUrl,
          videoUrl: videoFileUrl,
          categories: tags
        })
      })

      if(res.status !== 201){
        throw new Error("Failed to upload")
      }

      const data = await res.json()
      navigate(`/videoDetail/${data._id}`)
    } catch (error) {
      setError(error.message)
      setTimeout(() => {
        setError(false)
      }, 2500)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Upload video</h2>
        <form onSubmit={handleUploadVideo}>
          <input type="text" name="title" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
          <input type="text" name="desc" placeholder='Description...' onChange={(e) => setDesc(e.target.vlaue)} />
          <label htmlFor='video'>Upload Video <VideoCallIcon /></label>
          <label htmlFor='thumbnail'>Upload Thumbnail <ImageIcon /></label>
          {Math.floor(videoPercentage) === 100 ? <span>Video uploading has been successful</span> : <input accept="video/*" style={{ display: 'none' }} type="file" id='video' placeholder='Video...' onChange={(e) => setVideo(e.target.files[0])} />}
          {Math.floor(thumbnailPercentage) === 100 ? <span>Thumbnail uploading has been successful </span> : <input accept="image/*" style={{ display: 'none' }} type="file" id='thumbnail' placeholder='Thumbnail...' onChange={(e) => setThumbnail(e.target.files[0])} />}
          <input type="text" placeholder='Separate categories by comma...' onChange={handleCategories} />
          <button>Upload video</button>
        </form>
        {error &&
          <div className={classes.errorMessage}>
            {error}
          </div>
        }
      </div>
    </div>
  )
}

export default Upload