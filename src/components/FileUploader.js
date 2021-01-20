import React from "react";
import ImageUploader from "react-images-upload";

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  onDrop = (pictures) => {
    console.log(pictures);
    this.props.onSubmit(pictures);
  };

  render() {
    return (
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        imgExtension={[".jpg"]}
        maxFileSize={5242880}
        withPreview={true}
        label="Max file size: 5mb, accepted: jpg"
        fileSizeError="file size is too big"
        fileTypeError="is not supported file extension"
        singleImage={false}
      />
    );
  }
}

export default FileUploader;
