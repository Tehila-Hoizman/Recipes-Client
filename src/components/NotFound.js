const NotFound = () => {
    return ( 
        <div
                style={{
                  height: "90vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src="../images/notFound1.png" />
                <h1 style={{ color: "#5b050a" }} className="not-found-title">
                  העמוד לא נמצא
                </h1>
              </div>
     );
}
 
export default NotFound;