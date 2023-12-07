

const ErrorStatusMessage = ({ errorStatus, errorMessage }) => {

    return(
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="text-center">
                <div className="card border-0 mb-4 ">
                    <div className="card-body bg-color-baby-blue-3">
                        <h1 className="display-4 text-color-baby-blue">{errorStatus} {errorMessage}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorStatusMessage;