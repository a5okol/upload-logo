// @flow
import React from "react";
import UploadContainer from "./containers/UploadContainer";
import "antd/dist/antd.css";
import "./App.scss";

const App = () => {
    return (
        <div className="uploader">
            <UploadContainer />
        </div>
    );
};

export default App;
