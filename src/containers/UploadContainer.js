import React from "react";
import Uploader from "./../components/Uploader";

const UploadContainer = () => {
    return (
        <div className="uploader__block">
            <div className="uploader__header uploader__header-indent">
                <h1 className="uploader__title">Company Logo</h1>
                <p className="uploader__desc">
                    Logo should be square, 100px size and in png, jpeg file
                    format.
                </p>
            </div>

            <Uploader />
        </div>
    );
};

export default UploadContainer;
