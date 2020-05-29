import React from "react";
import { Upload, message } from "antd";
const { Dragger } = Upload;

type Props = {
};

type State = {
    multiple: boolean,
    img: string,
    onChange: string,
    action: string,
    loading: boolean,
    isSuccses: boolean,
    name: string,
};

class Uploader extends React.Component<Props, State> {
    state = {
        multiple: false,
        onChange: this.onChangeHandler,
        action: "http://localhost:5000/public/photo",
        loading: false,
        isSuccses: false,
        name: "photo",
        img: '',
    };


    toggleLoadingOn(img: string) {
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

    toggleLoadingFailed = () => {
        console.log("pressed cancel or failed upload");
        this.setState({
            loading: false,
            isSuccses: false,
            img: null,
        });
    };

    onChangeHandler = (img: string) => {
        const { status } = img.file;
        if (status !== "uploading") {
            this.toggleLoadingOn(img.file.name);
        }

        if (status === "done") {
            this.toggleLoadingSuccess();
            setTimeout(() => {
                message.success(`${img.file.name} logo uploaded successfully.`);
            }, 1500);
        } else if (status === "error") {
            message.error(`${img.file.name} logo upload failed.`);
            this.toggleLoadingFailed();
        }
    };

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
                <button
                    onClick={this.toggleLoadingFailed}
                    className="uploader__drag-text uploader__drag-text_3"
                >
                    Cancel
                </button>
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
                <Dragger
                    onChange={this.onChangeHandler}
                    action={"http://localhost:5000/public/photo"}
                    name={"photo"}
                >
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
