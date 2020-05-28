import React from "react";
import { Upload, message } from "antd";
const { Dragger } = Upload;

class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "photo",
            img: null,
            multiple: false,
            loading: false,
            isSuccses: false,
            action: "http://localhost:5000/public/photo",
            onChange: (img) => {
                const { status } = img.file;
                if (status !== "uploading") {
                    this.toggleLoadingOn(img.file.name);
                }

                if (status === "done") {
                    this.toggleLoadingSuccess();
                    setTimeout(() => {
                        message.success(
                            `${img.file.name} logo uploaded successfully.`
                        );
                    }, 1500);
                } else if (status === "error") {
                    message.error(`${img.file.name} logo upload failed.`);
                    this.toggleLoadingFailed();
                }
            },
        };
    }

    toggleLoadingOn(img) {
        this.setState({
            loading: true,
            isSuccses: false,
            img,
        });
    }

    toggleLoadingSuccess() {
        setTimeout(() => {
            this.setState({
                loading: false,
                isSuccses: true,
            });
        }, 1500);
    }

    toggleLoadingFailed() {
        this.setState({
            loading: false,
            isSuccses: false,
        });
    }

    render() {
        const uploader = (
            <div>
                <div className="uploader__drag-icon uploader__drag-icon_indent">
                    <img src={require("../image/Icon.svg")} alt="Icon" />
                </div>
                <p className="uploader__drag-text uploader__drag-text_1">
                    Drag & drop here
                </p>
                <p className="uploader__drag-text uploader__drag-text_2">
                    - or -
                </p>
                <p className="uploader__drag-text uploader__drag-text_3">
                    Select file to upload
                </p>
            </div>
        );

        const loader = (
            <div className="uploader__loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>

                <span className="uploader__drag-icon uploader__drag-icon_indent">
                    <img src={require("../image/Icon.svg")} alt="Icon" />
                </span>
                <p className="uploader__drag-text uploader__drag-text_1">
                    Uploading
                </p>
                <p className="uploader__drag-text uploader__drag-text_2">
                    - or -
                </p>
                <p className="uploader__drag-text uploader__drag-text_3">
                    Cancel
                </p>
            </div>
        );

        const uploadedSuccess = (
            <div>
                <div className="uploader__drag-icon">
                    <img
                        className="uploader__drag-icon_img"
                        src={
                            this.state.img === null
                                ? require("../image/Icon.svg")
                                : `http://localhost:5000/assets/uploads/${this.state.img}`
                        }
                        alt="Icon"
                    />
                </div>
                <p className="uploader__drag-text uploader__drag-text_1">
                    Drag & drop here to replace
                </p>
                <p className="uploader__drag-text uploader__drag-text_2">
                    - or -
                </p>
                <p className="uploader__drag-text uploader__drag-text_3">
                    Select file to replace
                </p>
            </div>
        );

        return (
            <div className="uploader__main uploader__main-indent">
                <Dragger {...this.state}>
                    {this.state.loading
                        ? loader
                        : this.state.isSuccses
                        ? uploadedSuccess
                        : uploader}
                </Dragger>
            </div>
        );
    }
}

export default Uploader;
