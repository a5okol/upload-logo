// @flow
import Loader from "./Loader";
import React from "react";
import { Upload, message } from "antd";
const { Dragger } = Upload;

type Props = {
    serverLink: string,
    multiple: boolean,
    isSuccses: boolean,
    loading: boolean,
    img: string,
    status: Object
};

type State = {};

class Uploader extends React.Component<State, Props> {
    state = {
        serverLink: "http://localhost:5000",
        multiple: false,
        loading: false,
        isSuccses: false,
        img: "",
        status: {
            uploader: {
                _1: "Drag & drop here",
                _2: "Select file to upload"
            },
            uploadedSuccess: {
                _1: "Drag & drop here to replace",
                _2: "Select file to replace"
            },
            loader: {
                _1: "Uploading",
                _2: "Cancel"
            }
        }
    };

    onChangeHandler = (img: Object) => {
        const { status } = img.file;
        const imgName = img.file.name;

        if (status !== "uploading") {
            this.toggleLoadingOn(imgName);
        }

        if (status === "done") {
            setTimeout(() => {
                this.toggleLoadingSuccess();
                message.success(`${imgName} logo uploaded successfully.`);
            }, 1500);
        } else if (status === "error") {
            this.toggleLoadingFailed();
            message.error(`${imgName} logo upload failed.`);
        }
    };

    toggleLoadingOn(img: string) {
        this.setState({
            loading: true,
            isSuccses: false,
            img
        });
    }

    toggleLoadingSuccess() {
        this.setState({
            loading: false,
            isSuccses: true
        });
    }

    toggleLoadingFailed() {
        this.setState({
            loading: false,
            isSuccses: false,
            img: ""
        });
    }

    render() {
        return (
            <div className={"uploader__main uploader__main-indent"}>
                <Dragger
                    onChange={this.onChangeHandler}
                    action={`${this.state.serverLink}/public/assets/photos`}
                    name={"photos"}
                >
                    {this.state.loading && <Loader />}
                    <div className="uploader__drag-icon">
                        <img
                            className={`uploader__drag-icon_img ${
                                !this.state.isSuccses
                                    ? "uploader__drag-icon_img_indent"
                                    : ""
                            }`}
                            src={
                                this.state.isSuccses
                                    ? `${this.state.serverLink}/assets/photos/${this.state.img}`
                                    : require("../image/Icon.svg")
                            }
                            alt="Icon"
                        />
                    </div>
                    <div className="uploader__drag-text-block">
                        <p className="uploader__drag-text uploader__drag-text_1">
                            {this.state.loading
                                ? this.state.status.loader._1
                                : this.state.isSuccses
                                ? this.state.status.uploadedSuccess._1
                                : this.state.status.uploader._1}
                        </p>
                        <p className="uploader__drag-text uploader__drag-text_2">
                            - or -
                        </p>
                        <p className="uploader__drag-text uploader__drag-text_3">
                            {this.state.loading
                                ? this.state.status.loader._2
                                : this.state.isSuccses
                                ? this.state.status.uploadedSuccess._2
                                : this.state.status.uploader._2}
                        </p>
                    </div>
                </Dragger>
            </div>
        );
    }
}

export default Uploader;
