import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import S3FileUpload from 'react-s3';
import ReactCrop from 'react-image-crop';
import * as auth from '../AuthFunctions';
import { image64toCanvasRef, base64StringtoFile, extractImageFileExtensionFromBase64, downloadBase64File } from '../ImageHandlingFunctions';
import 'react-image-crop/dist/ReactCrop.css';
import './style.css';

class CreatePost extends Component {
  constructor(props){
    super(props);
    this.imagePreviewCanvasRef = React.createRef()
    this.fileRef = React.createRef()
    this.state = {
      imgPreviewSrc: null,
      crop: {
        aspect: 1/1,
      },
      croppedImage: null,
    }
    this.createPost = this.createPost.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.handleCropChange = this.handleCropChange.bind(this);
    this.handleCropComplete = this.handleCropComplete.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleCropSave = this.handleCropSave.bind(this);
    this.handleClearToDefault = this.handleClearToDefault.bind(this);
  }

  componentDidMount() {
    auth.setHeader();
  }
  createPost(e) {
    const config = {
      bucketName: 'fullstack-app',
      dirName: 'photos',
      region: 'us-east-1',
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY
    }
    e.preventDefault();
    e.persist();
    // const file = e.target[0].files[0];
    const file = this.state.croppedImage;
    const caption = this.refs.caption.value;

    S3FileUpload
    .uploadFile(file, config)
    .then(data => {
      const imageSource = data.location;
      axios.post('/posts', {
        image: imageSource,
        caption: caption,
      }).catch(err => console.log(err.response.data))
    })
  }

  previewImage(e){
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      this.setState({
        imgPreviewSrc: reader.result
      })
    }, false)

    reader.readAsDataURL(file)
  }

  handleCropChange(crop){
    this.setState({crop});
  }

  handleImageLoaded(image){
  }

  handleCropComplete(crop, pixelCrop){
    const canvasRef = this.imagePreviewCanvasRef.current;
    const {imgPreviewSrc} = this.state;
    image64toCanvasRef(canvasRef, imgPreviewSrc, pixelCrop);
  }

  handleCropSave(e){
    e.preventDefault();
    const canvasRef = this.imagePreviewCanvasRef.current;
    const {imgPreviewSrc} = this.state;
    const fileExtenstion = extractImageFileExtensionFromBase64(imgPreviewSrc)

    const imgData64 = canvasRef.toDataURL('image/' + fileExtenstion)

    const fileName = 'new-file.'+fileExtenstion;


    const croppedImage = base64StringtoFile(imgData64, fileName);
    this.setState({croppedImage: croppedImage});

    let oldFile = this.fileRef.current.files[0]
    this.handleClearToDefault()
  }

  handleClearToDefault(e){
    const canvas = this.imagePreviewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.setState({imgPreviewSrc: null});
  }

  render() {
    const { imgPreviewSrc, crop } = this.state;
    return (
      <div className="create-post">
        <form onSubmit={this.createPost} encType='multipart/form-data'>
          <label>Upload Image</label>
          <input ref={this.fileRef} type='file' onChange={this.previewImage}/>
          <input type='text' ref='caption'/>
          <button type='submit'>Submit</button>
        </form>
        {imgPreviewSrc !== null ?
          <div>
            <ReactCrop
            src={imgPreviewSrc}
            crop={crop}
            onChange={this.handleCropChange}
            onComplete={this.handleCropComplete}
            onImageLoaded={this.handleImageLoaded}/>
            <br/>
            <canvas ref={this.imagePreviewCanvasRef}></canvas>
            <button onClick={this.handleCropSave}>Save</button>
          </div>
          : ''}
      </div>
    );
  }
}

export default CreatePost;
