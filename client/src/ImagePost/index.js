import React, { Component } from 'react';
import axios from 'axios';
import S3FileUpload from 'react-s3';
import ReactCrop from 'react-image-crop';
import * as auth from '../AuthFunctions';
import { image64toCanvasRef, base64StringtoFile, extractImageFileExtensionFromBase64 } from '../ImageHandlingFunctions';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal, ModalBackground, ModalContent, ModalClose, Notification, Delete, Title, Field, Input, Control, Button } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ImagePost extends Component {
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
      previewActive: false,
      waiting: false
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
    this.setState({ waiting: true });
    const config = {
      bucketName: 'fullstack-app',
      dirName: 'photos',
      region: 'us-east-1',
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY
    }
    e.preventDefault();
    e.persist();
    const file = this.state.croppedImage;
    const caption = e.target.caption.value;

    S3FileUpload
    .uploadFile(file, config)
    .then(data => {
      const imageSource = data.location;
      console.log(imageSource);
      axios.post('/posts', {
        image: imageSource,
        caption: caption,
      })
    .then(this.setState({waiting: 'success'}))
      .catch(err => console.log(err.response.data))
    })
  }

  previewImage(e){
    try {
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      this.setState({
        imgPreviewSrc: reader.result,
        previewActive: true,
      })
    }, false)

    reader.readAsDataURL(file)
    } catch(e) {
    }
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
    this.handleClearToDefault()
  }

  handleClearToDefault(e){
    // const canvas = this.imagePreviewCanvasRef.current;
    // const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.setState({previewActive: false});
  }

  uploadingModal(){
  // console.log(this.state)
  return(
    <Modal isActive>
      <ModalBackground/>
      <ModalContent>
        <Notification>File Uploading</Notification>
      </ModalContent>
    </Modal>
    )
}

uploadSuccess(){
  return(
    <Modal isActive>
      <ModalBackground/>
      <ModalContent>
        <Delete onClick={() => this.setState({waiting: false})}/>
        <Notification>Upload successful!</Notification>
      </ModalContent>
      <ModalClose onClick={() => this.setState({waiting: false})}/>
    </Modal>
    )
}

  uploading(condition){
    // const { waiting } = this.state;
    switch(condition){
      case true:
      return this.uploadingModal()
      break;
      case 'success':
      return this.uploadSuccess()
      break;
      default:
      return <h1>No upload so far</h1>
    }
  }

  render() {
    const { imgPreviewSrc, crop, waiting, previewActive, croppedImage } = this.state;
    return (
      <div className="img-post">
        <form onSubmit={this.createPost} encType='multipart/form-data'>
          <label>Upload Image</label>
          <input ref={this.fileRef} type='file' onChange={this.previewImage} accept="image/*"/>
          <input type='text' ref='caption'/>
          <button type='submit'>Submit</button>
        </form>
        {imgPreviewSrc !== null ?
          <div className='crop-container'>
            { previewActive === true ?
            <ReactCrop
            className='react-crop'
            src={imgPreviewSrc}
            crop={crop}
            onChange={this.handleCropChange}
            onComplete={this.handleCropComplete}
            onImageLoaded={this.handleImageLoaded}/>
            : null}
            <br/>
            <canvas ref={this.imagePreviewCanvasRef}></canvas>
            <br/>
            {previewActive === true ? <Button isColor='link' onClick={this.handleCropSave}>Save Crop</Button> : null}
            <br/>
          </div>
          : ''}
        <form onSubmit={this.createPost}>
        <Field isGrouped='centered'>
          <Control isHidden={previewActive === false && croppedImage !== null ? false : true}>
            <Input type='text' placeholder='Add a caption' name='caption'/>
          </Control>
          <Control>
            <div className="file is-primary">
              <label className="file-label">
                <input className="file-input" type="file" onChange={this.previewImage} accept='image/*' ref={this.fileRef}/>
                <span className="file-cta">
                  <span className="file-icon">
                    <FontAwesomeIcon icon={['fas','upload']}/>
                  </span>
                  <span className="file-label">
                    Choose a file…
                  </span>
                </span>
              </label>
            </div>
          </Control>
          <Control isHidden={previewActive === false && croppedImage !== null ? false : true}>
            <Button type='submit' isColor='primary'>Submit</Button>
          </Control>
        </Field>
        </form>
          {this.uploading(waiting)}
      </div>
    );
  }
}

export default ImagePost;
